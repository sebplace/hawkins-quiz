/* ==================================================================
   Hawkins Quiz — objets dessinés
   Art original au trait, uniquement du SVG écrit à la main : aucune
   image de la série n'est utilisée. Sert aux questions « devinette ».
   Exposé sous window.HQ_ART, chargé avant app.js.
================================================================== */
(() => {
  "use strict";

  /* Chaque pièce tient dans un viewBox 0 0 100 100 et n'utilise que
     `currentColor`, pour suivre la palette de la phase en cours.
     Le dessin reste `aria-hidden` : le nommer trahirait la réponse. C'est
     la note textuelle voisine (voir app.js) qui dit à un lecteur d'écran
     s'il manque quelque chose, plutôt qu'un titre qui vend la mèche. */
  const wrap = (inner) =>
    `<svg class="art__svg" viewBox="0 0 100 100" aria-hidden="true" focusable="false">${inner}</svg>`;

  const ART = {
    /* Gaufre : carré arrondi et sa grille */
    gaufre: wrap(`
      <rect x="18" y="18" width="64" height="64" rx="12" />
      <path d="M18 39h64M18 61h64M39 18v64M61 18v64" />`),

    /* Talkie-walkie : antenne, grille, bouton */
    talkie: wrap(`
      <path d="M62 28V12" />
      <rect x="34" y="28" width="32" height="60" rx="6" />
      <rect x="41" y="35" width="18" height="13" rx="2" />
      <path d="M41 57h18M41 65h18M41 73h18" />
      <circle cx="50" cy="82" r="3" />`),

    /* Cassette audio : coque, fenêtre et deux bobines */
    cassette: wrap(`
      <rect x="12" y="28" width="76" height="46" rx="6" />
      <rect x="24" y="38" width="52" height="20" rx="3" />
      <circle cx="38" cy="48" r="6" />
      <circle cx="62" cy="48" r="6" />
      <path d="M28 66h44" />`),

    /* Ampoule de guirlande, culot et fil */
    ampoule: wrap(`
      <path d="M50 74c-11 0-19-9-19-20 0-12 8-22 19-22s19 10 19 22c0 11-8 20-19 20Z" />
      <path d="M41 74h18M43 80h14" />
      <path d="M50 86v6M50 92c-9 0-14 4-22 4M50 92c9 0 14 4 22 4" />`),

    /* Dé à vingt faces */
    de20: wrap(`
      <path d="M50 12 88 34v42L50 98 12 76V34Z" />
      <path d="M50 12 32 44h36ZM32 44 12 34M68 44l20-10M32 44l-8 34M68 44l8 34M24 78h52M24 78l26 20M76 78 50 98" />`),

    /* Vélo : deux roues, cadre et guidon */
    velo: wrap(`
      <circle cx="24" cy="66" r="18" />
      <circle cx="76" cy="66" r="18" />
      <path d="M24 66 42 36h20L76 66M42 36h14M50 66h12M62 36l-6 30" />
      <path d="M56 32h12" />`),

    /* Gobelet de soda, couvercle bombé et paille */
    gobelet: wrap(`
      <path d="M32 34h36l-5 54H37Z" />
      <path d="M28 34c0-8 10-12 22-12s22 4 22 12" />
      <path d="M58 22 64 8" />
      <path d="M36 52h28" />`),

    /* Appareil photo argentique */
    photo: wrap(`
      <rect x="12" y="30" width="76" height="46" rx="7" />
      <circle cx="50" cy="53" r="15" />
      <circle cx="50" cy="53" r="7" />
      <rect x="34" y="22" width="20" height="8" rx="2" />
      <circle cx="76" cy="41" r="4" />`),

    /* Baladeau à cassette, avec son casque */
    baladeur: wrap(`
      <rect x="22" y="44" width="56" height="36" rx="5" />
      <rect x="32" y="54" width="36" height="16" rx="2" />
      <circle cx="41" cy="62" r="3" />
      <circle cx="59" cy="62" r="3" />
      <path d="M28 40c0-13 10-22 22-22s22 9 22 22" />
      <rect x="20" y="38" width="9" height="14" rx="4" />
      <rect x="71" y="38" width="9" height="14" rx="4" />`),

    /* Planche à roulettes */
    planche: wrap(`
      <path d="M16 52c0-6 8-8 34-8s34 2 34 8-8 8-34 8-34-2-34-8Z" />
      <path d="M32 60v6M68 60v6" />
      <circle cx="30" cy="72" r="6" />
      <circle cx="70" cy="72" r="6" />`)
  };

  window.HQ_ART = ART;
})();
