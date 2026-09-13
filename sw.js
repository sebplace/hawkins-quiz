/* Service worker — Hawkins Quiz
   Le HTML passe par le réseau d'abord (pour ne jamais rester coincé sur une
   vieille version), le reste est servi depuis le cache puis rafraîchi en fond.
   Les assets portent un `?v=` dans index.html : une nouvelle version du HTML
   demande donc automatiquement de nouvelles URL, jamais les anciennes. */

const CACHE = "hawkins-quiz-v11";
const SHELL = [
  "./",
  "./index.html",
  "./assets/fonts.css?v=11",
  "./assets/styles.css?v=11",
  "./assets/core.js?v=11",
  "./assets/i18n.js?v=11",
  "./assets/art.js?v=11",
  "./assets/questions.js?v=11",
  "./assets/questions.en.js?v=11",
  "./assets/app.js?v=11",
  "./assets/fonts/rozhaone-400-latin.woff2",
  "./assets/fonts/spacegrotesk-400-latin.woff2",
  "./assets/fonts/spacegrotesk-500-latin.woff2",
  "./assets/fonts/spacegrotesk-700-latin.woff2",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/og.png",
  "./manifest.webmanifest"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.allSettled(SHELL.map((u) => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const { request } = e;
  if (request.method !== "GET") return;

  /* Navigation : réseau d'abord, cache en secours. */
  if (request.mode === "navigate") {
    e.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put("./index.html", copy));
          return res;
        })
        .catch(() => caches.match("./index.html").then((r) => r || caches.match("./")))
    );
    return;
  }

  /* Ressources : cache d'abord, rafraîchissement silencieux derrière. */
  e.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((res) => {
          if (res && res.status === 200 && res.type === "basic") {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(request, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
