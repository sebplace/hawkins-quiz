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
| **Deux modes** | *Enquête* (12 questions, 3 dimensions) et *Survie* (jusqu'à la première erreur, chrono qui ne remonte jamais). |
| **Tableau d'honneur** | Top 10 local par mode, initiales gravées en tapant trois lettres sur le mur. Comme au Palace Arcade. |
| **Jokers** | Trois, un usage chacun&nbsp;: la *batte de Steve* écarte deux réponses, le *walkman de Max* gèle le Démogorgon, *Radio Cerebro* fait voter le Club AV. Désactivés en Défi du jour, pour que la compétition reste franche. |
| **Série de jours** | Le Défi du jour compte les jours consécutifs. Un jour sauté, et la série tombe. |
| **Statistiques** | Histogramme des scores, taux de réussite, meilleure série, et une galerie des 15 rangs à débloquer. |
| **Défi du jour** | Les mêmes 12 questions pour tout le monde, tirées par la date. Une seule tentative, numéro de partie dans le partage. |
| **Lien de défi** | Chaque défi porte une graine dans son URL&nbsp;: envoyez-la, votre adversaire joue exactement le même paquet. |
| **Carte de score** | Une image PNG 1080 × 1350 dessinée au canvas, prête pour une story. Tout est tracé à la main, aucun émoji requis. |
| **Installable, hors ligne** | PWA complète&nbsp;: icône sur l'écran d'accueil, lancement sans réseau, service worker qui n'emprisonne jamais l'utilisateur sur une vieille version. |
| **3 phases visuelles** | Palette, scanlines CRT, vignette, spores et inclinaison de la page changent à chaque niveau. |
| **Score en Eggo** | Parce que les points, c'est pour les gens qui n'ont pas de congélateur. |
| **7 rangs + 1 secret** | De *Barb* (« personne n'a lancé d'avis de recherche ») à *Eleven*. Plus 7 rangs dédiés à la Survie. |
| **Sons synthétisés** | Arpèges, bips, sweeps et carillons générés à la volée en Web Audio. Aucun fichier audio. |
| **Partage façon Wordle** | 🧇🧇💀🧇 │ 🧇🧇🧇⏳ │ 🧇💀🧇🧇 — copié en un clic (ou via le partage natif du téléphone). |
| **Saignements de nez** | À partir de 3 bonnes réponses d'affilée. C'est le prix du talent. |

**91 questions** en banque, 12 tirées à chaque partie, **sans jamais repasser deux
fois la même tant que la banque n'est pas épuisée** : sept parties d'affilée sans
un seul doublon. Un filtre permet de restreindre le tirage à une ou plusieurs saisons.

Dix questions ne proposent aucun choix multiple : **il faut épeler la réponse**,
lettre par lettre, sur un mur d'alphabet miniature. Le décor devient la manette.

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

Zéro dépendance, zéro build, zéro tracker. Des fichiers statiques :

```
index.html
manifest.webmanifest
sw.js             ← service worker : HTML par le réseau, assets par le cache
assets/
  styles.css      ← thèmes par phase, mode Monde à l'Envers, mur, animations
  app.js          ← moteur, Web Audio, secrets, défi du jour, carte canvas
  questions.js    ← banque de questions + rangs
  icon-*.png      ← icônes PWA, générées depuis un SVG dessiné à la main
```

Les URL des assets portent un `?v=N` incrémenté à chaque livraison. Comme le
service worker sert le HTML par le réseau en priorité, une nouvelle version du
HTML demande automatiquement de nouvelles URL : personne ne reste bloqué sur un
mélange d'ancien JS et de nouveau HTML.

L'ensemble pèse moins de 150 Ko hors polices.

**Lancer en local :**

```bash
python -m http.server 8080
# puis http://localhost:8080
```

## Accessibilité

- Navigation clavier complète (<kbd>1</kbd>–<kbd>4</kbd> pour répondre, <kbd>Entrée</kbd> pour continuer).
- **Le focus suit le jeu** : chaque changement d'écran et chaque nouvelle question
  reprennent le focus sur leur titre, donc rien n'est annoncé dans le vide.
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

Le script valide la structure de chaque question, les doublons, la couverture
niveau × saison (au moins quatre questions par couple, sinon le filtre de saisons
se replierait silencieusement) et la continuité des tables de rangs. Il tourne
aussi à chaque `push` via GitHub Actions, avec la vérification de la syntaxe
JavaScript, du manifeste PWA et de la présence des fichiers référencés.

`tools/og-template.html` est le gabarit qui a servi à produire `assets/og.png`.

## Ajouter vos propres questions

Ouvrez `assets/questions.js` et ajoutez un objet. Deux formes sont acceptées.

**Choix multiple** — **la bonne réponse est toujours la première du tableau
`choices`** ; le mélange est fait à l'exécution.

```js
{
  level: 2,                               // 1 = facile, 2 = moyen, 3 = difficile
  s: 3,                                   // saison de référence (1 à 4)
  q: "Votre question ?",
  choices: ["La bonne", "Une fausse", "Une autre", "Encore une"],
  fact: "L'anecdote drôle affichée après la réponse."
}
```

**Réponse à épeler** — un seul mot, de 3 à 9 lettres, sans accent ni espace.

```js
{
  level: 3, s: 1, type: "spell",
  q: "Épelez le nom de famille de Vecna, celui de sa naissance.",
  answer: "CREEL",
  fact: "L'anecdote drôle affichée après la réponse."
}
```

Gardez au moins **quatre questions par couple niveau × saison**, sinon le filtre
de saisons se rabat silencieusement sur l'ensemble de la banque pour ce niveau.

## Mentions

Projet de fan **non officiel**, sans aucune affiliation avec Netflix, les frères
Duffer ou les ayants droit de la série. Aucun contenu audiovisuel, logo, image,
musique ou dialogue de la série n'est reproduit : le quiz ne contient que des
questions factuelles rédigées pour l'occasion et un habillage graphique original.

Code sous licence [MIT](LICENSE).
