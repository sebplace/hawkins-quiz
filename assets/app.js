/* ==================================================================
   Hawkins Quiz — moteur
   Vanilla JS, zéro dépendance. Tous les sons sont synthétisés.
================================================================== */
(() => {
  "use strict";

  /* ---------------- Config ---------------- */
  const PER_LEVEL = 4;                 // questions tirées par niveau
  const TOTAL = PER_LEVEL * 3;
  const TIME = { 1: 25, 2: 20, 3: 15 };
  const TIME_UD = { 1: 15, 2: 12, 3: 10 };   // le Monde à l'Envers ne patiente pas
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
  const BULB_COLORS = ["#ff2f45", "#ffc13b", "#3ddc84", "#3aa8ff", "#b14cff", "#ff7a2f"];
  const STORE = { ud: "hq.ud", udOn: "hq.udOn", secrets: "hq.secrets" };

  /* ---------------- Raccourcis ---------------- */
  const $ = (id) => document.getElementById(id);
  const body = document.body;
  const el = {
    wall: $("wall"), wallCaption: $("wallCaption"), wallResult: $("wallResult"),
    btnStart: $("btnStart"), btnSound: $("btnSound"), soundLabel: $("soundLabel"),
    btnNext: $("btnNext"), btnReplay: $("btnReplay"), btnShare: $("btnShare"),
    udToggle: $("udToggle"), udLabel: $("udLabel"), secrets: $("secrets"),
    brandTitle: $("brandTitle"), scoreBtn: $("scoreBtn"), scoreIcon: $("scoreIcon"),
    phaseName: $("phaseName"), progress: $("progress"), score: $("score"),
    timerBar: $("timerBar"), timerVal: $("timerVal"), timer: document.querySelector(".timer"),
    qLevel: $("qLevel"), qText: $("qText"), choices: $("choices"), reveal: $("reveal"),
    streak: $("streak"), stats: $("stats"), marks: $("marks"), badge: $("badge"),
    rankName: $("rankName"), rankLine: $("rankLine"), spores: $("spores")
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
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* navigation privée */ } }
  };

  /* ==================================================================
     1. Mur d'alphabet — décor ET clavier secret
  ================================================================== */
  const ROWS = [
    { letters: "ABCDEFGH".split(""), reverse: false },
    { letters: "IJKLMNOPQ".split(""), reverse: true },
    { letters: "RSTUVWXYZ".split(""), reverse: false }
  ];

  function buildWall(node, interactive) {
    if (!node) return;
    node.innerHTML = "";
    if (!interactive) node.classList.add("wall--static");
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
        if (interactive) cell.addEventListener("click", () => tapLetter(L, cell));
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
    node.querySelectorAll(".wall__cell.on").forEach((c) => c.classList.remove("on"));
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
        const cell = node.querySelector(`.wall__cell[data-letter="${ch}"]`);
        if (cell) cell.classList.add("on");
      }
    }
  }

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
     2. Sons synthétisés (Web Audio) — rien de copyrighté, que des sinus
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

    return {
      toggle() { on = !on; if (on) { ac().resume?.(); tone(660, .12); } return on; },
      get enabled() { return on; },
      bulb() { tone(880 + Math.random() * 260, .07, "sine", .05); },
      click() { tone(420, .05, "square", .05); },
      correct() { [523, 659, 784, 1047].forEach((f, i) => tone(f, .22, "triangle", .12, i * .07)); },
      wrong() { tone(180, .5, "sawtooth", .1); tone(120, .55, "sawtooth", .1, .04); },
      tick() { tone(1200, .04, "square", .04); },
      gate() { [330, 262, 196, 147, 110].forEach((f, i) => tone(f, .8, "sine", .1, i * .13)); },
      win() { [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, .5, "triangle", .12, i * .12)); },
      unlock() { [196, 294, 392, 523, 784].forEach((f, i) => tone(f, .9, "sine", .11, i * .1)); },
      chime(i = 0) {
        tone(110, 2.2, "sine", .16, i * .95);
        tone(220.5, 1.8, "sine", .08, i * .95);
        tone(330, 1.2, "triangle", .05, i * .95);
      }
    };
  })();

  /* ==================================================================
     3. Ambiance : spores et effets ponctuels
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

  /* ==================================================================
     4. Secrets du mur
  ================================================================== */
  let udUnlocked = store.get(STORE.ud) === "1";
  let udOn = udUnlocked && store.get(STORE.udOn) === "1";
  const found = new Set((store.get(STORE.secrets) || "").split(",").filter(Boolean));

  const SECRETS = [
    {
      id: "eggo", word: "EGGO", say: "Le congélateur est ouvert.",
      run() { rain("🧇", 30); sfx.win(); }
    },
    {
      id: "vecna", word: "VECNA", say: "Quatre coups. Courez.",
      run() {
        for (let i = 0; i < 4; i++) {
          sfx.chime(i);
          setTimeout(() => flip(160), i * 950);
        }
        buzz([40, 900, 40, 900, 40, 900, 40]);
      }
    },
    {
      id: "eleven", word: "ELEVEN", say: "Elle vous a entendu.",
      run() { nosebleed(); setTimeout(nosebleed, 500); sfx.gate(); buzz([20, 60, 20]); }
    },
    {
      id: "barb", word: "BARB", say: "Quelqu'un s'en souvient, enfin.",
      run() { rain("🕯️", 14); sfx.chime(0); }
    },
    {
      id: "run", word: "RUN", say: "Un peu tard pour ça, non ?",
      run() { flip(1200); sfx.wrong(); }
    },
    {
      id: "envers", word: "ENVERS", say: "La faille est ouverte.",
      run() { unlockUD(); }
    }
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
     5. Moteur de quiz
  ================================================================== */
  const state = {
    deck: [], i: 0, score: 0, streak: 0, best: 0,
    timeouts: 0, times: [], marks: [], locked: true, ud: false,
    phase: 0, raf: 0, deadline: 0, duration: 0, lastTick: -1
  };

  function buildDeck() {
    const deck = [];
    [1, 2, 3].forEach((lvl) => {
      shuffle(QUESTIONS.filter((q) => q.level === lvl)).slice(0, PER_LEVEL).forEach((q) => {
        deck.push({ ...q, correct: q.choices[0], shuffled: shuffle(q.choices) });
      });
    });
    return deck;
  }

  function setPhase(p) {
    if (state.phase === p) return;
    state.phase = p;
    body.classList.remove("phase-0", "phase-1", "phase-2", "phase-3");
    body.classList.add(`phase-${p}`);
    el.phaseName.textContent = (state.ud ? PHASES_UD : PHASES)[p].name;
    if (p > 1) {
      sfx.gate();
      buzz([18, 70, 18]);
      flash(state.ud
        ? (p === 2 ? "Vous descendez encore" : "Il vous a senti")
        : (p === 2 ? "Accès au laboratoire" : "Vous glissez dans le Monde à l'Envers"));
    }
  }

  function startTimer(seconds) {
    cancelAnimationFrame(state.raf);
    state.duration = seconds * 1000;
    state.deadline = performance.now() + state.duration;
    state.lastTick = -1;
    el.timer.classList.remove("is-panic");

    const loop = (now) => {
      const left = Math.max(0, state.deadline - now);
      el.timerBar.style.transform = `scaleX(${left / state.duration})`;
      const s = Math.ceil(left / 1000);
      if (s !== state.lastTick) {
        state.lastTick = s;
        el.timerVal.textContent = s;
        if (s <= 5 && s > 0) { sfx.tick(); el.timer.classList.add("is-panic"); }
      }
      if (left <= 0) { answer(null); return; }
      state.raf = requestAnimationFrame(loop);
    };
    state.raf = requestAnimationFrame(loop);
  }

  function render() {
    const q = state.deck[state.i];
    setPhase(q.level);

    el.progress.textContent = `Question ${state.i + 1} / ${TOTAL}`;
    el.qLevel.textContent = (state.ud ? PHASES_UD : PHASES)[q.level].sub;
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

    q.shuffled.forEach((choice, idx) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "choice";
      b.innerHTML = `<span class="choice__key">${idx + 1}</span><span>${choice}</span>`;
      b.addEventListener("click", () => answer(choice));
      el.choices.appendChild(b);
    });

    /* L'horloge de Vecna sonne à mi-parcours dans le Monde à l'Envers. */
    if (state.ud && state.i === TOTAL / 2) {
      sfx.chime(0); sfx.chime(1);
      flash("L'horloge sonne");
    }

    state.locked = false;
    startTimer((state.ud ? TIME_UD : TIME)[q.level]);
  }

  function answer(choice) {
    if (state.locked) return;
    state.locked = true;
    cancelAnimationFrame(state.raf);
    el.timer.classList.remove("is-panic");

    const q = state.deck[state.i];
    const elapsed = (state.duration - Math.max(0, state.deadline - performance.now())) / 1000;
    state.times.push(Math.min(elapsed, state.duration / 1000));
    const ok = choice === q.correct;

    [...el.choices.children].forEach((b) => {
      const txt = b.lastElementChild.textContent;
      b.disabled = true;
      if (txt === q.correct) b.classList.add("is-correct");
      else if (txt === choice) b.classList.add("is-wrong");
      else b.classList.add("is-faded");
    });

    if (ok) {
      state.score++;
      state.streak++;
      state.best = Math.max(state.best, state.streak);
      state.marks.push(state.ud ? "🩸" : "🧇");
      el.score.textContent = state.score;
      sfx.correct();
      buzz(14);
      if (state.streak === 3) { nosebleed(); flash("Série de 3 — saignement de nez"); }
      else if (state.streak >= 5) { nosebleed(); flash(`Série de ${state.streak} — Eleven approuve`); }
    } else {
      state.streak = 0;
      if (choice === null) { state.timeouts++; state.marks.push("⏳"); }
      else state.marks.push("💀");
      sfx.wrong();
      buzz([30, 60, 30]);
    }

    const head = choice === null
      ? "<b>Trop tard.</b> Le Démogorgon n'attend pas. "
      : ok ? "<b>Exact.</b> " : `<b>Raté.</b> C'était «&nbsp;${q.correct}&nbsp;». `;
    el.reveal.innerHTML = head + q.fact;
    el.reveal.classList.add("is-on");

    el.btnNext.hidden = false;
    el.btnNext.textContent = state.i === TOTAL - 1 ? "Voir le verdict" : "Suivant";
    el.btnNext.focus({ preventScroll: true });
  }

  function next() {
    sfx.click();
    state.i++;
    if (state.i >= TOTAL) finish();
    else render();
  }

  /* ==================================================================
     6. Résultat
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

  let lastRank = null, lastUD = false;

  async function finish() {
    const rank = state.score === 0
      ? ZERO_RANK
      : RANKS.find((r) => state.score >= r.min && state.score <= r.max) || RANKS[0];
    lastRank = rank;
    lastUD = state.ud;

    el.rankName.textContent = rank.name;
    el.rankLine.textContent = rank.line;

    el.badge.hidden = !state.ud;
    el.badge.textContent = state.score >= 7
      ? "Revenu du Monde à l'Envers"
      : "Resté dans le Monde à l'Envers";

    const avg = state.times.length
      ? (state.times.reduce((a, b) => a + b, 0) / state.times.length).toFixed(1)
      : "0";

    el.marks.innerHTML = state.marks
      .map((m, i) => (i && i % PER_LEVEL === 0 ? '<span class="sep">│</span>' : "") + m)
      .join("");

    el.stats.innerHTML = `
      <div class="stat"><b>${state.score}/${TOTAL}</b><span>${state.ud ? "Gouttes" : "Gaufres"}</span></div>
      <div class="stat"><b>${state.best}</b><span>Meilleure série</span></div>
      <div class="stat"><b>${avg}s</b><span>Temps moyen</span></div>
      <div class="stat"><b>${state.timeouts}</b><span>Dévoré·e par le chrono</span></div>`;

    show("result");
    if (state.score >= 9) sfx.win();
    await sleep(400);
    spell(el.wallResult, rank.wall, { keep: true, on: 420, gap: 110 });
  }

  function shareText() {
    const grid = state.marks.reduce((acc, m, i) => {
      acc += m;
      if ((i + 1) % PER_LEVEL === 0 && i < state.marks.length - 1) acc += " │ ";
      return acc;
    }, "");
    return [
      `Hawkins Quiz — ${state.score}/${TOTAL} ${lastUD ? "🙃" : "🧇"}`,
      `Rang : ${lastRank ? lastRank.name : "—"}${lastUD ? "  ·  Mode Monde à l'Envers" : ""}`,
      "",
      grid,
      "",
      "Survivrez-vous au Monde à l'Envers ?",
      "https://sebplace.github.io/hawkins-quiz/"
    ].join("\n");
  }

  /* ==================================================================
     7. Démarrage / rejouer
  ================================================================== */
  function startGame() {
    Object.assign(state, {
      deck: buildDeck(), i: 0, score: 0, streak: 0, best: 0,
      timeouts: 0, times: [], marks: [], locked: true, phase: 0, ud: udOn
    });
    el.score.textContent = "0";
    el.scoreIcon.textContent = udOn ? "🩸" : "🧇";
    twinkleOn = false;
    wallToken++;
    show("quiz");
    render();
  }

  /* ==================================================================
     8. Easter eggs hors mur
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
     9. Câblage
  ================================================================== */
  el.btnStart.addEventListener("click", () => { sfx.click(); buzz(12); startGame(); });
  el.btnNext.addEventListener("click", next);
  el.btnReplay.addEventListener("click", () => { sfx.click(); buzz(12); startGame(); });
  el.udToggle.addEventListener("click", () => { sfx.click(); setUD(!udOn); });

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
     10. Initialisation
  ================================================================== */
  buildWall(el.wall, true);
  buildWall(el.wallResult, false);
  buildSpores();
  body.classList.remove("phase-0");
  body.classList.add("phase-1");

  el.udToggle.hidden = !udUnlocked;
  if (udUnlocked) setUD(udOn, true);
  renderSecrets();

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
