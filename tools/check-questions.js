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
const SEASONS = [1, 2, 3, 4];
const errors = [];
const warn = [];

/* ---------- Questions ---------- */
QUESTIONS.forEach((q, i) => {
  const at = `question ${i + 1} « ${String(q.q).slice(0, 46)}… »`;
  if (!LEVELS.includes(q.level)) errors.push(`${at} : niveau invalide (${q.level})`);
  if (!SEASONS.includes(q.s)) errors.push(`${at} : saison invalide (${q.s})`);
  if (typeof q.q !== "string" || q.q.length < 10) errors.push(`${at} : intitulé trop court`);
  if (typeof q.fact !== "string" || !q.fact.length) errors.push(`${at} : anecdote manquante`);

  if (q.type === "spell") {
    if (!/^[A-Z]{3,9}$/.test(q.answer || "")) {
      errors.push(`${at} : réponse à épeler invalide (3 à 9 lettres A-Z sans accent)`);
    }
  } else {
    if (!Array.isArray(q.choices) || q.choices.length !== 4) {
      errors.push(`${at} : il faut exactement 4 propositions`);
    } else if (new Set(q.choices).size !== 4) {
      errors.push(`${at} : propositions en double`);
    } else if (q.choices.some((c) => typeof c !== "string" || !c.trim())) {
      errors.push(`${at} : proposition vide`);
    }
  }
});

/* Doublons d'intitulé */
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

/* ---------- Rapport ---------- */
const grid = {};
QUESTIONS.forEach((q) => {
  grid[q.level] = grid[q.level] || {};
  grid[q.level][q.s] = (grid[q.level][q.s] || 0) + 1;
});

console.log(`Banque : ${QUESTIONS.length} questions, dont ${QUESTIONS.filter((q) => q.type === "spell").length} à épeler`);
LEVELS.forEach((l) => console.log(`  niveau ${l} : ${SEASONS.map((s) => `S${s}=${grid[l]?.[s] || 0}`).join("  ")}`));
warn.forEach((w) => console.log(`! ${w}`));

if (errors.length) {
  console.error(`\n✗ ${errors.length} problème(s) :`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
console.log("\n✓ Banque et rangs valides.");
