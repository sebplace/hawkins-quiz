#!/usr/bin/env node
/* Vérifie la banque de questions, les tables de rangs et les traductions.
   Aucune dépendance : `node tools/check-questions.js` depuis la racine. */

const fs = require("fs");
const path = require("path");

const racine = path.join(__dirname, "..");
const lire = (rel) => fs.readFileSync(path.join(racine, rel), "utf8");

const src = lire("assets/questions.js");
let QUESTIONS, RANKS, SURVIVAL_RANKS, CAMPAIGN_RANKS;
try {
  ({ QUESTIONS, RANKS, SURVIVAL_RANKS, CAMPAIGN_RANKS } = new Function(
    `${src}\nreturn { QUESTIONS, RANKS, SURVIVAL_RANKS, CAMPAIGN_RANKS };`)());
} catch (e) {
  console.error("✗ assets/questions.js est illisible :", e.message);
  process.exit(1);
}

const PER_LEVEL = 4;          // doit rester aligné sur app.js
const PAIR_MIN = 6;           // plancher par couple niveau × saison
const LEVELS = [1, 2, 3];
const SEASONS = [1, 2, 3, 4, 5];
const TYPES = ["qcm", "spell", "vf", "chrono", "intrus", "draw"];
const LANGUES = [
  { code: "en", nom: "anglais", fichier: "assets/questions.en.js", global: "QUESTIONS_EN" },
  { code: "nl", nom: "néerlandais", fichier: "assets/questions.nl.js", global: "QUESTIONS_NL" }
];
const errors = [];
const warn = [];

/* ---------- Questions ---------- */
const vusId = new Map();
QUESTIONS.forEach((q, i) => {
  const at = `question ${i + 1} « ${String(q.q).slice(0, 46)}… »`;
  const type = q.type || "qcm";
  if (!TYPES.includes(type)) errors.push(`${at} : type inconnu (${type})`);
  if (!LEVELS.includes(q.level)) errors.push(`${at} : niveau invalide (${q.level})`);
  if (!SEASONS.includes(q.s)) errors.push(`${at} : saison invalide (${q.s})`);
  if (typeof q.q !== "string" || q.q.length < 10) errors.push(`${at} : intitulé trop court`);
  if (typeof q.fact !== "string" || q.fact.length < 20) errors.push(`${at} : anecdote manquante ou trop courte`);
  if (!/[?.!»]$/.test(String(q.q).trim())) errors.push(`${at} : ponctuation finale manquante`);

  /* L'id est la clé des traductions : il doit exister, rester lisible et unique. */
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(q.id || "") || q.id.length < 4 || q.id.length > 40) {
    errors.push(`${at} : id absent ou invalide (${q.id})`);
  } else if (vusId.has(q.id)) {
    errors.push(`id en double : « ${q.id} » (questions ${vusId.get(q.id) + 1} et ${i + 1})`);
  } else vusId.set(q.id, i);

  if (q.needsArt && type !== "draw") errors.push(`${at} : needsArt n'a de sens que sur une devinette dessinée`);

  if (type === "spell") {
    if (!/^[A-Z]{3,9}$/.test(q.answer || "")) {
      errors.push(`${at} : réponse à épeler invalide (3 à 9 lettres A-Z sans accent)`);
    }
  } else if (type === "vf") {
    if (typeof q.answer !== "boolean") errors.push(`${at} : vrai/faux attend answer: true ou false`);
    if (q.choices) errors.push(`${at} : un vrai/faux ne porte pas de propositions`);
  } else if (type === "chrono") {
    if (!Array.isArray(q.steps) || q.steps.length !== 3) {
      errors.push(`${at} : une chronologie attend exactement 3 étapes`);
    } else if (new Set(q.steps).size !== 3) {
      errors.push(`${at} : étapes en double`);
    } else if (q.steps.some((s) => typeof s !== "string" || s.length < 5)) {
      errors.push(`${at} : étape vide ou trop courte`);
    }
  } else {
    if (type === "draw" && !q.art) errors.push(`${at} : devinette sans pièce dessinée`);
    if (!Array.isArray(q.choices) || q.choices.length !== 4) {
      errors.push(`${at} : il faut exactement 4 propositions`);
    } else if (new Set(q.choices).size !== 4) {
      errors.push(`${at} : propositions en double`);
    } else if (q.choices.some((c) => typeof c !== "string" || !c.trim())) {
      errors.push(`${at} : proposition vide`);
    }
  }
});

/* Les pièces dessinées référencées doivent exister. */
const artFile = path.join(racine, "assets", "art.js");
if (fs.existsSync(artFile)) {
  const artSrc = fs.readFileSync(artFile, "utf8");
  const dispo = new Set([...artSrc.matchAll(/^\s{4}([a-z0-9]+):\s*wrap\(/gm)].map((m) => m[1]));
  QUESTIONS.filter((q) => q.type === "draw").forEach((q) => {
    if (!dispo.has(q.art)) errors.push(`devinette « ${q.id} » : pièce dessinée « ${q.art} » absente de art.js`);
  });
} else {
  warn.push("assets/art.js introuvable : pièces dessinées non vérifiées");
}

/* Doublons d'intitulé — strict, y compris pour les devinettes : deux questions
   qui se lisent pareil sont indiscernables pour le joueur comme pour l'outillage. */
const seen = new Map();
QUESTIONS.forEach((q, i) => {
  if (seen.has(q.q)) errors.push(`doublon : questions ${seen.get(q.q) + 1} et ${i + 1} — « ${q.q.slice(0, 50)}… »`);
  else seen.set(q.q, i);
});

/* Couverture niveau × saison. Sous PER_LEVEL, le filtre de saisons se replierait
   silencieusement sur toute la banque ; sous PAIR_MIN, la variété s'effondre. */
function couverture(liste, etiquette, plancher) {
  LEVELS.forEach((lvl) => {
    const inLevel = liste.filter((q) => q.level === lvl);
    if (inLevel.length < PER_LEVEL) {
      errors.push(`${etiquette}niveau ${lvl} : ${inLevel.length} question(s), il en faut au moins ${PER_LEVEL}`);
    }
    SEASONS.forEach((s) => {
      const n = inLevel.filter((q) => q.s === s).length;
      if (n < plancher) {
        errors.push(`${etiquette}niveau ${lvl} × saison ${s} : ${n} question(s), il en faut au moins ${plancher}`);
      }
    });
  });
}
couverture(QUESTIONS, "", PAIR_MIN);

/* Le réglage « sans devinette dessinée » ne doit jamais assécher un couple. */
couverture(QUESTIONS.filter((q) => !q.needsArt), "sans les devinettes pures : ", PER_LEVEL);

/* ---------- Rangs ---------- */
function checkRanks(table, name, max) {
  if (!Array.isArray(table) || !table.length) return errors.push(`${name} : table vide`);
  table.forEach((r, i) => {
    if (!/^[A-Z]{3,9}$/.test(r.wall || "")) errors.push(`${name}[${i}] : mot du mur invalide (${r.wall})`);
    if (!r.name || !r.line) errors.push(`${name}[${i}] : nom ou phrase manquante`);
    if (!/^#[0-9a-f]{6}$/.test(r.tone || "")) errors.push(`${name}[${i}] : teinte absente ou invalide (${r.tone})`);
    if (typeof r.min !== "number" || typeof r.max !== "number" || r.min > r.max) {
      errors.push(`${name}[${i}] : bornes incohérentes`);
    }
  });
  for (let s = 0; s <= max; s++) {
    if (!table.some((r) => s >= r.min && s <= r.max)) errors.push(`${name} : aucun rang pour le score ${s}`);
  }
}
checkRanks(RANKS, "RANKS", PER_LEVEL * 3);
checkRanks(SURVIVAL_RANKS, "SURVIVAL_RANKS", 40);
checkRanks(CAMPAIGN_RANKS, "CAMPAIGN_RANKS", 20);

/* ---------- Traductions ---------- */
/* Une langue est facultative, mais jamais à moitié livrée : soit la matrice
   niveau × saison tient, soit la bascule reste cachée dans l'application. */
const grilles = {};
LANGUES.forEach(({ code, nom, fichier, global }) => {
  const chemin = path.join(racine, fichier);
  if (!fs.existsSync(chemin)) return;
  let banque;
  try {
    banque = new Function("window", `${fs.readFileSync(chemin, "utf8")}; return ${global};`)({});
  } catch (e) {
    errors.push(`banque ${nom} illisible : ${e.message}`);
    return;
  }
  const inconnus = Object.keys(banque).filter((id) => !vusId.has(id));
  if (inconnus.length) {
    errors.push(`banque ${nom} : ${inconnus.length} id inconnu(s) — ${inconnus.slice(0, 3).join(", ")}`);
  }

  const grille = {};
  let structure = 0;
  QUESTIONS.forEach((q) => {
    const e = banque[q.id];
    if (!e) return;
    if (!e.q || !e.fact) { errors.push(`${nom} incomplet : « ${q.id} »`); structure++; return; }
    if (q.choices && (!e.choices || e.choices.length !== q.choices.length)) {
      errors.push(`${nom} : nombre de choix différent pour « ${q.id} »`); structure++; return;
    }
    if (q.steps && (!e.steps || e.steps.length !== q.steps.length)) {
      errors.push(`${nom} : nombre d'étapes différent pour « ${q.id} »`); structure++; return;
    }
    grille[q.level] = grille[q.level] || {};
    grille[q.level][q.s] = (grille[q.level][q.s] || 0) + 1;
  });
  grilles[code] = { nom, grille, total: Object.keys(banque).length };
  if (!structure) {
    const trous = [];
    LEVELS.forEach((l) => SEASONS.forEach((s) => {
      if ((grille[l]?.[s] || 0) < PER_LEVEL) trous.push(`niveau ${l} / saison ${s}`);
    }));
    if (trous.length) warn.push(`${nom} incomplet, bascule masquée (${trous.join(", ")})`);
  }
});

/* Les dictionnaires d'interface doivent au moins se charger et exposer S. */
["assets/i18n.js", "assets/i18n.nl.js"].forEach((rel) => {
  const chemin = path.join(racine, rel);
  if (!fs.existsSync(chemin)) return;
  try {
    const fenetre = {};
    new Function("window", fs.readFileSync(chemin, "utf8"))(fenetre);
    const langs = Object.keys(fenetre.HQ_I18N || {});
    if (!langs.length) errors.push(`${rel} : aucune langue déposée dans window.HQ_I18N`);
    langs.forEach((l) => {
      if (!fenetre.HQ_I18N[l].S) errors.push(`${rel} : la langue ${l} n'a pas de table S`);
    });
  } catch (e) {
    errors.push(`${rel} illisible : ${e.message}`);
  }
});

/* ---------- Rapport ---------- */
const parType = {};
QUESTIONS.forEach((q) => { const t = q.type || "qcm"; parType[t] = (parType[t] || 0) + 1; });

const grid = {};
QUESTIONS.forEach((q) => {
  grid[q.level] = grid[q.level] || {};
  grid[q.level][q.s] = (grid[q.level][q.s] || 0) + 1;
});

const lignes = (g) => LEVELS.map((l) => `  niveau ${l} : ${SEASONS.map((s) => `S${s}=${g[l]?.[s] || 0}`).join("  ")}`);

console.log(`Banque : ${QUESTIONS.length} questions`);
console.log("  types : " + Object.entries(parType).map(([t, n]) => `${t}=${n}`).join("  "));
lignes(grid).forEach((l) => console.log(l));
Object.values(grilles).forEach(({ nom, grille }) => {
  const n = Object.values(grille).reduce((a, o) => a + Object.values(o).reduce((x, y) => x + y, 0), 0);
  console.log(`\n${nom[0].toUpperCase()}${nom.slice(1)} : ${n} / ${QUESTIONS.length} questions traduites`);
  lignes(grille).forEach((l) => console.log(l));
});
warn.forEach((w) => console.log(`! ${w}`));

if (errors.length) {
  console.error(`\n✗ ${errors.length} problème(s) :`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
console.log("\n✓ Banque, rangs et traductions valides.");
