/* ==================================================================
   Hawkins Quiz — moteur
   Vanilla JS, zéro dépendance. Tous les sons sont synthétisés.
================================================================== */
(() => {
  "use strict";

  /* ==================================================================
     0. Configuration
  ================================================================== */
  const PER_LEVEL = 4;                        // questions tirées par niveau
  const TOTAL = PER_LEVEL * 3;
  const TIME = { 1: 25, 2: 20, 3: 15 };
  const TIME_UD = { 1: 15, 2: 12, 3: 10 };    // le Monde à l'Envers ne patiente pas
  const SURV = { start: 15, step: .5, floor: 5 };
  const SURV_UD = { start: 10, step: .5, floor: 4 };
  const BOARD_SIZE = 10;
  const HP_MAX = 20;                       // campagne : points de vie de départ
  const CAMPAGNE_LONGUEUR = 20;            // questions à tenir pour boucler la campagne

  const PHASES = {
    1: { name: "Hawkins, 1983", sub: "Niveau 1 — Sous-sol des Wheeler" },
    2: { name: "Hawkins National Lab", sub: "Niveau 2 — Accès restreint" },
    3: { name: "Le Monde à l'Envers", sub: "Niveau 3 — Ne respirez pas" }
  };
  const PHASES_UD = {
    1: { name: "Strate I — Hawkins noyé", sub: "Le sous-sol, mais en dessous" },
    2: { name: "Strate II — Le labo mort", sub: "Plus personne ne tient la porte" },
    3: { name: "Strate III — Chez lui", sub: "L'horloge a déjà commencé" }
  };
  const PHASES_SURV = {
    1: { name: "La chasse commence", sub: "Il vous a repéré" },
    2: { name: "Il accélère", sub: "Le couloir se rétrécit" },
    3: { name: "Il est derrière vous", sub: "Ne vous retournez pas" }
  };

  const BULB_COLORS = ["#ff2f45", "#ffc13b", "#3ddc84", "#3aa8ff", "#b14cff", "#ff7a2f"];
  const STORE = {
    ud: "hq.ud", udOn: "hq.udOn", secrets: "hq.secrets", seen: "hq.seen", seasons: "hq.seasons",
    stats: "hq.stats", streak: "hq.streak", ranks: "hq.ranks",
    done: (seed) => `hq.done.${seed.toString(36)}`,
    board: (mode) => `hq.board.${mode}`
  };

  /* Le défi du jour est numéroté depuis cette date. */
  const EPOCH = Date.UTC(2026, 0, 1);

  /* ==================================================================
     1. Raccourcis et utilitaires
  ================================================================== */
  const $ = (id) => document.getElementById(id);
  const body = document.body;
  const el = {
    wall: $("wall"), wallCaption: $("wallCaption"), wallResult: $("wallResult"),
    btnStart: $("btnStart"), startLabel: $("startLabel"),
    btnSound: $("btnSound"), soundLabel: $("soundLabel"),
    btnNext: $("btnNext"), btnReplay: $("btnReplay"), btnShare: $("btnShare"), btnCard: $("btnCard"),
    udToggle: $("udToggle"), udLabel: $("udLabel"), secrets: $("secrets"),
    modeEnquete: $("modeEnquete"), modeSurvie: $("modeSurvie"), modeDefi: $("modeDefi"),
    modeDuel: $("modeDuel"), modeCampagne: $("modeCampagne"),
    relay: $("relay"), relayWho: $("relayWho"), relayScore: $("relayScore"), relayGo: $("relayGo"),
    defiTitle: $("defiTitle"), defiSub: $("defiSub"), record: $("record"),
    seasons: [...document.querySelectorAll(".season")],
    brandTitle: $("brandTitle"), scoreBtn: $("scoreBtn"), scoreIcon: $("scoreIcon"),
    phaseName: $("phaseName"), progress: $("progress"), score: $("score"),
    hunt: $("hunt"), huntFill: $("huntFill"), demo: $("demo"), timerVal: $("timerVal"),
    strike: $("strike"),
    qLevel: $("qLevel"), qText: $("qText"), choices: $("choices"), reveal: $("reveal"),
    spell: $("spell"), spellSlots: $("spellSlots"), wallQuiz: $("wallQuiz"), spellBack: $("spellBack"),
    art: $("art"), chrono: $("chrono"), chronoSlots: $("chronoSlots"),
    chronoPool: $("chronoPool"), chronoBack: $("chronoBack"),
    streak: $("streak"), stats: $("stats"), marks: $("marks"), badge: $("badge"),
    rankName: $("rankName"), rankLine: $("rankLine"), spores: $("spores"),
    initials: $("initials"), iniSlots: $("iniSlots"), iniBack: $("iniBack"), iniOk: $("iniOk"),
    board: $("board"), dayStreak: $("dayStreak"),
    jokers: $("jokers"), joker5050: $("joker5050"), jokerTime: $("jokerTime"), jokerAv: $("jokerAv"),
    btnStats: $("btnStats"), btnStatsBack: $("btnStatsBack"), btnWipe: $("btnWipe"),
    statsBody: $("statsBody"), statsTitle: $("statsTitle"), duelScore: $("duelScore"),
    hp: $("hp"), hpDie: $("hpDie"), hpFill: $("hpFill"), hpVal: $("hpVal"),
    toast: $("toast"), toastText: $("toastText"), toastAct: $("toastAct"), toastNo: $("toastNo")
  };
  const screens = {
    intro: $("screen-intro"), quiz: $("screen-quiz"),
    result: $("screen-result"), stats: $("screen-stats")
  };

  /* Socle commun fourni par core.js : utilitaires, stockage, audio, mur, effets. */
  const { util, store, sfx, wall, fx } = window.HQ;
  const { sleep, reduced, shuffle, mulberry32, shuffleWith, hashString, buzz } = util;
  const { nosebleed, rain, flash, flip, strike, celebrate, keepAwake } = fx;

  function todayNumber() {
    const now = new Date();
    const utc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.floor((utc - EPOCH) / 86400000) + 1;
  }
  const seedForDay = (n) => hashString(`hawkins-jour-${n}`);

  /* ==================================================================
     5. Secrets du mur
  ================================================================== */
  let udUnlocked = store.get(STORE.ud) === "1";
  let udOn = udUnlocked && store.get(STORE.udOn) === "1";
  const found = new Set((store.get(STORE.secrets) || "").split(",").filter(Boolean));

  const SECRETS = [
    { id: "eggo", word: "EGGO", say: "Le congélateur est ouvert.",
      run() { rain("🧇", 30); sfx.win(); } },
    { id: "vecna", word: "VECNA", say: "Quatre coups. Courez.",
      run() {
        for (let i = 0; i < 4; i++) { sfx.chime(i); setTimeout(() => flip(160), i * 950); }
        buzz([40, 900, 40, 900, 40, 900, 40]);
      } },
    { id: "eleven", word: "ELEVEN", say: "Elle vous a entendu.",
      run() { nosebleed(); setTimeout(nosebleed, 500); sfx.gate(); buzz([20, 60, 20]); } },
    { id: "barb", word: "BARB", say: "Quelqu'un s'en souvient, enfin.",
      run() { rain("🕯️", 14); sfx.chime(0); } },
    { id: "run", word: "RUN", say: "Un peu tard pour ça, non ?",
      run() { flip(1200); sfx.wrong(); } },
    { id: "envers", word: "ENVERS", say: "La faille est ouverte.",
      run() { unlockUD(); } }
  ];

  function renderSecrets() {
    if (!found.size) { el.secrets.hidden = true; return; }
    el.secrets.hidden = false;
    const dots = SECRETS.map((s) => `<i class="${found.has(s.id) ? "on" : ""}">●</i>`).join("");
    el.secrets.innerHTML = `Secrets du mur ${found.size} / ${SECRETS.length} ${dots}`;
  }

  function unlockUD() {
    const first = !udUnlocked;
    udUnlocked = true;
    store.set(STORE.ud, "1");
    el.udToggle.hidden = false;
    sfx.unlock();
    if (first) setUD(true);
  }

  function setUD(on, silent = false) {
    udOn = on;
    store.set(STORE.udOn, on ? "1" : "0");
    body.classList.toggle("ud", on);
    el.udToggle.setAttribute("aria-pressed", String(on));
    el.udLabel.textContent = on ? "Monde à l'Envers : ouvert" : "Monde à l'Envers : scellé";
    el.scoreIcon.textContent = on ? "🩸" : "🧇";
    renderRecord();
    if (on && !silent) { buzz([12, 40, 12]); flash("Le Monde à l'Envers vous attend"); }
  }

  /* Composition : lettres tapées au doigt ou au clavier */
  let composing = [];
  let composeTimer;

  function tapLetter(L, cell) {
    wall.setTwinkle(false);
    if (cell) {
      cell.classList.add("on");
      setTimeout(() => cell.classList.remove("on"), 650);
    }
    sfx.bulb();
    buzz(8);
    composing.push(L);
    if (composing.length > 9) composing.shift();
    if (screens.intro.classList.contains("is-active")) {
      el.wallCaption.classList.add("is-composing");
      el.wallCaption.textContent = composing.join(" ");
    }
    clearTimeout(composeTimer);
    composeTimer = setTimeout(resetCompose, 2600);
    checkSecret();
  }

  function resetCompose() {
    composing = [];
    el.wallCaption.classList.remove("is-composing");
    el.wallCaption.textContent = "À vous de répondre.";
    wall.setTwinkle(true);
  }

  function checkSecret() {
    const buf = composing.join("");
    const hit = SECRETS.find((s) => buf.endsWith(s.word));
    if (!hit) return;
    clearTimeout(composeTimer);
    composing = [];
    const isNew = !found.has(hit.id);
    found.add(hit.id);
    store.set(STORE.secrets, [...found].join(","));
    renderSecrets();
    el.wallCaption.classList.remove("is-composing");
    el.wallCaption.textContent = hit.say;
    if (screens.intro.classList.contains("is-active")) {
      wall.spell(el.wall, hit.word, { on: 200, gap: 60 }).then(() => {
        wall.twinkle(el.wall);
      });
    }
    hit.run();
    if (isNew && found.size === SECRETS.length) {
      setTimeout(() => flash("Le mur n'a plus rien à dire. Bravo."), 2400);
    }
  }

  /* ==================================================================
     6. Tableau d'honneur
  ================================================================== */
  const boardKey = (mode, ud) => `${STORE.board(mode)}${ud ? ".ud" : ""}`;
  const getBoard = (mode, ud) => store.json(boardKey(mode, ud), []);

  /* Les défis joués s'accumulaient sans limite : une clé par graine. */
  function purgeOldChallenges(maxDays = 45) {
    const limit = Date.now() - maxDays * 86400000;
    let keys = [];
    try { keys = Object.keys(localStorage); } catch { return; }
    keys.filter((k) => k.startsWith("hq.done.")).forEach((k) => {
      const rec = store.json(k, null);
      const stamp = rec && rec.t ? rec.t : 0;
      if (stamp < limit) { try { localStorage.removeItem(k); } catch { /* ignoré */ } }
    });
  }

  function qualifies(score, mode, ud) {
    if (score <= 0 || mode === "duel") return false;   // un duel n'a pas de score individuel
    const b = getBoard(mode, ud);
    return b.length < BOARD_SIZE || score > b[b.length - 1].s;
  }

  function pushScore(ini, score, mode, ud) {
    const b = getBoard(mode, ud);
    const entry = { i: ini, s: score, d: new Date().toISOString().slice(0, 10) };
    b.push(entry);
    b.sort((x, y) => y.s - x.s);
    const cut = b.slice(0, BOARD_SIZE);
    store.set(boardKey(mode, ud), JSON.stringify(cut));
    return cut.indexOf(entry);
  }

  const MODE_LABEL = { enquete: "Enquête", survie: "Survie", defi: "Défi", duel: "Duel", campagne: "Campagne" };

  function renderBoard(mode, ud, highlight = -1) {
    const b = getBoard(mode, ud);
    if (!b.length) { el.board.hidden = true; return; }
    el.board.hidden = false;
    const unit = (mode === "survie" || mode === "campagne") ? "" : ` / ${TOTAL}`;
    el.board.innerHTML =
      `<p class="board__title">Tableau d'honneur — ${MODE_LABEL[mode]}${ud ? " · Monde à l'Envers" : ""}</p>` +
      b.map((e, i) => `<div class="board__row${i === highlight ? " is-new" : ""}">
          <i>${String(i + 1).padStart(2, "0")}</i>
          <b>${e.i}</b>
          <span>${e.s}${unit}</span>
          <i>${e.d.slice(8)}/${e.d.slice(5, 7)}</i>
        </div>`).join("");
  }

  function renderRecord() {
    const b = getBoard(mode, udOn);
    if (!b.length) { el.record.hidden = true; return; }
    el.record.hidden = false;
    const top = b[0];
    const unit = (mode === "survie" || mode === "campagne") ? " questions" : ` / ${TOTAL}`;
    el.record.innerHTML = `Record ${MODE_LABEL[mode]} : <b>${top.s}${unit}</b> par ${top.i}`;
  }

  /* --- Saisie des initiales, sur le mur du résultat --- */
  let iniActive = false;
  let ini = [];

  function renderIniSlots() {
    el.iniSlots.innerHTML = [0, 1, 2]
      .map((i) => `<div class="initials__slot${i === ini.length ? " is-next" : ""}">${ini[i] || ""}</div>`)
      .join("");
    el.iniOk.disabled = ini.length < 3;
  }

  function openInitials() {
    iniActive = true;
    ini = [];
    el.initials.hidden = false;
    wall.clear(el.wallResult);
    renderIniSlots();
  }

  function pushInitial(L, cell) {
    if (!iniActive || ini.length >= 3) return;
    ini.push(L);
    cell?.classList.add("on");
    sfx.bulb();
    buzz(8);
    renderIniSlots();
  }

  function popInitial() {
    if (!iniActive || !ini.length) return;
    const L = ini.pop();
    el.wallResult.querySelector(`.wall__cell[data-letter="${L}"]`)?.classList.remove("on");
    sfx.click();
    renderIniSlots();
  }

  function commitInitials() {
    if (ini.length < 3) return;
    const rank = pushScore(ini.join(""), state.mode === "campagne" ? state.i : state.score, state.mode, state.ud);
    iniActive = false;
    el.initials.hidden = true;
    sfx.carve();
    buzz([14, 50, 14]);
    renderBoard(state.mode, state.ud, rank);
    renderRecord();
    wall.spell(el.wallResult, lastRank.wall, { keep: true, on: 240, gap: 70 });
  }

  /* ==================================================================
     6 bis. Statistiques, série de jours et galerie des rangs
  ================================================================== */
  const BLANK_STATS = { played: 0, dist: {}, perfect: 0, timeouts: 0, correct: 0, asked: 0, surv: 0, survBest: 0, defi: 0 };
  const getStats = () => Object.assign({}, BLANK_STATS, store.json(STORE.stats, {}));
  const getRanks = () => new Set(store.json(STORE.ranks, []));

  function recordGame(rank) {
    const s = getStats();
    s.correct += state.score;
    s.asked += state.marks.length;
    s.timeouts += state.timeouts;
    if (state.mode === "duel") {
      s.duel = (s.duel || 0) + 1;               // les duels comptent à part
    } else if (state.mode === "campagne") {
      s.camp = (s.camp || 0) + 1;
      s.campBest = Math.max(s.campBest || 0, state.i);
    } else if (state.mode === "survie") {
      s.surv++;
      s.survBest = Math.max(s.survBest, state.score);
    } else {
      s.played++;
      s.dist[state.score] = (s.dist[state.score] || 0) + 1;
      if (state.score === TOTAL) s.perfect++;
      if (state.mode === "defi") s.defi++;
    }
    store.set(STORE.stats, JSON.stringify(s));

    const got = getRanks();
    got.add(rank.name);
    store.set(STORE.ranks, JSON.stringify([...got]));
  }

  /* Série de jours : seul le vrai défi du jour la fait vivre. */
  function bumpStreak() {
    const rec = store.json(STORE.streak, { n: 0, last: -99 });
    if (rec.last === dayN) return rec;
    rec.n = rec.last === dayN - 1 ? rec.n + 1 : 1;
    rec.last = dayN;
    rec.best = Math.max(rec.best || 0, rec.n);
    store.set(STORE.streak, JSON.stringify(rec));
    return rec;
  }

  function currentStreak() {
    const rec = store.json(STORE.streak, null);
    if (!rec) return null;
    /* Une série se rompt dès qu'un jour est sauté. */
    return rec.last === dayN || rec.last === dayN - 1 ? rec : { n: 0, best: rec.best || 0, last: rec.last };
  }

  function renderStreak() {
    const rec = currentStreak();
    if (!rec || !rec.n) { el.dayStreak.hidden = true; return; }
    el.dayStreak.hidden = false;
    el.dayStreak.textContent = rec.n === 1
      ? "Série de défis : 1 jour"
      : `Série de défis : ${rec.n} jours d'affilée`;
  }

  function renderStats() {
    const s = getStats();
    const got = getRanks();
    const streak = currentStreak();
    const total = s.played + s.surv;

    if (!total) {
      el.statsBody.innerHTML = `<p class="empty">Aucune partie terminée pour l'instant.<br>
        Le dossier se remplira tout seul.</p>`;
      return;
    }

    const scores = Object.keys(s.dist).map(Number);
    const maxCount = Math.max(1, ...scores.map((k) => s.dist[k]));
    const bestScore = scores.length ? Math.max(...scores) : 0;
    const hist = Array.from({ length: TOTAL + 1 }, (_, i) => {
      const n = s.dist[i] || 0;
      const w = n ? Math.max(10, Math.round((n / maxCount) * 100)) : 0;
      return `<div class="hist__row">
        <span class="hist__n">${i}</span>
        <div class="hist__bar${n ? (i === bestScore ? " is-top" : "") : " is-empty"}" style="width:${n ? w : 4}%">${n || ""}</div>
      </div>`;
    }).join("");

    const pct = s.asked ? Math.round((s.correct / s.asked) * 100) : 0;
    const allRanks = [...RANKS.map((r) => r.name), "Le Démogorgon", ...SURVIVAL_RANKS.map((r) => r.name)];
    const gallery = [...new Set(allRanks)].map((n) => `
      <div class="rankchip${got.has(n) ? " is-got" : ""}"><b>${got.has(n) ? n : "? ? ?"}</b>${got.has(n) ? "" : "à débloquer"}</div>`).join("");

    el.statsBody.innerHTML = `
      <div class="sblock">
        <p class="sblock__title">En chiffres</p>
        <div class="stats">
          <div class="stat"><b>${total}</b><span>Parties</span></div>
          <div class="stat"><b>${pct}%</b><span>Bonnes réponses</span></div>
          <div class="stat"><b>${s.perfect}</b><span>Sans-faute</span></div>
          <div class="stat"><b>${s.survBest}</b><span>Record Survie</span></div>
        </div>
      </div>
      ${s.played ? `<div class="sblock">
        <p class="sblock__title">Répartition des scores — ${s.played} partie${s.played > 1 ? "s" : ""}</p>
        <div class="hist">${hist}</div>
      </div>` : ""}
      <div class="sblock">
        <p class="sblock__title">Défi du jour</p>
        <div class="stats">
          <div class="stat"><b>${s.defi}</b><span>Défis relevés</span></div>
          <div class="stat"><b>${streak ? streak.n : 0}</b><span>Série en cours</span></div>
          <div class="stat"><b>${streak ? (streak.best || streak.n) : 0}</b><span>Meilleure série</span></div>
          <div class="stat"><b>${s.timeouts}</b><span>Rattrapé·e</span></div>
        </div>
      </div>
      <div class="sblock">
        <p class="sblock__title">Galerie des rangs — ${got.size} / ${new Set(allRanks).size}</p>
        <div class="gallery">${gallery}</div>
      </div>`;
  }

  function wipeData() {
    if (!window.confirm("Effacer scores, statistiques, secrets et défis enregistrés sur cet appareil ? C'est définitif.")) return;
    try {
      Object.keys(localStorage).filter((k) => k.startsWith("hq.")).forEach((k) => localStorage.removeItem(k));
    } catch { /* ignoré */ }
    location.reload();
  }

  /* ==================================================================
     7. Moteur de quiz
  ================================================================== */
  let mode = "enquete";

  const state = {
    mode: "enquete", deck: [], i: 0, score: 0, streak: 0, best: 0,
    timeouts: 0, times: [], marks: [], locked: true, ud: false, over: false,
    used: new Set(), frozen: false, frozenLeft: 0, duel: [0, 0], hp: HP_MAX, roll: 0,
    phase: 0, raf: 0, deadline: 0, duration: 0, lastTick: -1, close: false
  };

  function setMode(m) {
    mode = m;
    body.classList.remove("mode-survie", "mode-defi", "mode-duel", "mode-campagne");
    if (m !== "enquete") body.classList.add(`mode-${m}`);
    [["enquete", el.modeEnquete], ["survie", el.modeSurvie], ["defi", el.modeDefi],
      ["duel", el.modeDuel], ["campagne", el.modeCampagne]]
      .forEach(([key, btn]) => {
        btn.classList.toggle("is-on", m === key);
        btn.setAttribute("aria-pressed", String(m === key));
      });
    const done = dailyDone();
    el.startLabel.textContent =
      m === "survie" ? "Lancer la chasse"
      : m === "duel" ? "Lancer le duel"
      : m === "campagne" ? "Ouvrir la campagne"
      : m === "defi" ? (done ? "Défi déjà relevé" : "Relever le défi")
      : "Entrer dans le sous-sol";
    el.btnStart.disabled = m === "defi" && !!done;
    renderRecord();
  }

  /* --- Défi du jour et défis reçus par lien --- */
  const urlSeed = (() => {
    const raw = new URLSearchParams(location.search).get("d");
    const n = raw ? parseInt(raw, 36) : NaN;
    return Number.isFinite(n) && n > 0 ? n >>> 0 : null;
  })();
  let dayN = todayNumber();
  let defiSeed = urlSeed ?? seedForDay(dayN);
  let isReceived = urlSeed !== null && urlSeed !== seedForDay(dayN);
  const dailyDone = () => store.json(STORE.done(defiSeed), null);

  /* Un onglet laissé ouvert doit basculer sur le défi du lendemain à minuit —
     mais jamais au milieu d'une partie. */
  function refreshDay() {
    if (screens.quiz.classList.contains("is-active")) return;
    const n = todayNumber();
    if (n === dayN) return;
    dayN = n;
    if (urlSeed === null) defiSeed = seedForDay(dayN);
    isReceived = urlSeed !== null && urlSeed !== seedForDay(dayN);
    renderDefi();
    setMode(mode);
    flash("Nouveau jour, nouveau défi");
  }

  function renderDefi() {
    const done = dailyDone();
    el.defiTitle.textContent = isReceived ? "Défi reçu" : `Défi du jour nº ${dayN}`;
    el.defiSub.textContent = done
      ? `Déjà relevé : ${done.s} / ${TOTAL} — ${done.r}`
      : isReceived
        ? "Quelqu'un vous a envoyé exactement ce paquet"
        : "Les mêmes 12 questions pour tout le monde";
    el.modeDefi.classList.toggle("mode--done", !!done);
  }

  function buildSeededDeck(seed) {
    const rng = mulberry32(seed);
    const deck = [];
    [1, 2, 3].forEach((lvl) => {
      const pool = QUESTIONS.filter((q) => q.level === lvl);
      shuffleWith(rng, pool).slice(0, PER_LEVEL).forEach((q) => {
        switch (q.type) {
          case "spell": deck.push({ ...q, correct: q.answer }); break;
          case "vf": deck.push({ ...q, correct: q.answer ? VF[0] : VF[1], shuffled: VF.slice() }); break;
          case "chrono": deck.push({ ...q, correct: q.steps.join(" ⇢ "), shuffled: shuffleWith(rng, q.steps) }); break;
          default: deck.push({ ...q, correct: q.choices[0], shuffled: shuffleWith(rng, q.choices) });
        }
      });
    });
    return deck;
  }

  const VF = ["Vrai", "Faux"];

  /* Chaque type de question sait produire sa bonne réponse et son affichage. */
  const prep = (q) => {
    switch (q.type) {
      case "spell":
        return { ...q, correct: q.answer };
      case "vf":
        return { ...q, correct: q.answer ? VF[0] : VF[1], shuffled: VF.slice() };
      case "chrono":
        return { ...q, correct: q.steps.join(" ⇢ "), shuffled: shuffle(q.steps) };
      default:                                   // qcm, intrus, draw
        return { ...q, correct: q.choices[0], shuffled: shuffle(q.choices) };
    }
  };

  /* --- Saisons retenues pour le tirage --- */
  let seasons = new Set(store.json(STORE.seasons, [1, 2, 3, 4, 5]));

  function renderSeasons() {
    el.seasons.forEach((b) => {
      const on = seasons.has(Number(b.dataset.s));
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", String(on));
    });
  }

  function toggleSeason(n) {
    if (seasons.has(n)) {
      if (seasons.size === 1) return flash("Il faut bien garder une saison");
      seasons.delete(n);
    } else seasons.add(n);
    store.set(STORE.seasons, JSON.stringify([...seasons]));
    renderSeasons();
  }

  /* --- Anti-répétition : on retient ce qui a déjà été posé --- */
  const qid = (q) => {
    let h = 0;
    for (let i = 0; i < q.q.length; i++) h = (Math.imul(31, h) + q.q.charCodeAt(i)) | 0;
    return h;
  };
  let seen = new Set(store.json(STORE.seen, []));
  const saveSeen = () => store.set(STORE.seen, JSON.stringify([...seen]));

  function poolFor(level) {
    const all = QUESTIONS.filter((q) => level === null || q.level === level);
    const filtered = all.filter((q) => seasons.has(q.s));
    /* Si le filtre de saisons assèche un niveau, on rouvre tout pour ce niveau. */
    return filtered.length >= PER_LEVEL ? filtered : all;
  }

  function drawFresh(pool, n) {
    let fresh = pool.filter((q) => !seen.has(qid(q)));
    if (fresh.length < n) {
      pool.forEach((q) => seen.delete(qid(q)));   // banque épuisée : on repart à zéro
      fresh = pool.slice();
    }
    const picked = shuffle(fresh).slice(0, n);
    picked.forEach((q) => seen.add(qid(q)));
    return picked;
  }

  function buildDeck() {
    if (mode === "defi") return buildSeededDeck(defiSeed);
    if (mode === "survie") {
      return shuffle(poolFor(null)).map(prep);
    }
    const deck = [];
    [1, 2, 3].forEach((lvl) => drawFresh(poolFor(lvl), PER_LEVEL).forEach((q) => deck.push(prep(q))));
    saveSeen();
    return deck;
  }

  /* --- Duel local : deux joueurs, un appareil, chacun son tour --- */
  const DUEL_NOMS = ["Joueur 1", "Joueur 2"];
  const duelTour = () => state.i % 2;          // 0 puis 1, en alternance

  function renderDuelScore() {
    const t = duelTour();
    el.duelScore.innerHTML =
      `<b class="${t === 0 ? "is-turn" : ""}">${state.duel[0]}</b>
       <span>—</span>
       <b class="${t === 1 ? "is-turn" : ""}">${state.duel[1]}</b>`;
  }

  function showRelay() {
    const t = duelTour();
    el.relayWho.textContent = DUEL_NOMS[t];
    el.relayScore.textContent = `${state.duel[0]} — ${state.duel[1]}  ·  question ${state.i + 1} sur ${TOTAL}`;
    el.relay.hidden = false;
    el.relayGo.focus({ preventScroll: true });
  }

  /* En Survie, on recycle le paquet indéfiniment. */
  function currentQuestion() {
    if (state.i < state.deck.length) return state.deck[state.i];
    state.deck = state.deck.concat(shuffle(poolFor(null)).map(prep));
    return state.deck[state.i];
  }

  const sansFin = () => state.mode === "survie" || state.mode === "campagne";
  const phaseFor = (q, i) =>
    sansFin() ? Math.min(3, Math.floor(i / 5) + 1) : q.level;

  function phaseLabels() {
    if (sansFin()) return PHASES_SURV;
    return state.ud ? PHASES_UD : PHASES;
  }

  function setPhase(p) {
    if (state.phase === p) return;
    const first = state.phase === 0;
    state.phase = p;
    body.classList.remove("phase-0", "phase-1", "phase-2", "phase-3");
    body.classList.add(`phase-${p}`);
    el.phaseName.textContent = phaseLabels()[p].name;
    if (first) return;
    sfx.gate();
    buzz([18, 70, 18]);
    if (state.mode === "survie") flash(p === 2 ? "Il accélère" : "Il est juste derrière");
    else if (state.ud) flash(p === 2 ? "Vous descendez encore" : "Il vous a senti");
    else flash(p === 2 ? "Accès au laboratoire" : "Vous glissez dans le Monde à l'Envers");
  }

  function durationFor(q, i) {
    /* Chaque format a son propre rythme : épeler ou ordonner prend du temps,
       un vrai/faux doit rester un réflexe. */
    const bonus = q ? ({ spell: 8, chrono: 10, draw: 4, vf: -6 }[q.type] || 0) : 0;
    if (sansFin()) {
      const s = state.ud ? SURV_UD : SURV;
      const base = Math.max(4, Math.max(s.floor, s.start - i * s.step) + bonus);
      /* Un 1 naturel au dé réduit le temps de moitié, en campagne uniquement. */
      return state.mode === "campagne" && state.roll === 1 ? Math.max(4, base / 2) : base;
    }
    return Math.max(6, (state.ud ? TIME_UD : TIME)[q.level] + bonus);
  }

  function startTimer(seconds) {
    cancelAnimationFrame(state.raf);
    state.duration = seconds * 1000;
    state.deadline = performance.now() + state.duration;
    state.lastTick = -1;
    state.close = false;
    state.frozen = false;
    el.hunt.classList.remove("is-close", "is-caught", "is-frozen");
    el.demo.style.setProperty("--p", "0");

    const loop = (now) => {
      if (state.frozen) {
        /* Le walkman gèle la traque : on repousse l'échéance au même rythme. */
        state.deadline = now + state.frozenLeft;
        state.raf = requestAnimationFrame(loop);
        return;
      }
      const left = Math.max(0, state.deadline - now);
      const ratio = left / state.duration;
      el.huntFill.style.transform = `scaleX(${ratio})`;
      el.demo.style.setProperty("--p", (1 - ratio).toFixed(4));

      if (!state.close && ratio <= .28) {
        state.close = true;
        el.hunt.classList.add("is-close");
      }
      const s = Math.ceil(left / 1000);
      if (s !== state.lastTick) {
        state.lastTick = s;
        el.timerVal.textContent = s;
        if (ratio <= .28 && s > 0) sfx.tick();
      }
      if (left <= 0) { answer(null); return; }
      state.raf = requestAnimationFrame(loop);
    };
    state.raf = requestAnimationFrame(loop);
  }

  /* ==================================================================
     7 bis. Jokers — un seul usage chacun, interdits en mode Défi
  ================================================================== */
  const JOKERS = [
    { id: "5050", btn: () => el.joker5050 },
    { id: "time", btn: () => el.jokerTime },
    { id: "av", btn: () => el.jokerAv }
  ];

  function renderJokers() {
    const hidden = state.mode === "defi" || state.mode === "duel";
    el.jokers.hidden = hidden;
    if (hidden) return;
    const q = state.deck.length ? currentQuestion() : null;
    JOKERS.forEach(({ id, btn }) => {
      const b = btn();
      const used = state.used.has(id);
      const impossible = id === "5050" && q && ["spell", "chrono", "vf"].includes(q.type);
      b.classList.toggle("is-used", used);
      b.disabled = used || impossible || state.locked;
      b.setAttribute("aria-disabled", String(b.disabled));
    });
  }

  function useJoker(id, run) {
    if (state.locked || state.used.has(id) || state.mode === "defi") return;
    state.used.add(id);
    sfx.unlock();
    buzz([10, 40, 10]);
    run();
    renderJokers();
  }

  const joker5050 = () => useJoker("5050", () => {
    const q = currentQuestion();
    if (q.type === "spell") return;
    const wrong = [...el.choices.children].filter((b) => b.lastElementChild.textContent !== q.correct);
    shuffle(wrong).slice(0, 2).forEach((b) => {
      b.classList.add("is-faded");
      b.disabled = true;
    });
    flash("Deux réponses écartées");
  });

  const jokerTime = () => useJoker("time", () => {
    state.frozenLeft = Math.max(0, state.deadline - performance.now());
    state.frozen = true;
    el.hunt.classList.add("is-frozen");
    el.hunt.classList.remove("is-close");
    flash("Le walkman tient le monstre à distance");
  });

  const jokerAv = () => useJoker("av", () => {
    const q = currentQuestion();
    if (q.type === "spell") {
      /* Le Club AV souffle la première et la dernière lettre. */
      const target = q.correct;
      spelled = [];
      renderSpellSlots();
      const slots = el.spellSlots.children;
      slots[0].textContent = target[0];
      slots[0].classList.add("is-hint");
      slots[spellLen - 1].textContent = target[spellLen - 1];
      slots[spellLen - 1].classList.add("is-hint");
      flash("Cerebro a capté deux lettres");
      return;
    }
    if (q.type === "chrono") {
      /* Le Club AV place le premier moment à votre place. */
      chronoPicked = [q.steps[0]];
      renderChrono();
      flash("Cerebro a daté le premier moment");
      return;
    }
    /* Sondage plausible : le Club AV a souvent raison, mais pas toujours. */
    const n = el.choices.children.length;
    const good = 42 + Math.floor(Math.random() * 32);
    const rest = shuffle(Array.from({ length: n - 1 }, () => Math.random()));
    const sum = rest.reduce((a, b) => a + b, 0) || 1;
    let left = 100 - good;
    const shares = rest.map((v, i) => {
      const part = i === rest.length - 1 ? left : Math.round((v / sum) * (100 - good));
      left -= part;
      return part;
    });
    let k = 0;
    [...el.choices.children].forEach((b) => {
      const pct = b.lastElementChild.textContent === q.correct ? good : shares[k++];
      const tag = document.createElement("span");
      tag.className = "choice__pct";
      tag.textContent = `${pct} %`;
      b.appendChild(tag);
      const bar = document.createElement("span");
      bar.className = "choice__vote";
      bar.style.width = "0%";
      b.appendChild(bar);
      requestAnimationFrame(() => { bar.style.width = `${pct}%`; });
    });
    flash("Le Club AV a voté");
  });

  /* --- Questions à épeler : le mur devient le clavier --- */
  let spellActive = false;
  let spelled = [];
  let spellLen = 0;

  function renderSpellSlots(verdict) {
    const target = currentQuestion().correct;
    el.spellSlots.innerHTML = Array.from({ length: spellLen }, (_, i) => {
      let cls = "spell__slot";
      if (verdict) cls += spelled[i] === target[i] ? " is-ok" : " is-ko";
      else if (i === spelled.length) cls += " is-next";
      return `<div class="${cls}">${spelled[i] || ""}</div>`;
    }).join("");
  }

  function pushSpell(L, cell) {
    if (!spellActive || spelled.length >= spellLen) return;
    spelled.push(L);
    if (cell) {
      cell.classList.add("on");
      setTimeout(() => cell.classList.remove("on"), 400);
    }
    sfx.bulb(); buzz(8);
    renderSpellSlots();
    if (spelled.length === spellLen) {
      spellActive = false;
      setTimeout(() => answer(spelled.join("")), 350);
    }
  }

  function popSpell() {
    if (!spellActive || !spelled.length) return;
    spelled.pop();
    sfx.click();
    renderSpellSlots();
  }

  /* --- Chronologie : on désigne les moments dans l'ordre --- */
  let chronoActive = false;
  let chronoPicked = [];

  function renderChrono(verdict) {
    const q = currentQuestion();
    const attendu = q.steps;
    el.chronoSlots.innerHTML = attendu.map((_, i) => {
      const val = chronoPicked[i];
      let cls = "chrono__slot";
      if (verdict) cls += val === attendu[i] ? " is-ok" : " is-ko";
      else if (val) cls += " is-filled";
      else if (i === chronoPicked.length) cls += " is-next";
      return `<li class="${cls}">${val || "…"}</li>`;
    }).join("");

    el.chronoPool.innerHTML = "";
    q.shuffled.forEach((step) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chrono__chip" + (chronoPicked.includes(step) ? " is-taken" : "");
      b.textContent = step;
      b.disabled = !chronoActive || chronoPicked.includes(step);
      b.addEventListener("click", () => pushChrono(step));
      el.chronoPool.appendChild(b);
    });
  }

  function pushChrono(step) {
    const q = currentQuestion();
    if (!chronoActive || chronoPicked.includes(step)) return;
    chronoPicked.push(step);
    sfx.bulb();
    buzz(8);
    renderChrono();
    if (chronoPicked.length === q.steps.length) {
      chronoActive = false;
      setTimeout(() => answer(chronoPicked.join(" ⇢ ")), 350);
    }
  }

  function popChrono() {
    if (!chronoActive || !chronoPicked.length) return;
    chronoPicked.pop();
    sfx.click();
    renderChrono();
  }

  function render() {
    const q = currentQuestion();
    setPhase(phaseFor(q, state.i));

    el.progress.textContent = sansFin()
      ? `Question ${state.i + 1}`
      : `Question ${state.i + 1} / ${TOTAL}`;
    el.qLevel.textContent = phaseLabels()[state.phase].sub;
    el.qText.textContent = q.q;
    if (state.ud && !reduced) {
      el.qText.style.animation = "none";
      void el.qText.offsetWidth;
      el.qText.style.animation = "";
    }
    el.reveal.classList.remove("is-on");
    el.reveal.innerHTML = "";
    el.btnNext.hidden = true;
    el.choices.innerHTML = "";

    const kind = q.type || "qcm";
    /* En campagne, le dé est lancé avant que le chrono ne démarre. */
    if (state.mode === "campagne") lancerDe(q);
    renderHp();
    const useChoices = kind === "qcm" || kind === "intrus" || kind === "draw" || kind === "vf";
    el.choices.hidden = !useChoices;
    el.spell.hidden = kind !== "spell";
    el.chrono.hidden = kind !== "chrono";
    el.art.hidden = kind !== "draw";
    el.choices.className = "choices"
      + (kind === "vf" ? " choices--vf" : "")
      + (kind === "intrus" ? " choices--grid" : "");
    spellActive = kind === "spell";
    spelled = [];
    chronoPicked = [];

    if (kind === "draw") {
      el.art.innerHTML = (window.HQ_ART || {})[q.art] || "";
    }

    if (kind === "spell") {
      spellLen = q.correct.length;
      wall.clear(el.wallQuiz);
      renderSpellSlots();
    } else if (kind === "chrono") {
      chronoActive = true;
      renderChrono();
    } else {
      q.shuffled.forEach((choice, idx) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "choice";
        b.innerHTML = kind === "vf"
          ? `<span>${choice}</span>`
          : `<span class="choice__key">${idx + 1}</span><span>${choice}</span>`;
        b.addEventListener("click", () => answer(choice));
        el.choices.appendChild(b);
      });
    }

    /* L'horloge de Vecna sonne à mi-parcours dans le Monde à l'Envers. */
    if (state.ud && !sansFin() && state.i === TOTAL / 2) {
      sfx.chime(0); sfx.chime(1);
      flash("L'horloge sonne");
    }

    state.locked = false;
    startTimer(durationFor(q, state.i));
    renderJokers();
    if (state.mode === "duel") renderDuelScore();
    else el.score.textContent = state.score;
    /* Le bouton « Suivant » vient d'être masqué : sans ça le focus retombe sur
       le document et le lecteur d'écran n'annonce pas la nouvelle question. */
    if (state.i > 0) el.qText.focus({ preventScroll: true });
  }

  function answer(choice) {
    if (state.locked) return;
    state.locked = true;
    spellActive = false;
    chronoActive = false;
    state.frozen = false;
    cancelAnimationFrame(state.raf);
    renderJokers();

    const q = currentQuestion();
    const elapsed = (state.duration - Math.max(0, state.deadline - performance.now())) / 1000;
    state.times.push(Math.min(elapsed, state.duration / 1000));
    const ok = choice === q.correct;

    if (q.type === "spell") {
      renderSpellSlots(true);
      wall.spell(el.wallQuiz, q.correct, { keep: true, on: 130, gap: 45 });
    } else if (q.type === "chrono") {
      renderChrono(true);
    } else {
      [...el.choices.children].forEach((b) => {
        const txt = b.lastElementChild.textContent;
        b.disabled = true;
        if (txt === q.correct) b.classList.add("is-correct");
        else if (txt === choice) b.classList.add("is-wrong");
        else b.classList.add("is-faded");
      });
    }

    if (ok) {
      el.hunt.classList.remove("is-close");
      state.score++;
      if (state.mode === "duel") state.duel[duelTour()]++;
      state.streak++;
      state.best = Math.max(state.best, state.streak);
      state.marks.push(state.ud ? "🩸" : "🧇");
      el.score.textContent = state.score;
      sfx.correct();
      buzz(14);
      if (state.streak === 3) { nosebleed(); flash("Série de 3 — saignement de nez"); }
      else if (state.streak >= 5 && state.streak % 5 === 0) { nosebleed(); flash(`Série de ${state.streak} — Eleven approuve`); }
    } else {
      state.streak = 0;
      if (choice === null) {
        state.timeouts++;
        state.marks.push("⏳");
        el.hunt.classList.add("is-caught");
        strike(); sfx.pounce(); buzz([60, 40, 120]);
      } else {
        state.marks.push("💀");
        sfx.wrong(); buzz([30, 60, 30]);
      }
      if (state.mode === "survie") state.over = true;
      else if (state.mode === "campagne") {
        const d = degats(q) + (choice === null ? 2 : 0);
        state.hp -= d;
        renderHp();
        flash(`${d} points de dégâts`);
        if (state.hp <= 0) state.over = true;
      }
    }

    const head = choice === null
      ? "<b>Trop tard.</b> Le Démogorgon n'attend pas. "
      : ok ? "<b>Exact.</b> " : `<b>Raté.</b> C'était «&nbsp;${q.correct}&nbsp;». `;    el.reveal.innerHTML = head + q.fact;
    el.reveal.classList.add("is-on");

    const fini = state.mode === "campagne"
      ? state.i === CAMPAGNE_LONGUEUR - 1
      : (!sansFin() && state.i === TOTAL - 1);
    const last = state.over || fini;
    el.btnNext.hidden = false;
    el.btnNext.textContent = last ? "Voir le verdict" : "Suivant";
    el.btnNext.focus({ preventScroll: true });
  }

  /* --- Campagne : points de vie, dé à vingt faces et dégâts par niveau --- */
  const degats = (q) => 2 + (q.level || 1) * 2;        // 4, 6 ou 8

  function renderHp() {
    const campagne = state.mode === "campagne";
    el.hp.hidden = !campagne;
    if (!campagne) return;
    const part = Math.max(0, state.hp) / HP_MAX;
    el.hpFill.style.transform = `scaleX(${part})`;
    el.hpFill.classList.toggle("is-low", part <= .35);
    el.hpVal.textContent = Math.max(0, state.hp);
    el.hpDie.textContent = state.roll || "—";
    el.hpDie.classList.toggle("is-crit", state.roll === 20);
    el.hpDie.classList.toggle("is-fumble", state.roll === 1);
  }

  /* Le dé est lancé avant chaque question : 20 écarte deux réponses,
     1 divise le chrono par deux, le reste est pure ambiance. */
  function lancerDe(q) {
    state.roll = 1 + Math.floor(Math.random() * 20);
    el.hpDie.classList.remove("is-rolling");
    void el.hpDie.offsetWidth;
    el.hpDie.classList.add("is-rolling");
    renderHp();
    if (state.roll === 20) {
      sfx.unlock();
      flash("20 naturel — le sort tourne");
      if (!["spell", "chrono", "vf"].includes(q.type)) {
        setTimeout(() => {
          const mauvaises = [...el.choices.children].filter((b) => b.lastElementChild.textContent !== q.correct);
          shuffle(mauvaises).slice(0, 2).forEach((b) => { b.classList.add("is-faded"); b.disabled = true; });
        }, 320);
      }
    } else if (state.roll === 1) {
      sfx.wrong();
      flash("1 naturel — échec critique");
    }
  }

  function next() {
    sfx.click();
    if (state.over) return finish();
    state.i++;
    if (!sansFin() && state.i >= TOTAL) return finish();
    if (state.mode === "campagne" && state.i >= CAMPAGNE_LONGUEUR) return finish();
    /* En duel, on interpose l'écran de passage avant d'afficher la question. */
    if (state.mode === "duel") { showRelay(); return; }
    render();
  }

  /* ==================================================================
     8. Résultat
  ================================================================== */
  /* Chaque écran reprend le focus sur son titre : sans ça, un utilisateur au
     clavier reste accroché à un bouton devenu invisible. */
  const SCREEN_HEAD = {
    intro: () => el.brandTitle, quiz: () => el.qText,
    result: () => el.rankName, stats: () => el.statsTitle
  };

  function show(name) {
    Object.values(screens).forEach((s) => s.classList.remove("is-active"));
    screens[name].classList.add("is-active");
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    /* Différé d'une frame : le contenu de l'écran est rendu juste après l'appel. */
    requestAnimationFrame(() => SCREEN_HEAD[name]?.().focus({ preventScroll: true }));
  }

  const ZERO_RANK = {
    name: "Le Démogorgon",
    wall: "ZERO",
    line: "Zéro sur douze. Statistiquement, il faut le faire exprès. La conclusion s'impose : le monstre, c'est vous."
  };

  const DUEL_RANKS = [
    { name: "Match nul", wall: "EGALITE", line: "Personne ne cède. Il va falloir rejouer, et cette fois sans excuses." },
    { name: "Joueur 1 l'emporte", wall: "PREMIER", line: "La victoire est nette. Le sous-sol des Wheeler a un nouveau maître." },
    { name: "Joueur 2 l'emporte", wall: "SECOND", line: "Retourné la situation depuis le siège du passager. Élégant." }
  ];

  const pickRank = () => {
    if (state.mode === "duel") {
      const [a, b] = state.duel;
      return a === b ? DUEL_RANKS[0] : (a > b ? DUEL_RANKS[1] : DUEL_RANKS[2]);
    }
    if (state.mode === "campagne") {
      return CAMPAIGN_RANKS.find((r) => state.i >= r.min && state.i <= r.max) || CAMPAIGN_RANKS[0];
    }
    const table = state.mode === "survie" ? SURVIVAL_RANKS : RANKS;
    if (state.mode !== "survie" && state.score === 0) return ZERO_RANK;
    return table.find((r) => state.score >= r.min && state.score <= r.max) || table[0];
  };

  let lastRank = null, lastUD = false, lastMode = "enquete";

  async function finish() {
    cancelAnimationFrame(state.raf);
    const rank = pickRank();
    lastRank = rank;
    lastUD = state.ud;
    lastMode = state.mode;

    el.rankName.textContent = rank.name;
    el.rankLine.textContent = rank.line;

    el.badge.hidden = !state.ud;
    el.badge.textContent = state.score >= (state.mode === "survie" ? 10 : 7)
      ? "Revenu du Monde à l'Envers"
      : "Resté dans le Monde à l'Envers";

    const avg = state.times.length
      ? (state.times.reduce((a, b) => a + b, 0) / state.times.length).toFixed(1)
      : "0";

    el.marks.innerHTML = state.marks.slice(-24)
      .map((m, i) => (i && i % PER_LEVEL === 0 ? '<span class="sep">│</span>' : "") + m)
      .join("");

    const unit = state.ud ? "Gouttes" : "Gaufres";
    el.stats.innerHTML = state.mode === "survie"
      ? `<div class="stat"><b>${state.score}</b><span>Questions tenues</span></div>
         <div class="stat"><b>${avg}s</b><span>Temps moyen</span></div>
         <div class="stat"><b>${(durationFor(null, state.i)).toFixed(1)}s</b><span>Dernier chrono</span></div>
         <div class="stat"><b>${state.timeouts}</b><span>Rattrapé·e</span></div>`
      : state.mode === "duel"
      ? `<div class="stat"><b>${state.duel[0]}</b><span>Joueur 1</span></div>
         <div class="stat"><b>${state.duel[1]}</b><span>Joueur 2</span></div>
         <div class="stat"><b>${avg}s</b><span>Temps moyen</span></div>
         <div class="stat"><b>${state.timeouts}</b><span>Dévoré·e par le chrono</span></div>`
      : state.mode === "campagne"
      ? `<div class="stat"><b>${state.i}</b><span>Questions tenues</span></div>
         <div class="stat"><b>${Math.max(0, state.hp)}</b><span>Points de vie</span></div>
         <div class="stat"><b>${state.score}</b><span>Bonnes réponses</span></div>
         <div class="stat"><b>${avg}s</b><span>Temps moyen</span></div>`
      : `<div class="stat"><b>${state.score}/${TOTAL}</b><span>${unit}</span></div>
         <div class="stat"><b>${state.best}</b><span>Meilleure série</span></div>
         <div class="stat"><b>${avg}s</b><span>Temps moyen</span></div>
         <div class="stat"><b>${state.timeouts}</b><span>Dévoré·e par le chrono</span></div>`;

    show("result");
    keepAwake(false);
    recordGame(rank);

    const parfait = state.mode === "survie" ? state.score >= 20 : state.score === TOTAL;
    if (parfait) { celebrate(state.ud ? "🩸" : "🧇"); sfx.win(); flash("Sans la moindre fausse note"); }
    else if (state.score >= (state.mode === "survie" ? 10 : 9)) sfx.win();

    if (state.mode === "defi") {
      store.set(STORE.done(defiSeed), JSON.stringify({
        s: state.score, r: rank.name, m: state.marks.join(""), t: Date.now()
      }));
      if (!isReceived) bumpStreak();
      renderDefi();
      renderStreak();
      setMode("defi");
    }

    const scoreClasse = state.mode === "campagne" ? state.i : state.score;
    const qualified = qualifies(scoreClasse, state.mode, state.ud);
    renderBoard(state.mode, state.ud, -1);

    await sleep(400);
    await wall.spell(el.wallResult, rank.wall, { keep: true, on: 420, gap: 110 });

    if (qualified) { await sleep(500); openInitials(); }
  }

  const challengeURL = () =>
    `${location.origin}${location.pathname}?d=${defiSeed.toString(36)}`;

  function shareText() {
    const grid = state.marks.slice(-24).reduce((acc, m, i) => {
      acc += m;
      if ((i + 1) % PER_LEVEL === 0 && i < Math.min(state.marks.length, 24) - 1) acc += " │ ";
      return acc;
    }, "");
    const head = lastMode === "survie"
      ? `Hawkins Quiz — Survie : ${state.score} questions tenues ${lastUD ? "🙃" : "🧇"}`
      : lastMode === "duel"
        ? `Hawkins Quiz — Duel : ${state.duel[0]} — ${state.duel[1]}`
      : lastMode === "defi"
        ? `Hawkins Quiz — ${isReceived ? "Défi reçu" : `Défi nº ${dayN}`} : ${state.score}/${TOTAL} ${lastUD ? "🙃" : "🧇"}`
        : `Hawkins Quiz — ${state.score}/${TOTAL} ${lastUD ? "🙃" : "🧇"}`;
    const jok = state.used.size ? `  ·  ${state.used.size} joker${state.used.size > 1 ? "s" : ""}` : "";
    const serie = lastMode === "defi" && !isReceived && currentStreak()?.n > 1
      ? `Série : ${currentStreak().n} jours` : "";
    return [
      head,
      `Rang : ${lastRank ? lastRank.name : "—"}${lastUD ? "  ·  Mode Monde à l'Envers" : ""}${jok}`,
      ...(serie ? [serie] : []),
      "",
      grid,
      "",
      lastMode === "defi" ? "Même paquet, même chance. À vous :" : "Survivrez-vous au Monde à l'Envers ?",
      lastMode === "defi" ? challengeURL() : "https://sebplace.github.io/hawkins-quiz/"
    ].join("\n");
  }

  /* ==================================================================
     9. Démarrage / rejouer
  ================================================================== */
  function startGame() {
    iniActive = false;
    el.initials.hidden = true;
    el.board.hidden = true;
    el.relay.hidden = true;
    Object.assign(state, {
      mode, deck: buildDeck(), i: 0, score: 0, streak: 0, best: 0,
      timeouts: 0, times: [], marks: [], locked: true, phase: 0, ud: udOn, over: false,
      used: new Set(), frozen: false, frozenLeft: 0, duel: [0, 0], hp: HP_MAX, roll: 0
    });
    el.score.textContent = "0";
    el.scoreIcon.textContent = udOn ? "🩸" : "🧇";
    const duel = mode === "duel";
    el.scoreIcon.hidden = duel;
    el.score.hidden = duel;
    el.duelScore.hidden = !duel;
    wall.setTwinkle(false);
    wall.bump();
    keepAwake(true);
    show("quiz");
    render();
  }

  /* ==================================================================
     9 bis. Carte de score partageable, dessinée au canvas
  ================================================================== */
  const PALETTE = {
    enquete: { a: "#e8112d", b: "#ffb648", bg: "#0b0a10" },
    survie: { a: "#e8112d", b: "#ffb648", bg: "#0b0a10" },
    defi: { a: "#3aa8ff", b: "#7ef9d0", bg: "#080b12" },
    ud: { a: "#b14cff", b: "#ff3b7b", bg: "#06030c" }
  };

  async function buildCard() {
    const W = 1080, H = 1350;
    const c = document.createElement("canvas");
    c.width = W; c.height = H;
    const x = c.getContext("2d");
    const pal = lastUD ? PALETTE.ud : (PALETTE[lastMode] || PALETTE.enquete);

    try { await document.fonts.ready; } catch { /* polices système */ }

    const bg = x.createRadialGradient(W / 2, -120, 60, W / 2, H * .55, H);
    bg.addColorStop(0, lastUD ? "#170a2b" : "#1a1420");
    bg.addColorStop(.55, pal.bg);
    bg.addColorStop(1, "#04040a");
    x.fillStyle = bg; x.fillRect(0, 0, W, H);

    /* Grain léger, pour éviter l'aplat numérique */
    x.globalAlpha = .05;
    for (let i = 0; i < 2600; i++) {
      x.fillStyle = Math.random() > .5 ? "#fff" : "#000";
      x.fillRect(Math.random() * W, Math.random() * H, 2, 2);
    }
    x.globalAlpha = 1;

    const center = (txt, y, font, fill, glow = 0) => {
      x.font = font; x.textAlign = "center"; x.textBaseline = "alphabetic";
      if (glow) { x.shadowColor = fill; x.shadowBlur = glow; }
      x.fillStyle = fill; x.fillText(txt, W / 2, y);
      x.shadowBlur = 0;
    };

    center("LE TEST OFFICIEUX DU FAN", 130, '500 26px "Space Grotesk", sans-serif', "#8c92a6");

    /* Titre, contour seul comme dans l'app */
    x.font = '400 140px "Rozha One", Georgia, serif';
    x.textAlign = "center";
    x.lineWidth = 4; x.strokeStyle = pal.a;
    x.shadowColor = pal.a; x.shadowBlur = 38;
    x.strokeText("HAWKINS", W / 2, 270);
    x.font = '400 58px "Rozha One", Georgia, serif';
    x.lineWidth = 3;
    x.strokeText("Q U I Z", W / 2, 340);
    x.shadowBlur = 0;

    /* Bandeau du mode */
    const modeTxt = lastMode === "survie" ? "MODE SURVIE"
      : lastMode === "defi" ? (isReceived ? "DÉFI REÇU" : `DÉFI Nº ${dayN}`)
      : "ENQUÊTE";
    center(modeTxt + (lastUD ? "  ·  MONDE À L'ENVERS" : ""), 410,
      '700 24px "Space Grotesk", sans-serif', pal.b);

    /* Score */
    const scoreTxt = lastMode === "survie" ? `${state.score}` : `${state.score}/${TOTAL}`;
    center(scoreTxt, 620, '400 190px "Rozha One", Georgia, serif', "#f3ece0", 30);
    center(lastMode === "survie" ? "QUESTIONS TENUES" : (lastUD ? "GOUTTES" : "GAUFRES"), 672,
      '500 24px "Space Grotesk", sans-serif', "#8c92a6");

    /* Rang */
    x.font = '400 76px "Rozha One", Georgia, serif';
    x.lineWidth = 2.5; x.strokeStyle = pal.a;
    x.shadowColor = pal.a; x.shadowBlur = 26;
    x.strokeText(lastRank ? lastRank.name : "—", W / 2, 790);
    x.shadowBlur = 0;

    /* Phrase du rang, sur deux lignes au besoin */
    const words = (lastRank ? lastRank.line : "").split(" ");
    const lines = [];
    let line = "";
    x.font = '400 30px "Space Grotesk", sans-serif';
    words.forEach((w) => {
      const test = line ? `${line} ${w}` : w;
      if (x.measureText(test).width > W - 260 && line) { lines.push(line); line = w; }
      else line = test;
    });
    if (line) lines.push(line);
    lines.slice(0, 3).forEach((l, i) => center(l, 850 + i * 44, '400 30px "Space Grotesk", sans-serif', "#9aa0b4"));

    /* Grille de résultats, dessinée à la main : le rendu des émojis en canvas
       dépend des polices installées, on ne peut pas s'y fier. */
    const marks = state.marks.slice(-12);
    const cell = 74, gap = 14;
    const gy = 1000;
    marks.forEach((m, i) => {
      const r = Math.floor(i / 6), col = i % 6;
      const rowCount = Math.min(marks.length - r * 6, 6);
      const rw = rowCount * cell + (rowCount - 1) * gap;
      const px = (W - rw) / 2 + col * (cell + gap);
      const py = gy + r * (cell + gap);
      const ok = m === "🧇" || m === "🩸";
      const late = m === "⏳";

      x.fillStyle = ok ? "rgba(255,182,72,.16)" : late ? "rgba(255,255,255,.05)" : "rgba(232,17,45,.16)";
      x.strokeStyle = ok ? pal.b : late ? "#6a7188" : "#e8112d";
      x.lineWidth = 3;
      x.beginPath(); x.roundRect(px, py, cell, cell, 16); x.fill(); x.stroke();

      const cx = px + cell / 2, cy = py + cell / 2, s = 15;
      x.lineWidth = 4; x.lineCap = "round";
      x.beginPath();
      if (ok) {                                  // gaufre : une petite grille
        for (const d of [-s / 2, s / 2]) {
          x.moveTo(cx - s, cy + d); x.lineTo(cx + s, cy + d);
          x.moveTo(cx + d, cy - s); x.lineTo(cx + d, cy + s);
        }
      } else if (late) {                         // sablier
        x.moveTo(cx - s, cy - s); x.lineTo(cx + s, cy - s);
        x.lineTo(cx - s, cy + s); x.lineTo(cx + s, cy + s);
        x.closePath();
      } else {                                   // croix
        x.moveTo(cx - s, cy - s); x.lineTo(cx + s, cy + s);
        x.moveTo(cx + s, cy - s); x.lineTo(cx - s, cy + s);
      }
      x.stroke();
    });

    /* Pied */
    const foot = lastMode === "defi" ? challengeURL().replace(/^https?:\/\//, "") : "sebplace.github.io/hawkins-quiz";
    center(foot, H - 110, '500 26px "Space Grotesk", sans-serif', "#6a7188");
    center("Projet de fan non officiel · sans affiliation avec Netflix", H - 64,
      '400 20px "Space Grotesk", sans-serif', "#4d5468");

    return new Promise((res) => c.toBlob(res, "image/png"));
  }

  let cardBusy = false;
  async function shareCard() {
    if (cardBusy) return;
    cardBusy = true;
    el.btnCard.disabled = true;
    el.btnCard.textContent = "Dessin en cours…";
    let label = "Carte à partager";
    try {
      const blob = await buildCard();
      const file = new File([blob], "hawkins-quiz.png", { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        /* On n'attend pas la feuille de partage : elle peut rester ouverte longtemps. */
        navigator.share({ files: [file], text: shareText() }).catch(() => { /* annulé */ });
        label = "Partage ouvert";
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = "hawkins-quiz.png"; a.click();
        setTimeout(() => URL.revokeObjectURL(url), 4000);
        label = "Image enregistrée";
      }
    } catch {
      label = "Échec du dessin";
    }
    el.btnCard.textContent = label;
    el.btnCard.disabled = false;
    cardBusy = false;
    setTimeout(() => { if (!cardBusy) el.btnCard.textContent = "Carte à partager"; }, 2400);
  }

  /* ==================================================================
     10. Easter eggs hors mur
  ================================================================== */
  const KONAMI = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba";
  let konami = "", digits = "", titleTaps = 0, titleTimer;

  el.brandTitle.addEventListener("click", () => {
    clearTimeout(titleTimer);
    titleTaps++;
    titleTimer = setTimeout(() => (titleTaps = 0), 1200);
    if (titleTaps >= 5) {
      titleTaps = 0;
      flash("Vous avez secoué l'antenne");
      flip(2600); sfx.gate(); buzz([12, 50, 12, 50, 12]);
    }
  });

  el.scoreBtn.addEventListener("click", () => {
    rain(udOn ? "🩸" : "🧇", 18);
    sfx.bulb(); buzz(10);
  });

  document.addEventListener("keydown", (e) => {
    /* Saisie des initiales : elle capte tout le clavier tant qu'elle est ouverte. */
    if (iniActive) {
      if (/^[a-zA-Z]$/.test(e.key)) {
        const L = e.key.toUpperCase();
        pushInitial(L, el.wallResult.querySelector(`.wall__cell[data-letter="${L}"]`));
      } else if (e.key === "Backspace") { e.preventDefault(); popInitial(); }
      else if (e.key === "Enter" && ini.length === 3) { e.preventDefault(); commitInitials(); }
      return;
    }

    /* Question à épeler : le clavier sert à composer, pas à déclencher les secrets. */
    if (spellActive) {
      if (/^[a-zA-Z]$/.test(e.key)) {
        const L = e.key.toUpperCase();
        pushSpell(L, el.wallQuiz.querySelector(`.wall__cell[data-letter="${L}"]`));
      } else if (e.key === "Backspace") { e.preventDefault(); popSpell(); }
      return;
    }

    /* Chronologie : les chiffres désignent le moment à placer. */
    if (chronoActive) {
      if (/^[1-4]$/.test(e.key)) {
        el.chronoPool.children[Number(e.key) - 1]?.click();
      } else if (e.key === "Backspace") { e.preventDefault(); popChrono(); }
      return;
    }

    /* Réponses au clavier */
    if (screens.quiz.classList.contains("is-active")) {
      if (!state.locked && /^[1-4]$/.test(e.key)) {
        el.choices.children[Number(e.key) - 1]?.click();
      } else if (state.locked && !el.btnNext.hidden && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault(); next();
      }
    }

    /* Le mur écoute aussi le clavier : un mot secret tapé marche partout. */
    if (/^[a-zA-Z]$/.test(e.key)) {
      const L = e.key.toUpperCase();
      const cell = screens.intro.classList.contains("is-active")
        ? el.wall.querySelector(`.wall__cell[data-letter="${L}"]`)
        : null;
      tapLetter(L, cell);
    }

    /* "011" → le monde bascule */
    digits = (digits + e.key).slice(-3);
    if (digits === "011" && !screens.quiz.classList.contains("is-active")) {
      digits = "";
      flash("Bonjour Mike."); flip(); sfx.gate();
    }

    /* Konami → pluie de gaufres */
    konami = (konami + e.key).slice(-KONAMI.length);
    if (konami === KONAMI) { konami = ""; flash("Mode Eggo illimité"); rain("🧇", 40); sfx.win(); }
  });

  /* ==================================================================
     11. Câblage
  ================================================================== */
  el.btnStart.addEventListener("click", () => { sfx.click(); buzz(12); startGame(); });
  el.btnNext.addEventListener("click", next);
  el.btnReplay.addEventListener("click", () => { sfx.click(); buzz(12); startGame(); });
  el.udToggle.addEventListener("click", () => { sfx.click(); setUD(!udOn); });
  el.modeEnquete.addEventListener("click", () => { sfx.click(); setMode("enquete"); });
  el.modeSurvie.addEventListener("click", () => { sfx.click(); setMode("survie"); });
  el.modeDefi.addEventListener("click", () => { sfx.click(); setMode("defi"); });
  el.modeDuel.addEventListener("click", () => { sfx.click(); setMode("duel"); });
  el.modeCampagne.addEventListener("click", () => { sfx.click(); setMode("campagne"); });
  el.relayGo.addEventListener("click", () => {
    el.relay.hidden = true;
    sfx.click(); buzz(10);
    render();
  });
  el.btnCard.addEventListener("click", shareCard);
  el.iniBack.addEventListener("click", popInitial);
  el.iniOk.addEventListener("click", commitInitials);
  el.spellBack.addEventListener("click", popSpell);
  el.chronoBack.addEventListener("click", popChrono);
  el.joker5050.addEventListener("click", joker5050);
  el.jokerTime.addEventListener("click", jokerTime);
  el.jokerAv.addEventListener("click", jokerAv);
  el.btnStats.addEventListener("click", () => { sfx.click(); renderStats(); show("stats"); });
  el.btnStatsBack.addEventListener("click", () => { sfx.click(); show("intro"); });
  el.btnWipe.addEventListener("click", wipeData);
  el.seasons.forEach((b) => b.addEventListener("click", () => { sfx.click(); toggleSeason(Number(b.dataset.s)); }));

  el.btnSound.addEventListener("click", () => {
    const on = sfx.toggle();
    el.soundLabel.textContent = on ? "Son : branché" : "Son : coupé";
    el.btnSound.setAttribute("aria-pressed", String(on));
  });

  el.btnShare.addEventListener("click", async () => {
    const txt = shareText();
    const done = (label) => {
      el.btnShare.textContent = label;
      setTimeout(() => (el.btnShare.textContent = "Copier mon score"), 2000);
    };
    if (navigator.share) {
      try { await navigator.share({ text: txt }); return done("Partagé !"); }
      catch { /* partage annulé : on retombe sur la copie */ }
    }
    try { await navigator.clipboard.writeText(txt); return done("Copié !"); }
    catch { /* repli historique */ }
    const ta = document.createElement("textarea");
    ta.value = txt; document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); done("Copié !"); } catch { done("Copie impossible"); }
    ta.remove();
  });

  /* ==================================================================
     13. Coquille applicative : mise à jour et installation
  ================================================================== */
  let toastAction = null;

  function toast(text, label, action) {
    el.toastText.textContent = text;
    el.toastAct.textContent = label;
    toastAction = action;
    el.toast.hidden = false;
  }
  const hideToast = () => { el.toast.hidden = true; toastAction = null; };

  el.toastAct.addEventListener("click", () => { const a = toastAction; hideToast(); a?.(); });
  el.toastNo.addEventListener("click", hideToast);

  /* Une nouvelle version est prête : on propose, on n'impose pas. */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        const reg = await navigator.serviceWorker.register("sw.js");
        reg.addEventListener("updatefound", () => {
          const sw = reg.installing;
          if (!sw || !navigator.serviceWorker.controller) return;   // première installation
          sw.addEventListener("statechange", () => {
            if (sw.state === "installed") {
              toast("Une nouvelle version est prête.", "Recharger", () => location.reload());
            }
          });
        });
      } catch { /* pas de service worker, pas de drame */ }
    });
  }

  /* Installation sur l'écran d'accueil, proposée une seule fois. */
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    if (store.get("hq.installAsked") === "1") return;
    setTimeout(() => {
      toast("Installer le quiz sur votre écran d'accueil ?", "Installer", async () => {
        store.set("hq.installAsked", "1");
        e.prompt();
        try { await e.userChoice; } catch { /* refusé */ }
      });
    }, 4000);
  });
  el.toastNo.addEventListener("click", () => store.set("hq.installAsked", "1"));

  /* ==================================================================
     14. Initialisation
  ================================================================== */
  wall.build(el.wall, tapLetter);
  wall.build(el.wallResult, (L, cell) => pushInitial(L, cell));
  wall.build(el.wallQuiz, (L, cell) => pushSpell(L, cell));
  fx.spores();
  body.classList.remove("phase-0");
  body.classList.add("phase-1");

  el.udToggle.hidden = !udUnlocked;
  if (udUnlocked) setUD(udOn, true);
  purgeOldChallenges();
  renderSecrets();
  renderSeasons();
  renderDefi();
  renderStreak();
  setMode(urlSeed !== null ? "defi" : "enquete");

  setInterval(refreshDay, 60000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) refreshDay(); });

  (async () => {
    await sleep(700);
    await wall.spell(el.wall, "HAWKINS", { on: 330, gap: 90 });
    el.wallCaption.textContent = "Ne rentrez pas seul.";
    await sleep(600);
    await wall.spell(el.wall, "RUN", { on: 380, gap: 120 });
    if (!composing.length) el.wallCaption.textContent = "À vous de répondre.";
    wall.twinkle(el.wall);
  })();
})();
