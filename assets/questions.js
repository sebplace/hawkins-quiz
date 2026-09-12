/* ------------------------------------------------------------------
   Banque de questions — Hawkins Quiz
   La bonne réponse est TOUJOURS la première du tableau `choices`.
   Elle est mélangée à l'exécution (voir app.js).
   Faits issus des saisons 1 à 4. Projet de fan, non officiel.
------------------------------------------------------------------ */

const QUESTIONS = [
  /* =========== PHASE 1 — HAWKINS, 1983 =========== */
  {
    level: 1,
    q: "Dans quelle petite ville de l'Indiana tout part en vrille ?",
    choices: ["Hawkins", "Derry", "Hill Valley", "Twin Peaks"],
    fact: "Hawkins, Indiana. Démographie stable, sauf en novembre."
  },
  {
    level: 1,
    q: "Quelle marque de gaufres surgelées fait fondre Eleven ?",
    choices: ["Eggo", "Pop-Tarts", "Toaster Strudel", "Bisquick"],
    fact: "Eggo. À elle seule, elle justifie un deuxième congélateur."
  },
  {
    level: 1,
    q: "À quel jeu de rôle les garçons jouent-ils dans le sous-sol de Mike ?",
    choices: ["Donjons & Dragons", "Risk", "Monopoly", "Cluedo"],
    fact: "Dix heures de campagne, et Will lance quand même un 7. Ça commence bien."
  },
  {
    level: 1,
    q: "Comment Joyce Byers bricole-t-elle un téléphone vers l'au-delà ?",
    choices: [
      "Un alphabet peint au mur et des guirlandes de Noël",
      "Une CB et un four à micro-ondes",
      "Un Ouija et une lampe torche",
      "Deux talkies-walkies et beaucoup de scotch"
    ],
    fact: "26 lettres, 26 ampoules. Le haut débit de 1983."
  },
  {
    level: 1,
    q: "Quel est le vrai prénom d'Eleven ?",
    choices: ["Jane", "Joyce", "Janet", "Jean"],
    fact: "Jane. Mais « Onze » tient mieux sur un t-shirt."
  },
  {
    level: 1,
    q: "Qui est le chef de la police de Hawkins ?",
    choices: ["Jim Hopper", "Scott Clarke", "Bob Newby", "Murray Bauman"],
    fact: "Hopper. Régime alimentaire : café, cigarettes et mauvaise foi."
  },
  {
    level: 1,
    q: "Comment les gamins baptisent-ils le monstre de la saison 1 ?",
    choices: ["Le Démogorgon", "Le Mind Flayer", "Vecna", "Le Demodog"],
    fact: "Nom emprunté à leur manuel de D&D. Le branding avant la survie."
  },
  {
    level: 1,
    q: "Quel centre commercial flambant neuf ouvre en saison 3 ?",
    choices: ["Le Starcourt Mall", "Le Hawkins Plaza", "Le Midway Mall", "Le Palace Mall"],
    fact: "Ouvert en juin, fermé en juillet. Un record difficile à battre."
  },
  {
    level: 1,
    q: "Où Steve Harrington rame-t-il en costume de marin, saison 3 ?",
    choices: ["Scoops Ahoy", "Surfer Boy Pizza", "Family Video", "Le Palace Arcade"],
    fact: "Scoops Ahoy. Bilan du chapeau de marin : zéro numéro de téléphone."
  },
  {
    level: 1,
    q: "Quelle créature Dustin ramène-t-il chez lui, persuadé que c'est un têtard ?",
    choices: ["D'Artagnan, alias Dart", "Mews", "Yertle", "Chester"],
    fact: "Dart a mangé le chat. Dustin a quand même gardé le nom."
  },

  /* =========== PHASE 2 — HAWKINS NATIONAL LABORATORY =========== */
  {
    level: 2,
    q: "Quel laboratoire a gentiment percé un trou vers une autre dimension ?",
    choices: [
      "Le Hawkins National Laboratory",
      "Black Mesa",
      "L'institut Creel",
      "La station de Weathertop"
    ],
    fact: "Officiellement : Ministère de l'Énergie. Officieusement : « on répare la fuite, promis »."
  },
  {
    level: 2,
    q: "Comment s'appelle le club de D&D du lycée en saison 4 ?",
    choices: ["Le Hellfire Club", "L'AV Club", "Le Party", "Le Cercle du Démogorgon"],
    fact: "Présidé par Eddie Munson. La ville a cru à une secte satanique. La ville avait tort."
  },
  {
    level: 2,
    q: "Quelle chanson de Kate Bush devient un gilet de sauvetage en saison 4 ?",
    choices: ["Running Up That Hill", "Wuthering Heights", "Cloudbusting", "Babooshka"],
    fact: "Un walkman bien chargé sauve plus de vies qu'un fusil à pompe."
  },
  {
    level: 2,
    q: "Comment s'appelle le « Papa » d'Eleven au laboratoire ?",
    choices: ["Le Dr Martin Brenner", "Le Dr Sam Owens", "Le Dr Henry Creel", "Le Dr Alexei Petrov"],
    fact: "Sur l'échelle des figures paternelles, quelque part sous « Hopper un soir de beuverie »."
  },
  {
    level: 2,
    q: "Quel est le nom de la radio géante que Dustin construit pour capter les Russes ?",
    choices: ["Cerebro", "Bumblebee", "Heathkit", "Le Mind Flayer"],
    fact: "Installée sur la colline de Weathertop. Deux références de geek pour un seul gadget."
  },
  {
    level: 2,
    q: "Qui est Suzie ?",
    choices: [
      "La copine de Dustin, dans l'Utah",
      "La sœur de Robin",
      "Une scientifique russe",
      "La prof d'anglais de Hawkins High"
    ],
    fact: "Relation longue distance, radio amateur et un sens du timing absolument catastrophique."
  },
  {
    level: 2,
    q: "Quel Russe très sympathique se prend d'amour pour les Slurpee à la cerise ?",
    choices: ["Alexei", "Yuri", "Grigori", "Dmitri"],
    fact: "Il voulait juste garder sa peluche de fête foraine. Cette série ne pardonne rien."
  },
  {
    level: 2,
    q: "Qui est la disparue que tout le monde oublie en saison 1 ?",
    choices: ["Barbara Holland", "Chrissy Cunningham", "Heather Holloway", "Nancy Wheeler"],
    fact: "Justice pour Barb. Toujours pas."
  },
  {
    level: 2,
    q: "Quel est le prénom de la petite sœur de Lucas, redoutable négociatrice ?",
    choices: ["Erica", "Holly", "Karen", "Max"],
    fact: "Erica Sinclair. Tarif : glaces à volonté. Non négociable."
  },
  {
    level: 2,
    q: "Dans quelle salle d'arcade MADMAX pulvérise-t-il le record de Dig Dug ?",
    choices: ["Le Palace Arcade", "Le Starcourt Arcade", "Le Hawkins Fun Center", "Surfer Boy"],
    fact: "Dustin a exigé un recomptage. Dustin a perdu."
  },

  /* =========== PHASE 3 — LE MONDE À L'ENVERS =========== */
  {
    level: 3,
    q: "Sous quel nom Vecna est-il né ?",
    choices: ["Henry Creel", "Peter Ballard", "Victor Creel", "Martin Brenner"],
    fact: "Henry Creel, devenu Un, devenu Vecna — nom offert par Dustin, toujours prompt à dégainer son bestiaire."
  },
  {
    level: 3,
    q: "Quel objet obsédant annonce la mort des victimes de Vecna ?",
    choices: ["Une horloge de grand-père", "Un miroir brisé", "Une boîte à musique", "Un poste de radio"],
    fact: "Quatre coups d'horloge. Si vous les entendez, sortez le walkman. Vite."
  },
  {
    level: 3,
    q: "Quel est le métier de Bob Newby, héros de Hawkins ?",
    choices: ["Vendeur chez RadioShack", "Professeur de sciences", "Pompier", "Journaliste"],
    fact: "Bob « the Brain ». Il a résolu le labyrinthe ET tenu la porte. On ne s'en remet pas."
  },
  {
    level: 3,
    q: "Quel professeur de sciences fournit aimants, conseils et métaphores douteuses ?",
    choices: ["M. Clarke", "M. Hauser", "M. Wheeler", "M. Munson"],
    fact: "Scott Clarke : le seul adulte de Hawkins qui réponde vraiment aux questions."
  },
  {
    level: 3,
    q: "Quel est le nom du chat des Byers ?",
    choices: ["Mews", "Yertle", "Mittens", "Dart"],
    fact: "Disparu en service, digéré par un « têtard ». Repose en paix."
  },
  {
    level: 3,
    q: "Quelle était l'ancienne profession de Murray Bauman ?",
    choices: ["Journaliste d'investigation", "Agent du FBI", "Professeur de russe", "Plombier"],
    fact: "Journaliste, puis théoricien du complot, puis... meilleur détective de la série, en fait."
  },
  {
    level: 3,
    q: "Dans quelle pizzeria travaille Argyle en saison 4 ?",
    choices: ["Surfer Boy Pizza", "Benny's Burgers", "Enzo's", "Scoops Ahoy"],
    fact: "Une camionnette, de l'ananas et un niveau de sérénité jamais atteint dans cette série."
  },
  {
    level: 3,
    q: "En quel mois et quelle année Will Byers disparaît-il ?",
    choices: ["Novembre 1983", "Octobre 1984", "Juillet 1985", "Mars 1986"],
    fact: "6 novembre 1983. Il rentrait d'une partie de D&D. Ne jamais rentrer seul."
  },
  {
    level: 3,
    q: "Comment s'appelle le bal qui clôt la saison 2 ?",
    choices: ["Le Snow Ball", "Le Spring Fling", "Le Bal du Hellfire", "La Winter Formal"],
    fact: "Décembre 1984. Le slow le plus lourd de conséquences de l'histoire de la télévision."
  },
  {
    level: 3,
    q: "Que finit par donner Suzie à Dustin pour sauver le monde ?",
    choices: [
      "La constante de Planck",
      "Le code de la porte du labo",
      "La fréquence radio des Russes",
      "Sa combinaison de ski"
    ],
    fact: "Mais seulement après une chanson entière. Le monde a attendu. Le monde a bien fait."
  }
];

/* Rangs finaux : le mur d'alphabet épelle `wall`. */
const RANKS = [
  {
    min: 0, max: 2,
    name: "Barb",
    wall: "BARB",
    line: "Tu as disparu près de la piscine et personne n'a lancé d'avis de recherche. Personne."
  },
  {
    min: 3, max: 4,
    name: "Le maire de Hawkins",
    wall: "OURS",
    line: "Tu es formel : c'était un ours. Un très gros ours. Avec une tête en forme de fleur."
  },
  {
    min: 5, max: 6,
    name: "Steve Harrington (saison 1)",
    wall: "STEVE",
    line: "La coiffure est irréprochable, les réponses beaucoup moins. Tu t'améliores à l'épisode 8."
  },
  {
    min: 7, max: 8,
    name: "Robin Buckley",
    wall: "ROBIN",
    line: "Tu as décodé le message russe, mais tu parlais trop vite pour qu'on te suive."
  },
  {
    min: 9, max: 10,
    name: "Dustin Henderson",
    wall: "DUSTIN",
    line: "Diplômé du Club AV, opérateur certifié Cerebro. Suzie serait fière."
  },
  {
    min: 11, max: 11,
    name: "Eddie Munson",
    wall: "EDDIE",
    line: "Solo de guitare impeccable, une seule fausse note. Tu ne t'es pas enfui, toi."
  },
  {
    min: 12, max: 12,
    name: "Eleven",
    wall: "ELEVEN",
    line: "Douze sur douze. Tu as saigné du nez pendant le quiz, avoue."
  }
];
