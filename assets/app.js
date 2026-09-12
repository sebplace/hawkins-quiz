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
    board: (mode) => `hq.board.${mode}`
  };

  /* ==================================================================
     1. Raccourcis et utilitaires
  ================================================================== */
  const $ = (id) => document.getElementById(id);
  const body = document.body;
  const el = {
    wall: $("wall"), wallCaption: $("wallCaption"), wallResult: $("wallResult"),
    btnStart: $("btnStart"), startLabel: $("startLabel"),
    btnSound: $("btnSound"), soundLabel: $("soundLabel"),
    btnNext: $("btnNext"), btnReplay: $("btnReplay"), btnShare: $("btnShare"),
    udToggle: $("udToggle"), udLabel: $("udLabel"), secrets: $("secrets"),
    modeEnquete: $("modeEnquete"), modeSurvie: $("modeSurvie"), record: $("record"),
    seasons: [...document.querySelectorAll(".season")],
    brandTitle: $("brandTitle"), scoreBtn: $("scoreBtn"), scoreIcon: $("scoreIcon"),
    phaseName: $("phaseName"), progress: $("progress"), score: $("score"),
    hunt: $("hunt"), huntFill: $("huntFill"), demo: $("demo"), timerVal: $("timerVal"),
    strike: $("strike"),
    qLevel: $("qLevel"), qText: $("qText"), choices: $("choices"), reveal: $("reveal"),
    spell: $("spell"), spellSlots: $("spellSlots"), wallQuiz: $("wallQuiz"), spellBack: $("spellBack"),
    streak: $("streak"), stats: $("stats"), marks: $("marks"), badge: $("badge"),
    rankName: $("rankName"), rankLine: $("rankLine"), spores: $("spores"),
    initials: $("initials"), iniSlots: $("iniSlots"), iniBack: $("iniBack"), iniOk: $("iniOk"),
    board: $("board")
  };
  const screens = { intro: $("screen-intro"), quiz: $("screen-quiz"), result: $("screen-result") };

  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Haptique réservée aux appareils tactiles : sur desktop, Chrome bloque et
     journalise vibrate(), et il n'y a de toute façon rien à faire vibrer. */
  const canBuzz = "vibrate" in navigator && navigator.maxTouchPoints > 0;
  const buzz = (p) => {
    if (!canBuzz) return;
    if (navigator.userActivation && !navigator.userActivation.hasBeenActive) return;
    try { navigator.vibrate(p); } catch { /* ignoré */ }
  };

  const store = {
    get(k, fallback = null) { try { return localStorage.getItem(k) ?? fallback; } catch { return fallback; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* navigation privée */ } },
    json(k, fallback) { try { return JSON.parse(store.get(k)) ?? fallback; } catch { return fallback; } }
  };

  /* ==================================================================
     2. Mur d'alphabet — décor, clavier secret et borne d'arcade
  ================================================================== */
  const ROWS = [
    { letters: "ABCDEFGH".split(""), reverse: false },
    { letters: "IJKLMNOPQ".split(""), reverse: true },
    { letters: "RSTUVWXYZ".split(""), reverse: false }
  ];

  function buildWall(node, onLetter) {
    if (!node) return;
    node.innerHTML = "";
    if (!onLetter) node.classList.add("wall--static");
    let i = 0;
    ROWS.forEach((row) => {
      const r = document.createElement("div");
      r.className = "wall__row";
      const letters = row.reverse ? row.letters.slice().reverse() : row.letters;
      letters.forEach((L) => {
        const cell = document.createElement("button");
        cell.type = "button";
        cell.className = "wall__cell";
        cell.dataset.letter = L;
        cell.tabIndex = -1;                 // le mur est aria-hidden : on le garde hors du focus
        cell.style.setProperty("--c", BULB_COLORS[i++ % BULB_COLORS.length]);
        cell.innerHTML = `<div class="wall__bulb"></div><div class="wall__letter">${L}</div>`;
        if (onLetter) cell.addEventListener("click", () => onLetter(L, cell));
        r.appendChild(cell);
      });
      node.appendChild(r);
    });
  }

  let wallToken = 0;
  async function spell(node, word, opts = {}) {
    if (!node) return;
    const token = ++wallToken;
    const on = opts.on ?? 460;
    const gap = opts.gap ?? 130;
    clearWall(node);
    for (const ch of word.toUpperCase()) {
      if (token !== wallToken) return;
      const cell = node.querySelector(`.wall__cell[data-letter="${ch}"]`);
      if (!cell) { await sleep(gap * 2); continue; }
      cell.classList.add("on");
      sfx.bulb();
      await sleep(on);
      if (token !== wallToken) return;
      if (!opts.keep) cell.classList.remove("on");
      await sleep(gap);
    }
    if (opts.keep && token === wallToken) {
      for (const ch of word.toUpperCase()) {
        node.querySelector(`.wall__cell[data-letter="${ch}"]`)?.classList.add("on");
      }
    }
  }

  const clearWall = (node) =>
    node?.querySelectorAll(".wall__cell.on").forEach((c) => c.classList.remove("on"));

  /* Scintillement d'ambiance tant que personne ne parle au mur */
  let twinkleOn = false;
  function idleTwinkle(node) {
    if (!node || reduced) return;
    setInterval(() => {
      if (!twinkleOn || wallToken !== idleTwinkle.token) return;
      const cells = node.querySelectorAll(".wall__cell");
      const c = cells[Math.floor(Math.random() * cells.length)];
      if (!c || c.classList.contains("on")) return;
      c.classList.add("on");
      setTimeout(() => c.classList.remove("on"), 180);
    }, 900);
  }

  /* ==================================================================
     3. Sons synthétisés (Web Audio) — rien de copyrighté, que des sinus
  ================================================================== */
  const sfx = (() => {
    let ctx = null, on = false;
    const ac = () => (ctx ||= new (window.AudioContext || window.webkitAudioContext)());

    function tone(freq, dur, type = "triangle", vol = .14, delay = 0) {
      if (!on) return;
      const c = ac();
      const t = c.currentTime + delay;
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol, t + .012);
      g.gain.exponentialRampToValueAtTime(.0001, t + dur);
      osc.connect(g).connect(c.destination);
      osc.start(t); osc.stop(t + dur + .02);
    }

    function sweep(from, to, dur, type = "sawtooth", vol = .12) {
      if (!on) return;
      const c = ac();
      const t = c.currentTime;
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(from, t);
      osc.frequency.exponentialRampToValueAtTime(to, t + dur);
      g.gain.setValueAtTime(vol, t);
      g.gain.exponentialRampToValueAtTime(.0001, t + dur);
      osc.connect(g).connect(c.destination);
      osc.start(t); osc.stop(t + dur + .02);
    }

    return {
      toggle() { on = !on; if (on) { ac().resume?.(); tone(660, .12); } return on; },
      bulb() { tone(880 + Math.random() * 260, .07, "sine", .05); },
      click() { tone(420, .05, "square", .05); },
      correct() { [523, 659, 784, 1047].forEach((f, i) => tone(f, .22, "triangle", .12, i * .07)); },
      wrong() { tone(180, .5, "sawtooth", .1); tone(120, .55, "sawtooth", .1, .04); },
      tick() { tone(1200, .04, "square", .04); },
      gate() { [330, 262, 196, 147, 110].forEach((f, i) => tone(f, .8, "sine", .1, i * .13)); },
      win() { [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, .5, "triangle", .12, i * .12)); },
      unlock() { [196, 294, 392, 523, 784].forEach((f, i) => tone(f, .9, "sine", .11, i * .1)); },
      pounce() { sweep(420, 48, .55); tone(70, .7, "square", .13); },
      carve() { [392, 523, 659].forEach((f, i) => tone(f, .3, "square", .1, i * .09)); },
      chime(i = 0) {
        tone(110, 2.2, "sine", .16, i * .95);
        tone(220.5, 1.8, "sine", .08, i * .95);
        tone(330, 1.2, "triangle", .05, i * .95);
      }
    };
  })();

  /* ==================================================================
     4. Ambiance : spores et effets ponctuels
  ================================================================== */
  function buildSpores(n = 26) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < n; i++) {
      const s = document.createElement("div");
      s.className = "spore";
      const size = 2 + Math.random() * 5;
      s.style.width = s.style.height = `${size}px`;
      s.style.left = `${Math.random() * 100}%`;
      s.style.animationDuration = `${9 + Math.random() * 14}s`;
      s.style.animationDelay = `${-Math.random() * 20}s`;
      frag.appendChild(s);
    }
    el.spores.appendChild(frag);
  }

  function nosebleed() {
    if (reduced) return;
    for (let i = 0; i < 3; i++) {
      const d = document.createElement("div");
      d.className = "drop";
      d.style.left = `${20 + Math.random() * 60}%`;
      d.style.animationDelay = `${i * .18}s`;
      document.body.appendChild(d);
      setTimeout(() => d.remove(), 2200);
    }
  }

  function rain(glyph, n = 26) {
    for (let i = 0; i < n; i++) {
      const w = document.createElement("div");
      w.textContent = glyph;
      w.style.cssText = `position:fixed;z-index:7;pointer-events:none;top:-40px;font-size:${
        16 + Math.random() * 22}px;left:${Math.random() * 100}%;animation:fall ${
        2 + Math.random() * 2.5}s linear ${Math.random()}s forwards`;
      document.body.appendChild(w);
      setTimeout(() => w.remove(), 6500);
    }
  }

  let flashTimer;
  function flash(msg) {
    el.streak.textContent = msg;
    el.streak.classList.remove("is-on");
    void el.streak.offsetWidth;
    el.streak.classList.add("is-on");
    clearTimeout(flashTimer);
    flashTimer = setTimeout(() => el.streak.classList.remove("is-on"), 2000);
  }

  function flip(ms = 2800) {
    body.classList.add("flipped");
    setTimeout(() => body.classList.remove("flipped"), ms);
  }

  function strike() {
    if (reduced) return;
    el.strike.classList.remove("is-on");
    void el.strike.offsetWidth;
    el.strike.classList.add("is-on");
  }

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
    twinkleOn = false;
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
    twinkleOn = true;
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
      spell(el.wall, hit.word, { on: 200, gap: 60 }).then(() => {
        twinkleOn = true;
        idleTwinkle.token = wallToken;
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

  function qualifies(score, mode, ud) {
    if (score <= 0) return false;
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

  function renderBoard(mode, ud, highlight = -1) {
    const b = getBoard(mode, ud);
    if (!b.length) { el.board.hidden = true; return; }
    el.board.hidden = false;
    const unit = mode === "survie" ? "" : ` / ${TOTAL}`;
    el.board.innerHTML =
      `<p class="board__title">Tableau d'honneur — ${mode === "survie" ? "Survie" : "Enquête"}${ud ? " · Monde à l'Envers" : ""}</p>` +
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
    const unit = mode === "survie" ? " questions" : ` / ${TOTAL}`;
    el.record.innerHTML = `Record ${mode === "survie" ? "Survie" : "Enquête"} : <b>${top.s}${unit}</b> par ${top.i}`;
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
    clearWall(el.wallResult);
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
    const rank = pushScore(ini.join(""), state.score, state.mode, state.ud);
    iniActive = false;
    el.initials.hidden = true;
    sfx.carve();
    buzz([14, 50, 14]);
    renderBoard(state.mode, state.ud, rank);
    renderRecord();
    spell(el.wallResult, lastRank.wall, { keep: true, on: 240, gap: 70 });
  }

  /* ==================================================================
     7. Moteur de quiz
  ================================================================== */
  let mode = "enquete";

  const state = {
    mode: "enquete", deck: [], i: 0, score: 0, streak: 0, best: 0,
    timeouts: 0, times: [], marks: [], locked: true, ud: false, over: false,
    phase: 0, raf: 0, deadline: 0, duration: 0, lastTick: -1, close: false
  };

  function setMode(m) {
    mode = m;
    body.classList.toggle("mode-survie", m === "survie");
    el.modeEnquete.classList.toggle("is-on", m === "enquete");
    el.modeSurvie.classList.toggle("is-on", m === "survie");
    el.modeEnquete.setAttribute("aria-pressed", String(m === "enquete"));
    el.modeSurvie.setAttribute("aria-pressed", String(m === "survie"));
    el.startLabel.textContent = m === "survie" ? "Lancer la chasse" : "Entrer dans le sous-sol";
    renderRecord();
  }

  const prep = (q) => q.type === "spell"
    ? { ...q, correct: q.answer }
    : { ...q, correct: q.choices[0], shuffled: shuffle(q.choices) };

  /* --- Saisons retenues pour le tirage --- */
  let seasons = new Set(store.json(STORE.seasons, [1, 2, 3, 4]));

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
    if (mode === "survie") {
      return shuffle(poolFor(null)).map(prep);
    }
    const deck = [];
    [1, 2, 3].forEach((lvl) => drawFresh(poolFor(lvl), PER_LEVEL).forEach((q) => deck.push(prep(q))));
    saveSeen();
    return deck;
  }

  /* En Survie, on recycle le paquet indéfiniment. */
  function currentQuestion() {
    if (state.i < state.deck.length) return state.deck[state.i];
    state.deck = state.deck.concat(shuffle(poolFor(null)).map(prep));
    return state.deck[state.i];
  }

  const phaseFor = (q, i) =>
    state.mode === "survie" ? Math.min(3, Math.floor(i / 5) + 1) : q.level;

  function phaseLabels() {
    if (state.mode === "survie") return PHASES_SURV;
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
    const bonus = q && q.type === "spell" ? 8 : 0;   // épeler prend plus de temps que cliquer
    if (state.mode === "survie") {
      const s = state.ud ? SURV_UD : SURV;
      return Math.max(s.floor, s.start - i * s.step) + bonus;
    }
    return (state.ud ? TIME_UD : TIME)[q.level] + bonus;
  }

  function startTimer(seconds) {
    cancelAnimationFrame(state.raf);
    state.duration = seconds * 1000;
    state.deadline = performance.now() + state.duration;
    state.lastTick = -1;
    state.close = false;
    el.hunt.classList.remove("is-close", "is-caught");
    el.demo.style.setProperty("--p", "0");

    const loop = (now) => {
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

  function render() {
    const q = currentQuestion();
    setPhase(phaseFor(q, state.i));

    el.progress.textContent = state.mode === "survie"
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

    const isSpell = q.type === "spell";
    el.choices.hidden = isSpell;
    el.spell.hidden = !isSpell;
    spellActive = isSpell;
    spelled = [];

    if (isSpell) {
      spellLen = q.correct.length;
      clearWall(el.wallQuiz);
      renderSpellSlots();
    } else {
      q.shuffled.forEach((choice, idx) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "choice";
        b.innerHTML = `<span class="choice__key">${idx + 1}</span><span>${choice}</span>`;
        b.addEventListener("click", () => answer(choice));
        el.choices.appendChild(b);
      });
    }

    /* L'horloge de Vecna sonne à mi-parcours dans le Monde à l'Envers. */
    if (state.ud && state.mode === "enquete" && state.i === TOTAL / 2) {
      sfx.chime(0); sfx.chime(1);
      flash("L'horloge sonne");
    }

    state.locked = false;
    startTimer(durationFor(q, state.i));
  }

  function answer(choice) {
    if (state.locked) return;
    state.locked = true;
    spellActive = false;
    cancelAnimationFrame(state.raf);

    const q = currentQuestion();
    const elapsed = (state.duration - Math.max(0, state.deadline - performance.now())) / 1000;
    state.times.push(Math.min(elapsed, state.duration / 1000));
    const ok = choice === q.correct;

    if (q.type === "spell") {
      renderSpellSlots(true);
      spell(el.wallQuiz, q.correct, { keep: true, on: 130, gap: 45 });
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
    }

    const head = choice === null
      ? "<b>Trop tard.</b> Le Démogorgon n'attend pas. "
      : ok ? "<b>Exact.</b> " : `<b>Raté.</b> C'était «&nbsp;${q.correct}&nbsp;». `;    el.reveal.innerHTML = head + q.fact;
    el.reveal.classList.add("is-on");

    const last = state.over || (state.mode === "enquete" && state.i === TOTAL - 1);
    el.btnNext.hidden = false;
    el.btnNext.textContent = last ? "Voir le verdict" : "Suivant";
    el.btnNext.focus({ preventScroll: true });
  }

  function next() {
    sfx.click();
    if (state.over) return finish();
    state.i++;
    if (state.mode === "enquete" && state.i >= TOTAL) return finish();
    render();
  }

  /* ==================================================================
     8. Résultat
  ================================================================== */
  function show(name) {
    Object.values(screens).forEach((s) => s.classList.remove("is-active"));
    screens[name].classList.add("is-active");
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }

  const ZERO_RANK = {
    name: "Le Démogorgon",
    wall: "ZERO",
    line: "Zéro sur douze. Statistiquement, il faut le faire exprès. La conclusion s'impose : le monstre, c'est vous."
  };

  const pickRank = () => {
    const table = state.mode === "survie" ? SURVIVAL_RANKS : RANKS;
    if (state.mode === "enquete" && state.score === 0) return ZERO_RANK;
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
      : `<div class="stat"><b>${state.score}/${TOTAL}</b><span>${unit}</span></div>
         <div class="stat"><b>${state.best}</b><span>Meilleure série</span></div>
         <div class="stat"><b>${avg}s</b><span>Temps moyen</span></div>
         <div class="stat"><b>${state.timeouts}</b><span>Dévoré·e par le chrono</span></div>`;

    show("result");
    if (state.score >= (state.mode === "survie" ? 10 : 9)) sfx.win();

    const qualified = qualifies(state.score, state.mode, state.ud);
    renderBoard(state.mode, state.ud, -1);

    await sleep(400);
    await spell(el.wallResult, rank.wall, { keep: true, on: 420, gap: 110 });

    if (qualified) { await sleep(500); openInitials(); }
  }

  function shareText() {
    const grid = state.marks.slice(-24).reduce((acc, m, i) => {
      acc += m;
      if ((i + 1) % PER_LEVEL === 0 && i < Math.min(state.marks.length, 24) - 1) acc += " │ ";
      return acc;
    }, "");
    const head = lastMode === "survie"
      ? `Hawkins Quiz — Survie : ${state.score} questions tenues ${lastUD ? "🙃" : "🧇"}`
      : `Hawkins Quiz — ${state.score}/${TOTAL} ${lastUD ? "🙃" : "🧇"}`;
    return [
      head,
      `Rang : ${lastRank ? lastRank.name : "—"}${lastUD ? "  ·  Mode Monde à l'Envers" : ""}`,
      "",
      grid,
      "",
      "Survivrez-vous au Monde à l'Envers ?",
      "https://sebplace.github.io/hawkins-quiz/"
    ].join("\n");
  }

  /* ==================================================================
     9. Démarrage / rejouer
  ================================================================== */
  function startGame() {
    iniActive = false;
    el.initials.hidden = true;
    el.board.hidden = true;
    Object.assign(state, {
      mode, deck: buildDeck(), i: 0, score: 0, streak: 0, best: 0,
      timeouts: 0, times: [], marks: [], locked: true, phase: 0, ud: udOn, over: false
    });
    el.score.textContent = "0";
    el.scoreIcon.textContent = udOn ? "🩸" : "🧇";
    twinkleOn = false;
    wallToken++;
    show("quiz");
    render();
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
  el.iniBack.addEventListener("click", popInitial);
  el.iniOk.addEventListener("click", commitInitials);
  el.spellBack.addEventListener("click", popSpell);
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
     12. Initialisation
  ================================================================== */
  buildWall(el.wall, tapLetter);
  buildWall(el.wallResult, (L, cell) => pushInitial(L, cell));
  buildWall(el.wallQuiz, (L, cell) => pushSpell(L, cell));
  buildSpores();
  body.classList.remove("phase-0");
  body.classList.add("phase-1");

  el.udToggle.hidden = !udUnlocked;
  if (udUnlocked) setUD(udOn, true);
  renderSecrets();
  renderSeasons();
  setMode("enquete");

  (async () => {
    await sleep(700);
    await spell(el.wall, "HAWKINS", { on: 330, gap: 90 });
    el.wallCaption.textContent = "Ne rentrez pas seul.";
    await sleep(600);
    await spell(el.wall, "RUN", { on: 380, gap: 120 });
    if (!composing.length) el.wallCaption.textContent = "À vous de répondre.";
    twinkleOn = true;
    idleTwinkle.token = wallToken;
    idleTwinkle(el.wall);
  })();
})();
