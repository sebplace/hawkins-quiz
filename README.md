# Hawkins Quiz

> Douze questions. Trois dimensions. Un Démogorgon qui compte les secondes.

Un quiz web qui teste votre maîtrise de **Stranger Things** — et qui se dégrade
visuellement à mesure que vous vous enfoncez : le sous-sol des Wheeler, puis le
laboratoire de Hawkins, puis *le Monde à l'Envers*, où la page finit par pencher
et se remplir de spores.

**▶ Jouer : https://sebplace.github.io/hawkins-quiz/**

---

## Ce qu'il y a dedans

| | |
|---|---|
| **Mur d'alphabet interactif** | 26 ampoules qui épellent vraiment des mots, comme Joyce. Il annonce votre rang final — et sert de clavier pour vos initiales. |
| **Chrono Démogorgon** | Pas une barre de progression : une créature dessinée en SVG qui traverse l'écran vers vous et ouvre sa fleur quand il ne reste presque plus rien. |
| **Six modes** | *Enquête* (12 questions, 3 dimensions), *Survie* (jusqu'à la première erreur, chrono qui ne remonte jamais), *Défi du jour*, *Duel local* (deux joueurs, un seul appareil), *Campagne* (20 points de vie, un dé à vingt faces) et *Revanche* (vos propres erreurs, et rien d'autre). |
| **Carnet d'erreurs** | Chaque question ratée entre au carnet et n'en sort qu'une fois réparée. Dès quatre entrées, le mode *Revanche* apparaît sur l'accueil et rejoue votre paquet d'échecs. |
| **Confort de jeu** | Quatre réglages, tous facultatifs et persistés&nbsp;: *sans chrono* (hors tableau d'honneur), *mode soirée* (gros texte pour jouer à plusieurs), *police lisible* (Atkinson Hyperlegible) et *sans devinette dessinée*. |
| **Tableau d'honneur** | Top 10 local par mode, initiales gravées en tapant trois lettres sur le mur. Comme au Palace Arcade. |
| **Jokers** | Trois, un usage chacun&nbsp;: la *batte de Steve* écarte deux réponses, le *walkman de Max* gèle le Démogorgon, *Radio Cerebro* fait voter le Club AV. Désactivés en Défi du jour, pour que la compétition reste franche. |
| **Série de jours** | Le Défi du jour compte les jours consécutifs. Un jour sauté, et la série tombe. |
| **Statistiques** | Histogramme des scores, **réussite par saison et par format**, point faible désigné, **les cinq questions qui vous résistent le plus**, et une galerie des 15 rangs à débloquer. |
| **Défi du jour** | Les mêmes 12 questions pour tout le monde, tirées par la date. Une seule tentative, numéro de partie dans le partage. |
| **Duel par lien** | Le lien de défi transporte la graine **et votre résultat**&nbsp;: douze caractères dans l'URL, rien n'est envoyé nulle part. Votre adversaire joue le même paquet, voit le score à battre, et reçoit la comparaison à la fin. |
| **Carte de score** | Une image PNG 1080 × 1350 dessinée au canvas, prête pour une story. **Elle prend la couleur du rang obtenu** : deux parties, deux cartes. Tout est tracé à la main, aucun émoji requis. |
| **Installable, hors ligne** | PWA complète&nbsp;: icône sur l'écran d'accueil, lancement sans réseau, service worker qui n'emprisonne jamais l'utilisateur sur une vieille version. |
| **3 phases visuelles** | Palette, scanlines CRT, vignette, spores et inclinaison de la page changent à chaque niveau. |
| **Score en Eggo** | Parce que les points, c'est pour les gens qui n'ont pas de congélateur. |
| **20 rangs, chacun sa couleur** | De *Barb* (« personne n'a lancé d'avis de recherche ») à *Eleven*, plus 7 rangs de Survie et 6 de Campagne. Chaque rang porte une teinte, reprise par la carte de score. |
| **Sons synthétisés** | Arpèges, bips, sweeps et carillons générés à la volée en Web Audio. Aucun fichier audio. |
| **Partage façon Wordle** | 🧇🧇💀🧇 │ 🧇🧇🧇⏳ │ 🧇💀🧇🧇 — copié en un clic (ou via le partage natif du téléphone). |
| **Saignements de nez** | À partir de 3 bonnes réponses d'affilée. C'est le prix du talent. |
| **Français, anglais et néerlandais** | Un bouton fait tourner toute l'app, questions comprises. Une langue n'apparaît dans la bascule que si sa banque couvre chaque couple niveau × saison&nbsp;: une traduction partielle reste invisible plutôt que de livrer un quiz à trous. |

**140 questions** en banque, couvrant **les cinq saisons**, 12 tirées à chaque partie,
**sans jamais repasser deux fois la même tant que la banque n'est pas épuisée** : onze
parties d'affilée sans un seul doublon. Un filtre permet de restreindre le tirage à une
ou plusieurs saisons — décochez S5 pour éviter toute révélation. Chaque couple
niveau × saison compte au moins sept questions, et le validateur refuse de descendre
sous six.

Six formats cohabitent : choix multiple, **réponse à épeler** lettre par lettre sur un
mur d'alphabet miniature, vrai/faux, chronologie à remettre dans l'ordre, l'intrus, et
devinette d'objet dessiné en SVG. Le décor devient la manette.

## Le mur parle

Le mur d'alphabet n'est pas qu'un décor : **on peut taper ses lettres** (au doigt
ou au clavier). Les lettres composées s'affichent sous le mur, et **six mots
secrets** déclenchent quelque chose. Un compteur discret « Secrets du mur *n* / 6 »
apparaît dès le premier trouvé, et la progression est conservée d'une visite à
l'autre.

Un des six mots ouvre le **Mode Monde à l'Envers**. Une fois débloqué, une bascule
permanente apparaît sur l'écran d'accueil — plus besoin de réépeler quoi que ce
soit. Dans ce mode :

- les trois phases basculent dans une palette violette et la page penche davantage ;
- **le chrono tombe à 15 s / 12 s / 10 s** ;
- chaque question **arrive en miroir** puis se redresse ;
- le score se compte en gouttes de sang, pas en gaufres ;
- l'horloge de Vecna sonne à mi-parcours ;
- le verdict porte un badge selon que vous en êtes revenu… ou pas.

Autres œufs de Pâques, non comptabilisés : cinq tapes sur le titre, un appui sur
le compteur de gaufres, `011` tapé hors quiz, le Konami code, et un rang secret
réservé à ceux qui réussissent l'exploit de faire 0 sur 12.

## Sur téléphone

Pensé tactile d'abord : cibles de 44 px minimum, retour haptique (`navigator.vibrate`)
sur les bonnes et mauvaises réponses, partage natif via `navigator.share`, effets
`:hover` neutralisés sur tactile pour éviter les états collés, respect des encoches
(`env(safe-area-inset-*)`), et une mise en page paysage dédiée qui passe les
réponses sur deux colonnes pour tenir dans 390 px de haut.

## Technique

Zéro dépendance, zéro build, zéro tracker, **zéro requête vers un tiers**. Des
fichiers statiques :

```
index.html
404.html          ← page disparue, avec ses cinq ampoules
manifest.webmanifest
sw.js             ← service worker : HTML par le réseau, assets par le cache
robots.txt  sitemap.xml
assets/
  fonts.css       ← @font-face des polices auto-hébergées
  fonts/          ← woff2 latin et latin-ext, sous licence SIL OFL 1.1
  styles.css      ← thèmes par phase, mode Monde à l'Envers, mur, animations
  core.js         ← socle : utilitaires, stockage, audio, mur, effets, langue (window.HQ)
  i18n.js         ← dictionnaire anglais de l'interface (window.HQ_I18N.en)
  i18n.nl.js      ← dictionnaire néerlandais (window.HQ_I18N.nl)
  app.js          ← moteur, écrans, jokers, défi du jour, statistiques, carte
  art.js          ← objets dessinés en SVG pour les devinettes
  questions.js    ← banque de questions + rangs
  questions.en.js ← traductions anglaises, indexées sur l'id de la question
  questions.nl.js ← traductions néerlandaises, mêmes clés
  icon-*.png og.png
tools/
  check-questions.js  ← validateur de la banque, des rangs et des traductions
  smoke.mjs           ← test de fumée : joue une partie dans chaque mode
  og-template.html    ← gabarit ayant servi à produire assets/og.png
```

Une **CSP stricte** est déclarée en `<meta>` : tout est en `'self'`, sans
`unsafe-inline` — d'où les angles des pétales du Démogorgon en classes plutôt
qu'en attributs `style`.

Les URL des assets portent un `?v=N` incrémenté à chaque livraison. Comme le
service worker sert le HTML par le réseau en priorité, une nouvelle version du
HTML demande automatiquement de nouvelles URL : personne ne reste bloqué sur un
mélange d'ancien JS et de nouveau HTML. Quand une mise à jour est prête, un
bandeau la propose au lieu de l'imposer.

**Lancer en local :**

```bash
python -m http.server 8080
# puis http://localhost:8080
```

## Accessibilité

- Navigation clavier complète (<kbd>1</kbd>–<kbd>4</kbd> pour répondre, <kbd>Entrée</kbd> pour continuer).
- **Le focus suit le jeu** : chaque changement d'écran et chaque nouvelle question
  reprennent le focus sur leur titre, donc rien n'est annoncé dans le vide.
- **Les devinettes dessinées disent la vérité.** Le dessin reste `aria-hidden` : le
  nommer trahirait la réponse. À la place, une note réservée aux lecteurs d'écran
  précise si l'image est un simple renfort — c'est le cas de quatre devinettes sur
  cinq — ou si la question repose entièrement dessus. Cette dernière est marquée
  `needsArt` : le réglage **« Sans devinette dessinée »** l'écarte du tirage, et elle
  ne paraît jamais dans le Défi du jour, pour que le paquet reste identique pour tout
  le monde.
- **Police lisible** : Atkinson Hyperlegible, dessinée par le Braille Institute pour la
  basse vision, remplace les deux familles d'origine et agrandit le corps du texte.
  Tant que le réglage est inactif, aucun de ses fichiers n'est téléchargé.
- **Sans chrono** : le Démogorgon patiente. Les parties concernées sortent du tableau
  d'honneur, et le Défi du jour garde son chrono pour que la comparaison tienne.
- **Mode soirée** : typographie doublée, pour jouer à plusieurs autour d'un écran.
- Les mots secrets se tapent aussi au clavier : le mur reste décoratif pour les
  lecteurs d'écran (`aria-hidden`) sans priver personne des easter eggs.
- `prefers-reduced-motion` respecté : animations, miroir et inclinaison désactivés.
- `prefers-contrast: more` respecté : couleurs secondaires et bordures renforcées.
- Contrastes, `aria-live` sur les révélations, focus visibles.
- Le son est **coupé par défaut** et ne démarre jamais sans clic.

## Vérifications

Aucune dépendance non plus pour les tests :

```bash
node tools/check-questions.js
```

Le script valide la structure de chaque question, l'unicité des `id`, les doublons, la
couverture niveau × saison (au moins six questions par couple, et au moins quatre une
fois les devinettes purement visuelles retirées), la continuité et la teinte des tables
de rangs, puis la complétude de chaque banque traduite.

Un second niveau **joue réellement au quiz**, dans un Chromium sans interface :

```bash
npm install --no-save playwright && npx playwright install chromium
node tools/smoke.mjs http://127.0.0.1:8099
```

Il enchaîne une partie dans chacun des six modes, active les quatre réglages de
confort, fait tourner les trois langues, vérifie que les jokers restent cliquables
après traduction, que le Défi du jour garde son chrono et que le duel par lien relit
bien le score de l'adversaire — en échouant à la moindre erreur de console. Playwright
n'est pas une dépendance du projet : l'intégration continue l'installe avec
`--no-save`, le temps du test. Sur une machine où le Chromium de Playwright n'est pas
téléchargeable, `HQ_SMOKE_CHANNEL=msedge` suffit.

Les deux tournent à chaque `push` via GitHub Actions, avec la vérification de la
syntaxe JavaScript, du manifeste PWA, de la présence des fichiers référencés et de leur
inscription dans la coquille du service worker.

`tools/og-template.html` est le gabarit qui a servi à produire `assets/og.png`.

## Ajouter vos propres questions

Ouvrez `assets/questions.js` et ajoutez un objet. Six formes sont acceptées, et
toutes portent un **`id` stable** : c'est lui, et non l'intitulé français, qui sert
de clé aux traductions. Corriger une coquille en français ne casse donc plus rien —
mais un `id` déjà publié ne doit **jamais** changer.

**Choix multiple** — **la bonne réponse est toujours la première du tableau
`choices`** ; le mélange est fait à l'exécution.

```js
{
  id: "mon-identifiant-stable",           // minuscules, chiffres et tirets, unique
  level: 2,                               // 1 = facile, 2 = moyen, 3 = difficile
  s: 3,                                   // saison de référence (1 à 5)
  q: "Votre question ?",
  choices: ["La bonne", "Une fausse", "Une autre", "Encore une"],
  fact: "L'anecdote drôle affichée après la réponse."
}
```

**Réponse à épeler** — un seul mot, de 3 à 9 lettres, sans accent ni espace.

```js
{
  id: "epeler-vecna", level: 3, s: 4, type: "spell",
  q: "Épelez le nom de famille de Vecna, celui de sa naissance.",
  answer: "CREEL",
  fact: "L'anecdote drôle affichée après la réponse."
}
```

Quatre autres types existent : `vf` (vrai/faux, avec `answer: true|false`), `chrono`
(trois `steps` donnés **dans le bon ordre**, mélangés à l'affichage), `intrus`
(comme un QCM, l'intrus en première position) et `draw` (un QCM accompagné d'une
pièce dessinée, référencée par `art: "cle"` dans `assets/art.js`).

Si le dessin **est** la question — « Quel objet est dessiné ici ? » — ajoutez
`needsArt: true`. La question sera écartée dès que le joueur demande du texte seul,
et ne paraîtra jamais dans le Défi du jour.

Gardez au moins **six questions par couple niveau × saison** : en dessous, le
validateur refuse la banque.

### Traduire une question

Ajoutez une entrée dans `assets/questions.en.js` ou `assets/questions.nl.js`,
**indexée sur l'`id`** :

```js
"mon-identifiant-stable": {
  q: "Your question?",
  choices: ["The right one", "A wrong one", "Another", "One more"],
  fact: "The funny note shown after the answer."
}
```

L'ordre des `choices` doit suivre celui du français. Une question sans traduction
n'est simplement pas proposée dans cette langue ; si cela creuse un trou dans la
matrice niveau × saison, la langue disparaît d'elle-même de la bascule.
`node tools/check-questions.js` rapporte la couverture de chaque langue à chaque
exécution.

Les chaînes d'interface vivent à part : `assets/i18n.js` pour l'anglais,
`assets/i18n.nl.js` pour le néerlandais. Les trois tables (`UI` par sélecteur CSS,
`HTML` pour les blocs entiers, `S` pour les chaînes produites par le script) ont la
**chaîne française pour clé** — ce qui n'est pas traduit reste donc lisible.

## Mentions

Projet de fan **non officiel**, sans aucune affiliation avec Netflix, les frères
Duffer ou les ayants droit de la série. Aucun contenu audiovisuel, logo, image,
musique ou dialogue de la série n'est reproduit : le quiz ne contient que des
questions factuelles rédigées pour l'occasion et un habillage graphique original.

Code sous licence [MIT](LICENSE).
