#!/usr/bin/env node
/* Test de fumée — joue vraiment au quiz dans un Chromium sans interface.
   Il ne vérifie pas les réponses : il vérifie que l'application tient debout,
   dans les cinq modes, dans toutes les langues, avec tous les réglages, et
   qu'aucune erreur n'atterrit dans la console.

   Playwright n'est pas une dépendance du projet : l'intégration continue
   l'installe avec --no-save, le temps du test.

     node tools/smoke.mjs [url]            (défaut http://127.0.0.1:8099) */

import { chromium } from "playwright";

const BASE = process.argv[2] || "http://127.0.0.1:8099";
/* Sur une machine où le Chromium de Playwright n'est pas téléchargeable,
   HQ_SMOKE_CHANNEL=msedge suffit à faire tourner le test. */
const CANAL = process.env.HQ_SMOKE_CHANNEL || null;
const erreurs = [];
const fait = [];
let page;

const ok = (quoi) => { fait.push(quoi); console.log(`  ✓ ${quoi}`); };
const rate = (quoi, e) => {
  erreurs.push(`${quoi} : ${e && e.message ? e.message : e}`);
  console.error(`  ✗ ${quoi} — ${e && e.message ? e.message : e}`);
};

/* Répond à la question affichée, quel que soit son format. La réponse est
   volontairement quelconque : c'est le moteur qu'on teste, pas le joueur. */
async function repondre() {
  await page.waitForSelector("#btnNext:not([hidden]), .choice:not([disabled]), .chrono__chip:not([disabled]), .spell__slot",
    { timeout: 8000 });
  if (await page.locator("#btnNext:visible").count()) return;      // chrono déjà écoulé

  if (await page.locator("#spell:visible").count()) {
    const n = await page.locator(".spell__slot").count();
    for (let i = 0; i < n; i++) await page.keyboard.press("a");
  } else if (await page.locator("#chrono:visible").count()) {
    for (let i = 0; i < 3; i++) {
      const chip = page.locator(".chrono__chip:not([disabled])").first();
      if (await chip.count()) await chip.click({ timeout: 3000 }).catch(() => {});
    }
  } else {
    const choix = page.locator(".choice:not([disabled])").first();
    if (await choix.count()) await choix.click({ timeout: 3000 }).catch(() => {});
  }
  await page.waitForSelector("#btnNext:not([hidden])", { timeout: 8000 });
}

/* Enchaîne jusqu'au verdict, avec un garde-fou : un mode sans fin ne doit pas
   faire tourner le test indéfiniment. */
async function jouer(maxTours = 26) {
  for (let i = 0; i < maxTours; i++) {
    if (await page.locator("#screen-result.is-active").count()) return i;
    if (await page.locator("#relay:visible").count()) {
      await page.locator("#relayGo").click();
      continue;
    }
    await repondre();
    await page.locator("#btnNext").click();
    await page.waitForTimeout(120);
  }
  return maxTours;
}

async function partie(modeBtn, nom, maxTours) {
  await page.waitForSelector("#screen-intro.is-active", { timeout: 8000 });
  await page.locator(modeBtn).click();
  await page.locator("#btnStart").click();
  await page.waitForSelector("#screen-quiz.is-active", { timeout: 8000 });
  await jouer(maxTours);
  await page.waitForSelector("#screen-result.is-active", { timeout: 15000 });
  const rang = (await page.locator("#rankName").textContent()) || "";
  if (!rang.trim()) throw new Error("verdict sans rang");
  ok(`${nom} — verdict « ${rang.trim()} »`);
  await page.locator("#btnReplay").click();
  await page.waitForSelector("#screen-quiz.is-active", { timeout: 8000 });
  await page.reload({ waitUntil: "load" });
  await page.waitForSelector("#screen-intro.is-active", { timeout: 8000 });
}

const navigateur = await chromium.launch(CANAL ? { channel: CANAL } : {});
const contexte = await navigateur.newContext();
page = await contexte.newPage();

page.on("console", (m) => {
  if (m.type() === "error") erreurs.push(`console: ${m.text()}`);
});
page.on("pageerror", (e) => erreurs.push(`page: ${e.message}`));
page.on("requestfailed", (r) => {
  /* Le service worker peut annuler des requêtes au rechargement : on ne
     retient que les vrais échecs de ressources du site. */
  if (r.url().startsWith(BASE)) erreurs.push(`requête échouée : ${r.url()}`);
});

try {
  await page.goto(BASE, { waitUntil: "load" });
  await page.waitForSelector("#screen-intro.is-active", { timeout: 10000 });
  ok("l'écran d'accueil se charge");

  /* Sans chrono : le reste du test n'a pas à courir après le Démogorgon. */
  await page.locator("#opts summary").click();
  await page.locator("#optRelax").click();
  await page.locator("#optLisible").click();
  await page.locator("#optParty").click();
  await page.locator("#optNoart").click();
  const reglages = await page.locator(".opt.is-on").count();
  if (reglages !== 4) throw new Error(`${reglages} réglage(s) actif(s) au lieu de 4`);
  ok("les quatre réglages de confort s'activent");

  await partie("#modeEnquete", "Enquête", 16);
  await partie("#modeCampagne", "Campagne", 26);
  /* En duel, chaque passage d'appareil consomme un tour de boucle en plus. */
  await partie("#modeDuel", "Duel", 30);

  /* La Survie s'arrête à la première erreur : elle peut tomber très vite. */
  await page.locator("#modeSurvie").click();
  await page.locator("#btnStart").click();
  await page.waitForSelector("#screen-quiz.is-active", { timeout: 8000 });
  await jouer(30);
  await page.waitForSelector("#screen-result.is-active", { timeout: 15000 });
  ok("Survie — verdict rendu");
  await page.reload({ waitUntil: "load" });
  await page.waitForSelector("#screen-intro.is-active", { timeout: 8000 });

  /* Le carnet d'erreurs doit s'être rempli tout seul pendant les parties. */
  const carnet = await page.locator("#modeRevanche").isVisible();
  if (carnet) {
    await partie("#modeRevanche", "Revanche", 16);
  } else {
    ok("Revanche encore masquée (carnet trop court) — comportement attendu");
  }

  /* Défi du jour : il garde son chrono même avec le réglage « sans chrono ». */
  await page.locator("#modeDefi").click();
  await page.locator("#btnStart").click();
  await page.waitForSelector("#screen-quiz.is-active", { timeout: 8000 });
  if (!(await page.locator("#hunt").isVisible())) throw new Error("le défi du jour a perdu son chrono");
  ok("Défi du jour — le chrono reste imposé");
  await jouer(16);
  await page.waitForSelector("#screen-result.is-active", { timeout: 25000 });

  /* Statistiques : les nouveaux blocs doivent apparaître. */
  await page.reload({ waitUntil: "load" });
  await page.locator("#btnStats").click();
  await page.waitForSelector("#screen-stats.is-active", { timeout: 8000 });
  const titres = await page.locator(".sblock__title").allTextContents();
  const attendus = ["saison", "format", "carnet"];
  const manquants = attendus.filter((a) => !titres.some((t) => t.toLowerCase().includes(a)));
  if (manquants.length) throw new Error(`bloc(s) absent(s) : ${manquants.join(", ")}`);
  const barres = await page.locator(".sbar__fill").count();
  if (!barres) throw new Error("aucune barre de réussite tracée");
  ok(`statistiques — ${titres.length} blocs, ${barres} barres`);
  await page.locator("#btnStatsBack").click();

  /* Langues : la bascule doit tourner et rester jouable. */
  const langues = [];
  for (let i = 0; i < 4; i++) {
    if (!(await page.locator("#btnLang").isVisible())) break;
    await page.locator("#btnLang").click();
    const lang = await page.evaluate(() => document.documentElement.lang);
    if (langues.includes(lang)) break;
    langues.push(lang);
    const titre = (await page.locator("#startLabel").textContent()) || "";
    if (!titre.trim()) throw new Error(`libellé de départ vide en ${lang}`);
  }
  if (langues.length < 2) throw new Error(`une seule langue disponible (${langues.join(", ")})`);
  ok(`bascule de langue — ${langues.join(" → ")}`);

  /* Une partie complète dans la dernière langue atteinte. */
  await partie("#modeEnquete", `Enquête en ${await page.evaluate(() => document.documentElement.lang)}`, 16);

  /* Les jokers survivent à la traduction : ils vivent dans un bloc réécrit. */
  await page.locator("#modeEnquete").click();
  await page.locator("#btnStart").click();
  await page.waitForSelector("#screen-quiz.is-active", { timeout: 8000 });
  const joker = page.locator("#jokerAv");
  if (await joker.isEnabled()) {
    await joker.click();
    await page.waitForTimeout(200);
    if (!(await joker.evaluate((b) => b.classList.contains("is-used")))) {
      throw new Error("le joker Cerebro n'a pas réagi après traduction");
    }
    ok("les jokers restent cliquables après traduction");
  }
  await page.reload({ waitUntil: "load" });

  /* Duel par lien : un résultat encodé dans l'URL doit s'afficher. */
  await page.goto(`${BASE}/?d=1&r=110210110121&n=ABC`, { waitUntil: "load" });
  await page.waitForSelector("#rival:not([hidden])", { timeout: 8000 });
  const banniere = (await page.locator("#rival").textContent()) || "";
  if (!banniere.includes("ABC") || !banniere.includes("7")) {
    throw new Error(`bannière inattendue : ${banniere.trim()}`);
  }
  ok("duel par lien — le score de l'adversaire est lu depuis l'URL");
} catch (e) {
  rate("parcours", e);
}

await navigateur.close();

console.log(`\n${fait.length} étape(s) validée(s).`);
if (erreurs.length) {
  console.error(`\n✗ ${erreurs.length} problème(s) :`);
  [...new Set(erreurs)].forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
console.log("✓ Test de fumée passé, console vierge.");
