#!/usr/bin/env node
/* Vérifie la banque de questions et les tables de rangs.
   Aucune dépendance : `node tools/check-questions.js` depuis la racine. */

const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "assets", "questions.js");
const src = fs.readFileSync(file, "utf8");

let QUESTIONS, RANKS, SURVIVAL_RANKS;
try {
  ({ QUESTIONS, RANKS, SURVIVAL_RANKS } =
    new Function(src + "\nreturn { QUESTIONS, RANKS, SURVIVAL_RANKS };")());
} catch (e) {
  console.error("✗ assets/questions.js est illisible :", e.message);
  process.exit(1);
}

const PER_LEVEL = 4;          // doit rester aligné sur app.js
const LEVELS = [1, 2, 3];
const SEASONS = [1, 2, 3, 4, 5];
const TYPES = ["qcm", "spell", "vf", "chrono", "intrus", "draw"];
const errors = [];
const warn = [];

/* ---------- Questions ---------- */
QUESTIONS.forEach((q, i) => {
  const at = `question ${i + 1} « ${String(q.q).slice(0, 46)}… »`;
  const type = q.type || "qcm";
  if (!TYPES.includes(type)) errors.push(`${at} : type inconnu (${type})`);
  if (!LEVELS.includes(q.level)) errors.push(`${at} : niveau invalide (${q.level})`);
  if (!SEASONS.includes(q.s)) errors.push(`${at} : saison invalide (${q.s})`);
  if (typeof q.q !== "string" || q.q.length < 10) errors.push(`${at} : intitulé trop court`);
  if (typeof q.fact !== "string" || q.fact.length < 20) errors.push(`${at} : anecdote manquante ou trop courte`);
  if (!/[?.!»]$/.test(String(q.q).trim())) errors.push(`${at} : ponctuation finale manquante`);

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
const artFile = path.join(__dirname, "..", "assets", "art.js");
if (fs.existsSync(artFile)) {
  const artSrc = fs.readFileSync(artFile, "utf8");
  const dispo = new Set([...artSrc.matchAll(/^\s{4}([a-z0-9]+):\s*wrap\(/gm)].map((m) => m[1]));
  QUESTIONS.filter((q) => q.type === "draw").forEach((q, i) => {
    if (!dispo.has(q.art)) errors.push(`devinette ${i + 1} : pièce dessinée « ${q.art} » absente de art.js`);
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

/* Couverture niveau × saison : sous 4, le filtre de saisons se replierait
   silencieusement sur toute la banque. */
LEVELS.forEach((lvl) => {
  const inLevel = QUESTIONS.filter((q) => q.level === lvl);
  if (inLevel.length < PER_LEVEL) errors.push(`niveau ${lvl} : ${inLevel.length} question(s), il en faut au moins ${PER_LEVEL}`);
  SEASONS.forEach((s) => {
    const n = inLevel.filter((q) => q.s === s).length;
    if (n < PER_LEVEL) errors.push(`niveau ${lvl} × saison ${s} : ${n} question(s), il en faut au moins ${PER_LEVEL}`);
  });
});

/* ---------- Rangs ---------- */
function checkRanks(table, name, max) {
  if (!Array.isArray(table) || !table.length) return errors.push(`${name} : table vide`);
  table.forEach((r, i) => {
    if (!/^[A-Z]{3,9}$/.test(r.wall || "")) errors.push(`${name}[${i}] : mot du mur invalide (${r.wall})`);
    if (!r.name || !r.line) errors.push(`${name}[${i}] : nom ou phrase manquante`);
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

/* ---------- Couverture anglaise ---------- */
/* L'anglais est facultatif, mais il ne doit jamais être à moitié livré :
   soit la matrice niveau × saison tient, soit la bascule reste cachée. */
let enGrid = null;
try {
  const enSrc = fs.readFileSync(path.join(__dirname, "..", "assets", "questions.en.js"), "utf8");
  const QUESTIONS_EN = new Function("window", `${enSrc}; return QUESTIONS_EN;`)({});
  enGrid = {};
  let structure = 0;
  QUESTIONS.forEach((q) => {
    const e = QUESTIONS_EN[q.q];
    if (!e) return;
    if (!e.q || !e.fact) { errors.push(`EN incomplet : « ${q.q} »`); structure++; return; }
    if (q.choices && (!e.choices || e.choices.length !== q.choices.length)) {
      errors.push(`EN : nombre de choix différent pour « ${q.q} »`); structure++; return;
    }
    if (q.steps && (!e.steps || e.steps.length !== q.steps.length)) {
      errors.push(`EN : nombre d'étapes différent pour « ${q.q} »`); structure++; return;
    }
    enGrid[q.level] = enGrid[q.level] || {};
    enGrid[q.level][q.s] = (enGrid[q.level][q.s] || 0) + 1;
  });
  if (!structure) {
    const trous = [];
    LEVELS.forEach((l) => SEASONS.forEach((s) => {
      if ((enGrid[l]?.[s] || 0) < PER_LEVEL) trous.push(`niveau ${l} / saison ${s}`);
    }));
    if (trous.length) warn.push(`anglais incomplet, bascule masquée (${trous.join(", ")})`);
  }
} catch (e) {
  warn.push(`banque anglaise illisible : ${e.message}`);
}

/* ---------- Rapport ---------- */
/* Répartition par type, pour l'affichage */
const parType = {};
QUESTIONS.forEach((q) => { const t = q.type || "qcm"; parType[t] = (parType[t] || 0) + 1; });

const grid = {};
QUESTIONS.forEach((q) => {
  grid[q.level] = grid[q.level] || {};
  grid[q.level][q.s] = (grid[q.level][q.s] || 0) + 1;
});

console.log(`Banque : ${QUESTIONS.length} questions`);
console.log("  types : " + Object.entries(parType).map(([t, n]) => `${t}=${n}`).join("  "));
LEVELS.forEach((l) => console.log(`  niveau ${l} : ${SEASONS.map((s) => `S${s}=${grid[l]?.[s] || 0}`).join("  ")}`));
if (enGrid) {
  const nbEn = Object.values(enGrid).reduce((a, o) => a + Object.values(o).reduce((x, y) => x + y, 0), 0);
  console.log(`\nAnglais : ${nbEn} / ${QUESTIONS.length} questions traduites`);
  LEVELS.forEach((l) => console.log(`  niveau ${l} : ${SEASONS.map((s) => `S${s}=${enGrid[l]?.[s] || 0}`).join("  ")}`));
}
warn.forEach((w) => console.log(`! ${w}`));

if (errors.length) {
  console.error(`\n✗ ${errors.length} problème(s) :`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
console.log("\n✓ Banque et rangs valides.");
