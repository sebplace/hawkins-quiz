/* ==================================================================
   Hawkins Quiz — socle commun
   Utilitaires, stockage, audio synthétisé, mur d'alphabet et effets.
   Chargé avant app.js et exposé sous window.HQ.
   Aucune dépendance, aucune étape de construction.
================================================================== */
(() => {
  "use strict";

  /* ==================================================================
     1. Utilitaires
  ================================================================== */
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  /* Tirage reproductible : même graine, même paquet, partout. */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const shuffleWith = (rng, arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const hashString = (str) => {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  };

  /* Haptique réservée aux appareils tactiles : sur desktop, Chrome bloque et
     journalise vibrate(), et il n'y a de toute façon rien à faire vibrer. */
  const canBuzz = "vibrate" in navigator && navigator.maxTouchPoints > 0;
  const buzz = (p) => {
    if (!canBuzz) return;
    if (navigator.userActivation && !navigator.userActivation.hasBeenActive) return;
    try { navigator.vibrate(p); } catch { /* ignoré */ }
  };

  const util = { sleep, reduced, shuffle, mulberry32, shuffleWith, hashString, buzz };

  /* ==================================================================
     2. Stockage tolérant à la navigation privée
  ================================================================== */
  const store = {
    get(k, fallback = null) { try { return localStorage.getItem(k) ?? fallback; } catch { return fallback; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* navigation privée */ } },
    del(k) { try { localStorage.removeItem(k); } catch { /* ignoré */ } },
    keys() { try { return Object.keys(localStorage); } catch { return []; } },
    json(k, fallback) { try { return JSON.parse(store.get(k)) ?? fallback; } catch { return fallback; } }
  };

  /* ==================================================================
     3. Sons synthétisés — rien de copyrighté, que des oscillateurs
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
     4. Mur d'alphabet — décor, clavier secret et borne d'arcade
  ================================================================== */
  const wall = (() => {
    const ROWS = [
      { letters: "ABCDEFGH".split(""), reverse: false },
      { letters: "IJKLMNOPQ".split(""), reverse: true },
      { letters: "RSTUVWXYZ".split(""), reverse: false }
    ];
    const COLORS = ["#ff2f45", "#ffc13b", "#3ddc84", "#3aa8ff", "#b14cff", "#ff7a2f"];

    let token = 0;              // invalide une épellation en cours
    let twinkleOn = false;
    let twinkleNode = null;
    let loopStarted = false;

    function build(node, onLetter) {
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
          cell.tabIndex = -1;           // le mur est aria-hidden : hors du parcours de focus
          cell.style.setProperty("--c", COLORS[i++ % COLORS.length]);
          cell.innerHTML = '<div class="wall__bulb"></div><div class="wall__letter">' + L + "</div>";
          if (onLetter) cell.addEventListener("click", () => onLetter(L, cell));
          r.appendChild(cell);
        });
        node.appendChild(r);
      });
    }

    const cellOf = (node, ch) => node.querySelector(`.wall__cell[data-letter="${ch}"]`);
    const clear = (node) => node?.querySelectorAll(".wall__cell.on").forEach((c) => c.classList.remove("on"));

    async function spell(node, word, opts = {}) {
      if (!node) return;
      const mine = ++token;
      const on = opts.on ?? 460;
      const gap = opts.gap ?? 130;
      clear(node);
      for (const ch of word.toUpperCase()) {
        if (mine !== token) return;
        const cell = cellOf(node, ch);
        if (!cell) { await sleep(gap * 2); continue; }
        cell.classList.add("on");
        sfx.bulb();
        await sleep(on);
        if (mine !== token) return;
        if (!opts.keep) cell.classList.remove("on");
        await sleep(gap);
      }
      if (opts.keep && mine === token) {
        for (const ch of word.toUpperCase()) cellOf(node, ch)?.classList.add("on");
      }
    }

    /* Scintillement d'ambiance tant que personne ne parle au mur. */
    function twinkle(node) {
      if (reduced) return;
      twinkleNode = node || twinkleNode;
      twinkleOn = true;
      if (loopStarted) return;
      loopStarted = true;
      setInterval(() => {
        if (!twinkleOn || !twinkleNode) return;
        const cells = twinkleNode.querySelectorAll(".wall__cell");
        const c = cells[Math.floor(Math.random() * cells.length)];
        if (!c || c.classList.contains("on")) return;
        c.classList.add("on");
        setTimeout(() => c.classList.remove("on"), 180);
      }, 900);
    }

    return {
      build, spell, clear, cellOf, twinkle,
      setTwinkle(on) { twinkleOn = on; },
      bump() { token++; }
    };
  })();

  /* ==================================================================
     5. Effets d'ambiance
  ================================================================== */
  const fx = (() => {
    const $ = (id) => document.getElementById(id);
    let flashTimer = null;

    function spores(n = 26) {
      const host = $("spores");
      if (!host) return;
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
      host.appendChild(frag);
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

    function flash(msg) {
      const node = $("streak");
      if (!node) return;
      node.textContent = (window.HQ && window.HQ.t) ? window.HQ.t(msg) : msg;
      node.classList.remove("is-on");
      void node.offsetWidth;
      node.classList.add("is-on");
      clearTimeout(flashTimer);
      flashTimer = setTimeout(() => node.classList.remove("is-on"), 2000);
    }

    function flip(ms = 2800) {
      document.body.classList.add("flipped");
      setTimeout(() => document.body.classList.remove("flipped"), ms);
    }

    function strike() {
      const node = $("strike");
      if (!node || reduced) return;
      node.classList.remove("is-on");
      void node.offsetWidth;
      node.classList.add("is-on");
    }

    /* Gerbe de particules pour un sans-faute : elles partent du centre. */
    function celebrate(glyph) {
      strike();
      if (reduced) return;
      for (let i = 0; i < 36; i++) {
        const p = document.createElement("div");
        p.textContent = glyph;
        const angle = (Math.PI * 2 * i) / 36 + Math.random() * .3;
        const dist = 150 + Math.random() * 340;
        p.style.cssText = `position:fixed;left:50%;top:46%;z-index:8;pointer-events:none;
          font-size:${14 + Math.random() * 20}px;
          --dx:${Math.cos(angle) * dist}px; --dy:${Math.sin(angle) * dist}px;
          animation:burst ${1.1 + Math.random() * .9}s cubic-bezier(.15,.7,.3,1) ${Math.random() * .25}s forwards`;
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 2600);
      }
    }

    /* L'écran ne doit pas s'éteindre pendant une partie chronométrée. */
    let lock = null;
    async function keepAwake(on) {
      try {
        if (on) {
          if (!("wakeLock" in navigator) || lock) return;
          lock = await navigator.wakeLock.request("screen");
          lock.addEventListener("release", () => { lock = null; });
        } else if (lock) {
          await lock.release();
          lock = null;
        }
      } catch { lock = null; }
    }

    return { spores, nosebleed, rain, flash, flip, strike, celebrate, keepAwake };
  })();

  /* ==================================================================
     6. Langue — le français est la source, l'anglais une surcouche
  ================================================================== */
  const i18n = (() => {
    let lang = store.get("hq.lang") === "en" ? "en" : "fr";
    const dict = () => (window.HQ_I18N || {});

    /* Traduit une chaîne produite par le script. La clé étant le texte
       français, tout ce qui n'est pas traduit reste lisible. */
    const t = (fr) => (lang === "en" ? (dict().S?.[fr] ?? fr) : fr);

    /* Mémorise le HTML français au premier basculement, pour pouvoir revenir. */
    const secours = new Map();
    function appliquer() {
      const { UI = {}, HTML = {} } = dict();
      Object.entries(UI).forEach(([cle, en]) => {
        if (en === null) return;
        const [sel, attr] = cle.split("@");
        const node = sel === "html" ? document.documentElement
          : sel === "title" ? document.querySelector("title")
          : document.querySelector(sel);
        if (!node) return;
        const k = `ui:${cle}`;
        if (!secours.has(k)) secours.set(k, attr ? node.getAttribute(attr) : node.textContent);
        const val = lang === "en" ? en : secours.get(k);
        if (attr) node.setAttribute(attr, val); else node.textContent = val;
      });
      Object.entries(HTML).forEach(([sel, en]) => {
        const node = document.querySelector(sel);
        if (!node) return;
        const k = `html:${sel}`;
        if (!secours.has(k)) secours.set(k, node.innerHTML);
        node.innerHTML = lang === "en" ? en : secours.get(k);
      });
    }

    return {
      t,
      get lang() { return lang; },
      set(l) {
        lang = l === "en" ? "en" : "fr";
        store.set("hq.lang", lang);
        document.documentElement.lang = lang;
        appliquer();
      },
      appliquer
    };
  })();

  window.HQ = { util, store, sfx, wall, fx, i18n, t: i18n.t };
})();
