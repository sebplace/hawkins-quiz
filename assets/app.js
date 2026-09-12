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
  const PHASES = {
    1: { name: "Hawkins, 1983", sub: "Niveau 1 — Sous-sol des Wheeler" },
    2: { name: "Hawkins National Lab", sub: "Niveau 2 — Accès restreint" },
    3: { name: "Le Monde à l'Envers", sub: "Niveau 3 — Ne respirez pas" }
  };
  const BULB_COLORS = ["#ff2f45", "#ffc13b", "#3ddc84", "#3aa8ff", "#b14cff", "#ff7a2f"];

  /* ---------------- Raccourcis ---------------- */
  const $ = (id) => document.getElementById(id);
  const body = document.body;
  const el = {
    wall: $("wall"), wallCaption: $("wallCaption"), wallResult: $("wallResult"),
    btnStart: $("btnStart"), btnSound: $("btnSound"), soundLabel: $("soundLabel"),
    btnNext: $("btnNext"), btnReplay: $("btnReplay"), btnShare: $("btnShare"),
    phaseName: $("phaseName"), progress: $("progress"), score: $("score"),
    timerBar: $("timerBar"), timerVal: $("timerVal"), timer: document.querySelector(".timer"),
    qLevel: $("qLevel"), qText: $("qText"), choices: $("choices"), reveal: $("reveal"),
    streak: $("streak"), stats: $("stats"), marks: $("marks"),
    rankName: $("rankName"), rankLine: $("rankLine"), spores: $("spores")
  };
  const screens = {
    intro: $("screen-intro"), quiz: $("screen-quiz"), result: $("screen-result")
  };

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

  /* ==================================================================
     1. Mur d'alphabet
  ================================================================== */
  const ROWS = [
    { letters: "ABCDEFGH".split(""), reverse: false },
    { letters: "IJKLMNOPQ".split(""), reverse: true },
    { letters: "RSTUVWXYZ".split(""), reverse: false }
  ];

  function buildWall(node) {
    if (!node) return;
    node.innerHTML = "";
    let i = 0;
    ROWS.forEach((row) => {
      const r = document.createElement("div");
      r.className = "wall__row";
      const letters = row.reverse ? row.letters.slice().reverse() : row.letters;
      letters.forEach((L) => {
        const cell = document.createElement("div");
        cell.className = "wall__cell";
        cell.dataset.letter = L;
        cell.style.setProperty("--c", BULB_COLORS[i++ % BULB_COLORS.length]);
        cell.innerHTML = `<div class="wall__bulb"></div><div class="wall__letter">${L}</div>`;
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

  /* Scintillement d'ambiance quand rien n'est épelé */
  function idleTwinkle(node) {
    if (!node || reduced) return;
    setInterval(() => {
      if (wallToken !== idleTwinkle.token) return;
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
      toggle() {
        on = !on;
        if (on) { ac().resume?.(); tone(660, .12); }
        return on;
      },
      get enabled() { return on; },
      bulb() { tone(880 + Math.random() * 260, .07, "sine", .05); },
      click() { tone(420, .05, "square", .05); },
      correct() { [523, 659, 784, 1047].forEach((f, i) => tone(f, .22, "triangle", .12, i * .07)); },
      wrong() { tone(180, .5, "sawtooth", .1); tone(120, .55, "sawtooth", .1, .04); },
      tick() { tone(1200, .04, "square", .04); },
      gate() { [330, 262, 196, 147, 110].forEach((f, i) => tone(f, .8, "sine", .1, i * .13)); },
      win() { [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, .5, "triangle", .12, i * .12)); }
    };
  })();

  /* ==================================================================
     3. Ambiance : spores + effets ponctuels
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

  let flashTimer;
  function flash(msg) {
    el.streak.textContent = msg;
    el.streak.classList.remove("is-on");
    void el.streak.offsetWidth;
    el.streak.classList.add("is-on");
    clearTimeout(flashTimer);
    flashTimer = setTimeout(() => el.streak.classList.remove("is-on"), 2000);
  }

  /* ==================================================================
     4. Moteur de quiz
  ================================================================== */
  const state = {
    deck: [], i: 0, score: 0, streak: 0, best: 0,
    timeouts: 0, times: [], marks: [], locked: true,
    phase: 0, raf: 0, deadline: 0, duration: 0, lastTick: -1
  };

  function buildDeck() {
    const deck = [];
    [1, 2, 3].forEach((lvl) => {
      const pool = shuffle(QUESTIONS.filter((q) => q.level === lvl)).slice(0, PER_LEVEL);
      pool.forEach((q) => {
        const correct = q.choices[0];
        deck.push({ ...q, correct, shuffled: shuffle(q.choices) });
      });
    });
    return deck;
  }

  function setPhase(p) {
    if (state.phase === p) return;
    state.phase = p;
    body.classList.remove("phase-0", "phase-1", "phase-2", "phase-3");
    body.classList.add(`phase-${p}`);
    el.phaseName.textContent = PHASES[p].name;
    if (p > 1) {
      sfx.gate();
      flash(p === 2 ? "Accès au laboratoire" : "Vous glissez dans le Monde à l'Envers");
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
      const ratio = left / state.duration;
      el.timerBar.style.transform = `scaleX(${ratio})`;
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
    el.qLevel.textContent = PHASES[q.level].sub;
    el.qText.textContent = q.q;
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

    state.locked = false;
    startTimer(TIME[q.level]);
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
      state.marks.push("🧇");
      el.score.textContent = state.score;
      sfx.correct();
      if (state.streak === 3) { nosebleed(); flash("Série de 3 — saignement de nez"); }
      else if (state.streak >= 5) { nosebleed(); flash(`Série de ${state.streak} — Eleven approuve`); }
    } else {
      state.streak = 0;
      if (choice === null) { state.timeouts++; state.marks.push("⏳"); }
      else state.marks.push("🩸");
      sfx.wrong();
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
     5. Résultat
  ================================================================== */
  function show(name) {
    Object.values(screens).forEach((s) => s.classList.remove("is-active"));
    screens[name].classList.add("is-active");
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }

  let lastRank = null;

  async function finish() {
    const rank = RANKS.find((r) => state.score >= r.min && state.score <= r.max) || RANKS[0];
    lastRank = rank;

    el.rankName.textContent = rank.name;
    el.rankLine.textContent = rank.line;

    const avg = state.times.length
      ? (state.times.reduce((a, b) => a + b, 0) / state.times.length).toFixed(1)
      : "0";

    el.marks.innerHTML = state.marks
      .map((m, i) => (i && i % PER_LEVEL === 0 ? '<span class="sep">│</span>' : "") + m)
      .join("");

    el.stats.innerHTML = `
      <div class="stat"><b>${state.score}/${TOTAL}</b><span>Gaufres</span></div>
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
      `Hawkins Quiz — ${state.score}/${TOTAL} 🧇`,
      `Rang : ${lastRank ? lastRank.name : "—"}`,
      "",
      grid,
      "",
      "Survivrez-vous au Monde à l'Envers ?",
      "https://sebplace.github.io/hawkins-quiz/"
    ].join("\n");
  }

  /* ==================================================================
     6. Démarrage / rejouer
  ================================================================== */
  function startGame() {
    Object.assign(state, {
      deck: buildDeck(), i: 0, score: 0, streak: 0, best: 0,
      timeouts: 0, times: [], marks: [], locked: true, phase: 0
    });
    el.score.textContent = "0";
    wallToken++;
    show("quiz");
    render();
  }

  /* ==================================================================
     7. Easter eggs
  ================================================================== */
  let buffer = "";
  const KONAMI = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba";
  let konami = "";

  function eggoRain() {
    flash("Mode Eggo illimité");
    for (let i = 0; i < 26; i++) {
      const w = document.createElement("div");
      w.textContent = "🧇";
      w.style.cssText = `position:fixed;z-index:7;pointer-events:none;top:-40px;font-size:${
        16 + Math.random() * 22}px;left:${Math.random() * 100}%;animation:fall ${
        2 + Math.random() * 2.5}s linear ${Math.random()}s forwards`;
      document.body.appendChild(w);
      setTimeout(() => w.remove(), 6000);
    }
  }

  document.addEventListener("keydown", (e) => {
    /* Réponses au clavier */
    if (screens.quiz.classList.contains("is-active")) {
      if (!state.locked && /^[1-4]$/.test(e.key)) {
        const b = el.choices.children[Number(e.key) - 1];
        if (b) b.click();
      } else if (state.locked && !el.btnNext.hidden && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault(); next();
      }
    }

    /* "011" → le monde bascule (hors quiz, pour ne pas gêner les réponses) */
    if (!screens.quiz.classList.contains("is-active")) {
      buffer = (buffer + e.key).slice(-3);
      if (buffer === "011") {
        body.classList.add("flipped");
        flash("Bonjour Mike.");
        sfx.gate();
        setTimeout(() => body.classList.remove("flipped"), 2800);
      }
    }

    /* Konami → pluie de gaufres */
    konami = (konami + e.key).slice(-KONAMI.length);
    if (konami === KONAMI) { eggoRain(); sfx.win(); }
  });

  /* ==================================================================
     8. Câblage
  ================================================================== */
  el.btnStart.addEventListener("click", () => { sfx.click(); startGame(); });
  el.btnNext.addEventListener("click", next);
  el.btnReplay.addEventListener("click", () => { sfx.click(); startGame(); });

  el.btnSound.addEventListener("click", () => {
    const on = sfx.toggle();
    el.soundLabel.textContent = on ? "Son : branché" : "Son : coupé";
    el.btnSound.setAttribute("aria-pressed", String(on));
  });

  el.btnShare.addEventListener("click", async () => {
    const txt = shareText();
    try {
      await navigator.clipboard.writeText(txt);
      el.btnShare.textContent = "Copié !";
    } catch {
      const ta = document.createElement("textarea");
      ta.value = txt; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); el.btnShare.textContent = "Copié !"; }
      catch { el.btnShare.textContent = "Copie impossible"; }
      ta.remove();
    }
    setTimeout(() => (el.btnShare.textContent = "Copier mon score"), 2000);
  });

  /* ==================================================================
     9. Initialisation
  ================================================================== */
  buildWall(el.wall);
  buildWall(el.wallResult);
  buildSpores();
  body.classList.remove("phase-0");
  body.classList.add("phase-1");

  (async () => {
    await sleep(700);
    await spell(el.wall, "HAWKINS", { on: 330, gap: 90 });
    el.wallCaption.textContent = "Ne rentrez pas seul.";
    await sleep(600);
    await spell(el.wall, "RUN", { on: 380, gap: 120 });
    idleTwinkle.token = wallToken;
    idleTwinkle(el.wall);
  })();
})();
