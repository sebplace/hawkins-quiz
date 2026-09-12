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
| **Mur d'alphabet interactif** | 26 ampoules qui épellent vraiment des mots, comme Joyce. Il annonce votre rang final. |
| **3 phases visuelles** | Palette, scanlines CRT, vignette, spores et inclinaison de la page changent à chaque niveau. |
| **Chrono Démogorgon** | 25 s, puis 20 s, puis 15 s. Zéro seconde = zéro gaufre. |
| **Score en Eggo** | Parce que les points, c'est pour les gens qui n'ont pas de congélateur. |
| **7 rangs** | De *Barb* (« personne n'a lancé d'avis de recherche ») à *Eleven*. |
| **Sons synthétisés** | Arpèges, bips et sweeps générés à la volée en Web Audio. Aucun fichier audio. |
| **Partage façon Wordle** | 🧇🧇🩸🧇 │ 🧇🧇🧇⏳ │ 🧇🩸🧇🧇 — copié en un clic. |
| **Saignements de nez** | À partir de 3 bonnes réponses d'affilée. C'est le prix du talent. |
| **Easter eggs** | Tapez `011` hors quiz. Et le Konami code, évidemment. |

30 questions en banque, 12 tirées au hasard à chaque partie : la rejouabilité est
volontairement élevée.

## Technique

Zéro dépendance, zéro build, zéro tracker. Trois fichiers statiques :

```
index.html
assets/
  styles.css     ← thèmes par phase, mur d'alphabet, animations
  app.js         ← moteur de quiz, Web Audio, easter eggs
  questions.js   ← banque de questions + rangs
```

Tout l'habillage est dessiné en CSS/SVG inline. Pas une seule image bitmap.
L'ensemble pèse moins de 50 Ko hors polices.

**Lancer en local :**

```bash
python -m http.server 8080
# puis http://localhost:8080
```

## Accessibilité

- Navigation clavier complète (<kbd>1</kbd>–<kbd>4</kbd> pour répondre, <kbd>Entrée</kbd> pour continuer).
- `prefers-reduced-motion` respecté : animations et inclinaison désactivées.
- Contrastes, `aria-live` sur les révélations, focus visibles.
- Le son est **coupé par défaut** et ne démarre jamais sans clic.

## Ajouter vos propres questions

Ouvrez `assets/questions.js` et ajoutez un objet. **La bonne réponse est toujours
la première du tableau `choices`** — le mélange est fait à l'exécution.

```js
{
  level: 2,                               // 1 = facile, 2 = moyen, 3 = difficile
  q: "Votre question ?",
  choices: ["La bonne", "Une fausse", "Une autre", "Encore une"],
  fact: "L'anecdote drôle affichée après la réponse."
}
```

## Mentions

Projet de fan **non officiel**, sans aucune affiliation avec Netflix, les frères
Duffer ou les ayants droit de la série. Aucun contenu audiovisuel, logo, image,
musique ou dialogue de la série n'est reproduit : le quiz ne contient que des
questions factuelles rédigées pour l'occasion et un habillage graphique original.

Code sous licence [MIT](LICENSE).
