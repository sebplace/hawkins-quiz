/* ------------------------------------------------------------------
   Banque de questions — Hawkins Quiz
   `level` : 1 facile, 2 moyen, 3 difficile.
   `s`     : saison de référence (1 à 4).
   `type`  : absent = choix multiple ; "spell" = réponse à épeler sur le mur.
   Pour les choix multiples, la bonne réponse est TOUJOURS la première
   du tableau `choices` — le mélange est fait à l'exécution (voir app.js).
   Faits issus des saisons 1 à 4. Projet de fan, non officiel.
------------------------------------------------------------------ */

const QUESTIONS = [

  /* ================================================================
     NIVEAU 1 — HAWKINS, 1983
  ================================================================ */
  {
    level: 1, s: 1,
    q: "Dans quelle petite ville de l'Indiana tout part en vrille ?",
    choices: ["Hawkins", "Derry", "Hill Valley", "Twin Peaks"],
    fact: "Hawkins, Indiana. Démographie stable, sauf en novembre."
  },
  {
    level: 1, s: 1,
    q: "Quelle marque de gaufres surgelées fait fondre Eleven ?",
    choices: ["Eggo", "Pop-Tarts", "Toaster Strudel", "Bisquick"],
    fact: "Eggo. À elle seule, elle justifie un deuxième congélateur."
  },
  {
    level: 1, s: 1,
    q: "À quel jeu de rôle les garçons jouent-ils dans le sous-sol de Mike ?",
    choices: ["Donjons & Dragons", "Risk", "Monopoly", "Cluedo"],
    fact: "Dix heures de campagne, et Will lance quand même un 7. Ça commence bien."
  },
  {
    level: 1, s: 1,
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
    level: 1, s: 1,
    q: "Quel est le vrai prénom d'Eleven ?",
    choices: ["Jane", "Joyce", "Janet", "Jean"],
    fact: "Jane. Mais « Onze » tient mieux sur un t-shirt."
  },
  {
    level: 1, s: 1,
    q: "Qui est le chef de la police de Hawkins ?",
    choices: ["Jim Hopper", "Scott Clarke", "Bob Newby", "Murray Bauman"],
    fact: "Hopper. Régime alimentaire : café, cigarettes et mauvaise foi."
  },
  {
    level: 1, s: 1,
    q: "Comment les gamins baptisent-ils le monstre de la saison 1 ?",
    choices: ["Le Démogorgon", "Le Mind Flayer", "Vecna", "Le Demodog"],
    fact: "Le nom vient de leur propre partie de Donjons & Dragons : Eleven l'a identifié en posant la figurine du monstre sur le plateau."
  },
  {
    level: 1, s: 1,
    q: "Comment s'appelle le fort en bois de Will, au fond des bois ?",
    choices: ["Castle Byers", "Fort Hawkins", "Le Donjon", "La Cabane du Roi"],
    fact: "Castle Byers. Trois planches, un drap, et plus de souvenirs que toute la ville."
  },
  {
    level: 1, s: 1,
    q: "Où Joyce Byers travaille-t-elle au début de la série ?",
    choices: ["Au magasin Melvald's", "Chez RadioShack", "Au Palace Arcade", "Chez Benny's"],
    fact: "Melvald's General Store. Elle y a surtout dévalisé le rayon guirlandes."
  },
  {
    level: 1, s: 1,
    q: "Comment Eleven explique-t-elle aux garçons où se trouve Will ?",
    choices: [
      "En retournant le plateau de Donjons & Dragons",
      "En dessinant une carte au feutre",
      "En épelant son nom sur le mur",
      "En pointant la forêt du doigt"
    ],
    fact: "Le plateau retourné. Toute la mythologie de la série tient dans ce geste."
  },
  {
    level: 1, s: 1,
    q: "Quel restaurant tient Benny, premier adulte gentil de la série ?",
    choices: ["Benny's Burgers", "Enzo's", "Surfer Boy Pizza", "Le Melvald's"],
    fact: "Benny's Burgers. Il a offert des frites à Eleven. Ça ne lui a pas porté chance."
  },
  {
    level: 1, s: 1,
    q: "Comment Eleven se déguise-t-elle pour passer inaperçue au collège ?",
    choices: [
      "Une perruque blonde et une robe rose",
      "Un uniforme de scout",
      "Une casquette et un survêtement",
      "Un déguisement de fantôme"
    ],
    fact: "Perruque blonde et robe empruntée à Nancy. Personne n'a rien vu, ce qui en dit long sur Hawkins."
  },
  {
    level: 1, s: 1,
    q: "Comment s'appelle le grand frère de Will, photographe à ses heures ?",
    choices: ["Jonathan", "Steve", "Billy", "Lucas"],
    fact: "Jonathan Byers. Il photographie tout, y compris ce qu'il ne devrait pas."
  },
  {
    level: 1, s: 2,
    q: "D'où débarque Max Mayfield en saison 2 ?",
    choices: ["De Californie", "du Maine", "de l'Utah", "de Chicago"],
    fact: "Californie. Le skateboard et le mauvais caractère sont venus avec."
  },
  {
    level: 1, s: 2,
    q: "Quel lien unit Billy Hargrove et Max Mayfield ?",
    choices: [
      "Le père de Billy a épousé la mère de Max",
      "Ils ont la même mère",
      "Ils sont cousins germains",
      "Ils ont grandi voisins en Californie"
    ],
    fact: "Neil Hargrove a épousé Susan Mayfield. Aucun lien de sang : Billy est le frère par alliance de Max, et un conducteur catastrophique."
  },
  {
    level: 1, s: 2,
    q: "En quoi les garçons se déguisent-ils pour Halloween en saison 2 ?",
    choices: ["En Ghostbusters", "En Démogorgons", "En cow-boys", "En membres du Hellfire"],
    fact: "Quatre Ghostbusters. Ils étaient les seuls déguisés. La photo est impitoyable."
  },
  {
    level: 1, s: 2,
    q: "Quelle créature géante plane au-dessus de Hawkins en saison 2 ?",
    choices: ["Le Mind Flayer", "Le Démogorgon", "Vecna", "Le Demodog"],
    fact: "L'Écorcheur d'esprits. Encore un nom piqué au bestiaire de D&D."
  },
  {
    level: 1, s: 2,
    q: "Où Hopper cache-t-il Eleven pendant presque un an ?",
    choices: ["Dans une cabane au fond des bois", "Au sous-sol des Wheeler", "Au laboratoire", "Chez Joyce"],
    fact: "Une cabane, trois règles et beaucoup de gaufres. Le règlement a tenu trois épisodes."
  },
  {
    level: 1, s: 2,
    q: "Quelle créature Dustin ramène-t-il chez lui, persuadé que c'est un têtard ?",
    choices: ["D'Artagnan, alias Dart", "Mews", "Yertle", "Chester"],
    fact: "Dart a mangé le chat. Dustin a quand même gardé le nom."
  },
  {
    level: 1, s: 3,
    q: "Quel centre commercial flambant neuf ouvre en saison 3 ?",
    choices: ["Le Starcourt Mall", "Le Hawkins Plaza", "Le Midway Mall", "Le Palace Mall"],
    fact: "Le Starcourt a brûlé dans la nuit du 4 juillet 1985. Bilan officiel : trente morts, et une version des faits très arrangée."
  },
  {
    level: 1, s: 3,
    q: "Où Steve Harrington rame-t-il en costume de marin, saison 3 ?",
    choices: ["Scoops Ahoy", "Surfer Boy Pizza", "Family Video", "Le Palace Arcade"],
    fact: "Scoops Ahoy. Bilan du chapeau de marin : zéro numéro de téléphone."
  },
  {
    level: 1, s: 3,
    q: "Avec qui Steve travaille-t-il derrière le comptoir de Scoops Ahoy ?",
    choices: ["Robin Buckley", "Nancy Wheeler", "Erica Sinclair", "Heather Holloway"],
    fact: "Robin. Elle compte ses échecs à lui sur un tableau. Le tableau se remplit vite."
  },
  {
    level: 1, s: 3,
    q: "Que cachent les Russes sous le Starcourt Mall ?",
    choices: ["Une base secrète", "Un parking", "Un cinéma", "Un entrepôt de Slurpee"],
    fact: "Une base entière. Personne à Hawkins n'a trouvé les travaux suspects."
  },
  {
    level: 1, s: 3,
    q: "Comment Erica Sinclair se rend-elle indispensable à l'équipe ?",
    choices: [
      "Elle seule tient dans les gaines du centre commercial",
      "Elle parle russe couramment",
      "Elle pirate l'ordinateur central",
      "Elle conduit le camion"
    ],
    fact: "Aucun des trois autres ne passait dans les conduits. Elle a négocié des glaces à volonté avant de s'engager."
  },
  {
    level: 1, s: 4,
    q: "Qui est la première victime de Vecna en saison 4 ?",
    choices: ["Chrissy Cunningham", "Fred Benson", "Patrick McKinney", "Max Mayfield"],
    fact: "Chrissy Cunningham, chef des pom-pom girls. Première de la vague de 1986 — Henry Creel avait déjà tué en 1959, puis en 1979."
  },
  {
    level: 1, s: 4,
    q: "Où vivent les Byers au début de la saison 4 ?",
    choices: ["À Lenora Hills, en Californie", "À Chicago", "À Salt Lake City", "Toujours à Hawkins"],
    fact: "La Californie. Le soleil n'a rien arrangé du tout."
  },
  {
    level: 1, s: 4,
    q: "Qui accuse publiquement Eddie Munson de diriger une secte ?",
    choices: ["Jason Carver", "Le shérif Powell", "M. Clarke", "Murray Bauman"],
    fact: "Jason Carver, capitaine de basket et procureur autoproclamé."
  },
  {
    level: 1, s: 4,
    q: "Quel objet Max ne quitte plus en saison 4 ?",
    choices: ["Son walkman", "Son skateboard", "Son talkie-walkie", "Son appareil photo"],
    fact: "Un walkman et une cassette. L'équipement de survie le plus efficace de la série."
  },
  {
    level: 1, s: 1, type: "spell",
    q: "Épelez le nom de famille de Will, Jonathan et Joyce.",
    answer: "BYERS",
    fact: "Byers. La famille la plus éprouvée d'Indiana, et de loin."
  },
  {
    level: 1, s: 1, type: "vf",
    q: "Le Démogorgon doit son nom au manuel de Donjons & Dragons des garçons.",
    answer: true,
    fact: "Vrai. Le monstre de leur campagne a donné son nom au vrai. Le jeu servira encore deux fois : Mind Flayer, puis Vecna."
  },
  {
    level: 1, s: 1, type: "vf",
    q: "Barb est retrouvée vivante à la fin de la saison 1.",
    answer: false,
    fact: "Faux, et c'est peu de le dire. Il faudra attendre la saison 2 pour que quelqu'un s'en préoccupe vraiment."
  },
  {
    level: 1, s: 1, type: "draw",
    art: "gaufre",
    q: "Quel objet est dessiné ici ?",
    choices: ["Une gaufre", "Un gaufrier", "Une plaque d'égout", "Un damier"],
    fact: "Une gaufre. La seule denrée capable de faire sortir Eleven d'une cachette."
  },
  {
    level: 1, s: 1, type: "draw",
    art: "talkie",
    q: "Quel appareil le Party utilise-t-il pour rester en contact ?",
    choices: ["Un talkie-walkie", "Une calculatrice", "Un poste de radio", "Un détecteur de métaux"],
    fact: "Le talkie-walkie : le réseau du Party, avec une portée théorique très optimiste."
  },
  {
    level: 1, s: 2, type: "draw",
    art: "de20",
    q: "Par quel objet toute l'histoire a-t-elle commencé ?",
    choices: ["Un dé à vingt faces", "Un diamant", "Un ballon de football", "Une boule à facettes"],
    fact: "Le dé à vingt faces. Celui que Will a lancé au début de tout — et qui est tombé sur un sept."
  },
  {
    level: 1, s: 1, type: "spell",
    q: "Épelez la marque de gaufres qui sert de monnaie d'échange à Eleven.",
    answer: "EGGO",
    fact: "Eggo. Aucune autre marque n'a autant compté dans la lutte contre le surnaturel."
  },
  {
    level: 1, s: 3, type: "spell",
    q: "Épelez le prénom de la petite sœur de Lucas, redoutable négociatrice.",
    answer: "ERICA",
    fact: "Erica Sinclair. Tarif : glaces à volonté. Non négociable."
  },

  /* ================================================================
     SAISON 5 — HAWKINS SOUS QUARANTAINE (novembre 1987)
     Uniquement des faits recoupés par au moins deux sources.
     Les points signalés contradictoires par la vérification (écart
     temporel S4-S5, sort de Nancy et Jonathan, durées d'épisodes)
     sont volontairement absents.
  ================================================================ */
  {
    level: 1, s: 5,
    q: "En quelle année se déroule la saison 5 ?",
    choices: ["1987", "1985", "1986", "1988"],
    fact: "Novembre 1987. Quatre ans, presque jour pour jour, après la disparition de Will."
  },
  {
    level: 1, s: 5,
    q: "Dans quel état se trouve Hawkins au début de la saison 5 ?",
    choices: [
      "Sous quarantaine militaire",
      "Entièrement évacuée",
      "Rebâtie et prospère",
      "Rayée des cartes"
    ],
    fact: "Quarantaine depuis l'ouverture des failles, en mars 1986. Il y a plus de militaires que d'habitants."
  },
  {
    level: 1, s: 5,
    q: "Où Steve et Robin travaillent-ils en saison 5 ?",
    choices: [
      "À la station de radio WSQK",
      "Au vidéoclub Family Video",
      "Chez Scoops Ahoy",
      "À la bibliothèque municipale"
    ],
    fact: "« The Squawk ». Robin y anime sous le pseudonyme de Rockin' Robin, et y glisse des messages codés."
  },
  {
    level: 1, s: 5,
    q: "Quelle petite sœur passe au premier plan en saison 5 ?",
    choices: ["Holly Wheeler", "Erica Sinclair", "Sara Hopper", "Max Mayfield"],
    fact: "Holly, la benjamine des Wheeler, promue au casting principal après huit ans d'arrière-plan."
  },
  {
    level: 1, s: 5,
    q: "Sous quel nom Vecna se fait-il passer auprès de Holly ?",
    choices: ["Monsieur Quiproquo", "Monsieur Personne", "L'Ami du grenier", "Le Marchand de sable"],
    fact: "Un ami imaginaire — jusqu'à ce que Karen comprenne que ce « Henry » n'a rien d'imaginaire."
  },
  {
    level: 1, s: 5, type: "vf",
    q: "Argyle, le livreur de pizzas, revient en saison 5.",
    answer: false,
    fact: "Faux : Eduardo Franco ne reprend pas le rôle. La camionnette Surfer Boy restera au garage."
  },
  {
    level: 1, s: 5,
    q: "Combien d'épisodes compte la saison 5 ?",
    choices: ["Huit", "Sept", "Neuf", "Dix"],
    fact: "Huit, sortis en trois vagues : quatre, puis trois, puis la finale seule."
  },

  {
    level: 2, s: 5,
    q: "Qui dirige la Wolf Pack, l'unité lancée aux trousses d'Eleven ?",
    choices: ["Le docteur Kay", "Le colonel Sullivan", "Le docteur Owens", "Le docteur Brenner"],
    fact: "Une générale et scientifique interprétée par Linda Hamilton. Elle traque Eleven pour son sang."
  },
  {
    level: 2, s: 5,
    q: "Comment s'appelle la zone militaire bâtie autour de la faille principale ?",
    choices: ["Le MAC-Z", "Le Starcourt", "Le secteur Creel", "La zone Weathertop"],
    fact: "Military Access Control Zone, érigée à l'emplacement de la bibliothèque municipale. Robin l'appelle le « Big Mac » à l'antenne."
  },
  {
    level: 2, s: 5,
    q: "Quel personnage absent depuis la saison 2 réapparaît en saison 5 ?",
    choices: ["Kali, le Sujet Huit", "Barbara Holland", "Bob Newby", "Billy Hargrove"],
    fact: "Kali Prasad, dont le pouvoir est l'illusion et non la télékinésie. Les frères Duffer disaient attendre le bon moment."
  },
  {
    level: 2, s: 5,
    q: "Dans quel état Max se trouve-t-elle au début de la saison 5 ?",
    choices: ["Dans le coma", "Partie de Hawkins", "Sous surveillance militaire", "Rétablie depuis longtemps"],
    fact: "Dans le coma depuis mars 1986. Lucas lui rend visite et lui passe des cassettes."
  },
  {
    level: 2, s: 5,
    q: "Quel écrivain a inspiré le nom de la prison mentale de la saison 5 ?",
    choices: [
      "Madeleine L'Engle",
      "Stephen King",
      "Ray Bradbury",
      "Ursula K. Le Guin"
    ],
    fact: "Camazotz vient d'« Un raccourci dans le temps ». C'est Holly qui lit le roman, et Holly qui donne le nom."
  },
  {
    level: 2, s: 5, type: "spell",
    q: "Épelez le nom de la prison mentale où Max est retenue.",
    answer: "CAMAZOTZ",
    fact: "Camazotz : une prison faite des souvenirs de Henry Creel. En maya, le mot désigne une chauve-souris de la mort."
  },

  {
    level: 3, s: 5,
    q: "Qui porte le coup fatal à Vecna, et avec quoi ?",
    choices: [
      "Joyce Byers, à la hache",
      "Eleven, par télékinésie",
      "Hopper, au fusil",
      "Will, en retournant ses pouvoirs"
    ],
    fact: "Eleven l'empale, Joyce l'achève. Personne dans cette série n'a jamais sous-estimé Joyce Byers deux fois."
  },
  {
    level: 3, s: 5,
    q: "Que révèle la saison 5 sur la nature du Monde à l'Envers ?",
    choices: [
      "Ce n'est pas une dimension, mais un trou de ver",
      "C'est un rêve collectif de Vecna",
      "C'est le futur de Hawkins",
      "C'est une simulation du laboratoire"
    ],
    fact: "Un passage vers les Abysses, la vraie dimension d'origine, maintenu ouvert par une masse de matière exotique."
  },
  {
    level: 3, s: 5,
    q: "D'où vient réellement le pouvoir de Henry Creel ?",
    choices: [
      "D'une pierre écarlate trouvée enfant dans une mine",
      "D'une expérience du docteur Brenner",
      "D'une morsure de Démogorgon",
      "Il est né avec"
    ],
    fact: "Scout dans le Nevada, il ouvre la mallette d'un espion blessé et touche un fragment du Flagelleur Mental. Tout part de là."
  },
  {
    level: 3, s: 5,
    q: "Quelle date tombe au cœur du dénouement de la saison 5 ?",
    choices: [
      "Le 6 novembre 1987",
      "Le 4 juillet 1987",
      "Le 31 décembre 1987",
      "Le 12 novembre 1987"
    ],
    fact: "Quatre ans jour pour jour après la disparition de Will. La série referme la boucle à la date exacte où elle l'avait ouverte."
  },
  {
    level: 3, s: 5,
    q: "Que représentent pour Vecna les douze enfants qu'il enlève ?",
    choices: [
      "Des « réceptacles parfaits »",
      "Des otages de négociation",
      "Une armée d'enfants soldats",
      "Des cobayes pour le docteur Kay"
    ],
    fact: "Douze enfants mis en transe pour affaiblir les membranes entre les mondes et, selon ses mots, refaçonner le monde."
  },
  {
    level: 3, s: 5,
    q: "Quel réalisateur est sorti de sa retraite pour signer deux épisodes ?",
    choices: ["Frank Darabont", "Shawn Levy", "John Carpenter", "Sam Raimi"],
    fact: "Le réalisateur des Évadés signe les chapitres trois et cinq. Il remplaçait Dan Trachtenberg, retenu ailleurs."
  },
  {
    level: 3, s: 5, type: "vf",
    q: "Will Byers fait son coming out devant le groupe en saison 5.",
    answer: true,
    fact: "Vrai, au chapitre sept. La scène a valu à l'épisode une campagne de notes négatives coordonnée."
  },
  {
    level: 3, s: 5, type: "chrono",
    q: "Remettez ces trois moments de la saison 5 dans l'ordre.",
    steps: [
      "Holly disparaît de Hawkins",
      "Max se réveille du coma",
      "Joyce décapite Vecna"
    ],
    fact: "Du chapitre deux au chapitre huit. Entre les deux, il aura fallu aller chercher Max au fond de la mémoire de Henry Creel."
  },

  /* ================================================================
     NIVEAU 2 — HAWKINS NATIONAL LABORATORY
  ================================================================ */
  {
    level: 2, s: 1,
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
    level: 2, s: 4,
    q: "Comment s'appelle le club de D&D du lycée en saison 4 ?",
    choices: ["Le Hellfire Club", "L'AV Club", "Le Party", "Le Cercle du Démogorgon"],
    fact: "Présidé par Eddie Munson. La ville a cru à une secte satanique. La ville avait tort."
  },
  {
    level: 2, s: 4,
    q: "Quelle chanson de Kate Bush devient un gilet de sauvetage en saison 4 ?",
    choices: ["Running Up That Hill", "Wuthering Heights", "Cloudbusting", "Babooshka"],
    fact: "Un walkman bien chargé sauve plus de vies qu'un fusil à pompe."
  },
  {
    level: 2, s: 1,
    q: "Comment s'appelle le « Papa » d'Eleven au laboratoire ?",
    choices: ["Le Dr Martin Brenner", "Le Dr Sam Owens", "Le Dr Henry Creel", "Le Dr Alexei Petrov"],
    fact: "Sur l'échelle des figures paternelles, quelque part sous « Hopper un soir de beuverie »."
  },
  {
    level: 2, s: 3,
    q: "Quel est le nom de la radio géante que Dustin construit pour capter les Russes ?",
    choices: ["Cerebro", "Bumblebee", "Heathkit", "Le Mind Flayer"],
    fact: "Installée sur la colline de Weathertop. Deux références de geek pour un seul gadget."
  },
  {
    level: 2, s: 3,
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
    level: 2, s: 3,
    q: "Quel Russe très sympathique se prend d'amour pour les Slurpee à la cerise ?",
    choices: ["Alexei", "Yuri", "Grigori", "Dmitri"],
    fact: "Il voulait juste garder sa peluche de fête foraine. Cette série ne pardonne rien."
  },
  {
    level: 2, s: 1,
    q: "Qui est la disparue que tout le monde oublie en saison 1 ?",
    choices: ["Barbara Holland", "Chrissy Cunningham", "Heather Holloway", "Nancy Wheeler"],
    fact: "Justice pour Barb. Toujours pas."
  },
  {
    level: 2, s: 2,
    q: "Dans quelle salle d'arcade MADMAX pulvérise-t-il le record de Dig Dug ?",
    choices: ["Le Palace Arcade", "Le Starcourt Arcade", "Le Hawkins Fun Center", "Surfer Boy"],
    fact: "Dustin a exigé un recomptage. Dustin a perdu."
  },
  {
    level: 2, s: 1,
    q: "Quel programme gouvernemental a servi de terrain de jeu au Dr Brenner ?",
    choices: ["MKUltra", "Le projet Manhattan", "Blue Book", "Stargate"],
    fact: "MKUltra. Le seul acronyme de la série qui existe vraiment, malheureusement."
  },
  {
    level: 2, s: 1,
    q: "Comment s'appelle la mère biologique d'Eleven ?",
    choices: ["Terry Ives", "Becky Ives", "Karen Wheeler", "Joyce Byers"],
    fact: "Terry Ives. Après les électrochocs, elle répète six fragments en boucle. Il a fallu des années pour comprendre que c'était un message."
  },
  {
    level: 2, s: 1,
    q: "Comment les garçons improvisent-ils un caisson d'isolation sensorielle ?",
    choices: [
      "Une pataugeoire montée au collège, remplie de sel de déneigement",
      "La piscine municipale et des sacs de sel de table",
      "La baignoire des Byers et beaucoup de glaçons",
      "Le réservoir récupéré au laboratoire"
    ],
    fact: "Ils ont choisi le collège pour son stock de sel de déneigement. M. Clarke a donné la recette au téléphone, un samedi soir, sans poser la moindre question."
  },
  {
    level: 2, s: 2,
    q: "Quel médecin remplace Brenner à la tête du laboratoire en saison 2 ?",
    choices: ["Le Dr Sam Owens", "Le Dr Martin Brenner", "Le Dr Alexei", "Le Dr Victor Creel"],
    fact: "Owens. Nettement plus sympathique, ce qui n'était pas très difficile."
  },
  {
    level: 2, s: 2,
    q: "Qui est Kali, la femme qu'Eleven retrouve à Chicago ?",
    choices: ["Le Sujet Huit", "Sa demi-sœur", "Une scientifique en fuite", "Une amie de Terry"],
    fact: "Huit. Elle fabrique des illusions, dont celle d'un plan qui tiendrait la route."
  },
  {
    level: 2, s: 2,
    q: "Qu'est-ce qui pourrit dans les champs de citrouilles autour de Hawkins ?",
    choices: [
      "Toute la récolte, empoisonnée depuis les tunnels",
      "Rien, c'est une rumeur",
      "Seulement le champ des Byers",
      "Les pommes de terre, pas les citrouilles"
    ],
    fact: "Le fermier Merrill accuse son voisin Eugene de l'avoir empoisonné. Hopper n'y croit pas : la pourriture rayonne depuis le laboratoire."
  },
  {
    level: 2, s: 3,
    q: "Comment Robin perce-t-elle le code du message russe ?",
    choices: [
      "Elle parle quatre langues et décode à l'oreille",
      "Elle a un oncle traducteur",
      "Elle utilise l'ordinateur du laboratoire",
      "Elle demande à Murray"
    ],
    fact: "Quatre langues, dit-elle : espagnol, français, italien... et le pig latin. Le russe n'en fait pas partie, ce qui ne l'a pas empêchée de tout déchiffrer."
  },
  {
    level: 2, s: 3,
    q: "Comment les gamins tentent-ils de neutraliser Billy, possédé, en saison 3 ?",
    choices: ["En l'enfermant dans le sauna", "En l'assommant avec une batte", "En l'attirant au labo", "En appelant la police"],
    fact: "Le sauna. La chaleur contre le Mind Flayer : leur meilleure idée de la saison."
  },
  {
    level: 2, s: 4,
    q: "Où Hopper est-il retenu prisonnier au début de la saison 4 ?",
    choices: ["Au Kamtchatka, en Russie", "Dans le laboratoire de Hawkins", "En Alaska", "Dans le Monde à l'Envers"],
    fact: "Un goulag, une masse, et un Démogorgon dans la fosse. Les vacances idéales."
  },
  {
    level: 2, s: 4,
    q: "Quelle maison de Hawkins est au cœur du mystère de la saison 4 ?",
    choices: ["La maison Creel", "La maison Wheeler", "La maison Byers", "La maison Harrington"],
    fact: "La maison Creel. Le genre de bien immobilier qu'aucun agent n'arrive à vendre."
  },
  {
    level: 2, s: 4,
    q: "Qui est Victor Creel et où le trouve-t-on ?",
    choices: [
      "Le père d'Henry, interné à l'asile de Pennhurst",
      "Un scientifique du labo de Hawkins",
      "Le maire de Hawkins",
      "Un ancien collègue de Brenner"
    ],
    fact: "Interné depuis 1959 pour un crime qu'il n'a pas commis. Personne ne l'a écouté non plus."
  },
  {
    level: 2, s: 4,
    q: "Dans quel parc de mobil-homes vit Eddie Munson ?",
    choices: ["Forest Hills", "Lover's Lake", "Starcourt", "Roane Hills"],
    fact: "Forest Hills Trailer Park. La caravane de l'oncle Wayne, et un plafond en très mauvais état."
  },
  {
    level: 2, s: 2, type: "spell",
    q: "Épelez le nom de famille du chef de la police de Hawkins.",
    answer: "HOPPER",
    fact: "Hopper. Six lettres, une carrure, et zéro aptitude au dialogue."
  },
  {
    level: 2, s: 3, type: "vf",
    q: "Robin Buckley parle couramment le russe.",
    answer: false,
    fact: "Faux. Elle revendique quatre langues — espagnol, français, italien et le pig latin — mais pas le russe. Elle a tout décodé à l'oreille."
  },
  {
    level: 2, s: 1, type: "vf",
    q: "Eleven est la fille biologique de Jim Hopper.",
    answer: false,
    fact: "Faux : sa mère est Terry Ives. Hopper l'adoptera officiellement, ce qui n'enlève rien à l'affaire."
  },
  {
    level: 2, s: 1, type: "intrus",
    q: "Trois de ces personnes ont travaillé pour le laboratoire de Hawkins. Qui est l'intrus ?",
    choices: ["Bob Newby", "Martin Brenner", "Sam Owens", "Connie Frazier"],
    fact: "Bob vendait des postes de radio chez RadioShack. Les trois autres émargeaient au laboratoire, chacun à sa façon."
  },
  {
    level: 2, s: 4, type: "intrus",
    q: "Trois de ces lieux se trouvent à Hawkins. Lequel est l'intrus ?",
    choices: ["Lenora Hills", "Lover's Lake", "Forest Hills", "Le Starcourt Mall"],
    fact: "Lenora Hills est en Californie : c'est là que les Byers ont tenté de recommencer une vie normale."
  },
  {
    level: 2, s: 3, type: "chrono",
    q: "Remettez ces trois moments de la saison 3 dans l'ordre.",
    steps: [
      "Billy percute la créature à l'aciérie",
      "Heather est enlevée à la piscine",
      "Le Starcourt Mall part en flammes"
    ],
    fact: "Billy est écorché le premier, il enlève Heather dès le lendemain, et tout se termine dans l'incendie du 4 juillet."
  },
  {
    level: 2, s: 2, type: "draw",
    art: "velo",
    q: "Sur quel engin le Party traverse-t-il Hawkins ?",
    choices: ["Un vélo", "Une paire de lunettes", "Un chariot", "Une brouette"],
    fact: "Le vélo : le seul moyen de transport du Party avant que Steve n'accepte de faire chauffeur."
  },
  {
    level: 2, s: 3, type: "spell",
    q: "Épelez le nom du centre commercial qui a duré un été.",
    answer: "STARCOURT",
    fact: "Starcourt. Neuf lettres et une facture d'assurance considérable."
  },
  {
    level: 2, s: 4, type: "spell",
    q: "Épelez le nom du club de jeu de rôle d'Eddie Munson.",
    answer: "HELLFIRE",
    fact: "Hellfire. Un nom choisi pour provoquer. Objectif atteint au-delà des espérances."
  },
  {
    level: 2, s: 2,
    q: "Combien de règles Hopper impose-t-il à Eleven dans la cabane ?",
    choices: ["Trois", "Une seule", "Cinq", "Dix"],
    fact: "Trois. Rideaux toujours tirés, porte verrouillée, et interdiction de sortir. Eleven les a enfreintes toutes les trois le même soir."
  },
  {
    level: 2, s: 3,
    q: "Quel est le vrai métier de Murray Bauman avant la théorie du complot ?",
    choices: ["Journaliste d'investigation", "Agent du FBI", "Professeur de russe", "Plombier"],
    fact: "Journaliste, puis théoricien du complot, puis... meilleur détective de la série, en fait."
  },
  {
    level: 2, s: 4,
    q: "Quel surnom Dustin donne-t-il au monstre de la saison 4 ?",
    choices: ["Vecna", "Le Mind Flayer", "Le Démogorgon", "Henry"],
    fact: "Vecna, toujours d'après D&D. À ce stade, le manuel devrait être considéré comme une pièce à conviction."
  },
  {
    level: 2, s: 1,
    q: "Qui sont Callahan et Powell ?",
    choices: ["Les adjoints d'Hopper", "Deux agents du laboratoire", "Les parents de Barb", "Deux professeurs"],
    fact: "Les deux adjoints. Leur contribution à l'enquête tient en un beignet."
  },
  {
    level: 2, s: 4,
    q: "Qui aide Hopper à s'évader depuis l'intérieur de la prison russe ?",
    choices: ["Dmitri, alias Enzo", "Yuri", "Grigori", "Alexei"],
    fact: "Dmitri. Le nom de code « Enzo » venait du restaurant du rendez-vous manqué."
  },
  {
    level: 2, s: 2,
    q: "Qui tient le comptoir du Palace Arcade et monnaie chaque information ?",
    choices: ["Keith", "Murray", "Billy", "Steve"],
    fact: "Keith, simple employé. Son tarif : un rendez-vous avec Nancy Wheeler. Mike a refusé net ; Dustin et Lucas étaient prêts à signer."
  },

  /* ================================================================
     NIVEAU 3 — LE MONDE À L'ENVERS
  ================================================================ */
  {
    level: 3, s: 4,
    q: "Sous quel nom Vecna est-il né ?",
    choices: ["Henry Creel", "Peter Ballard", "Victor Creel", "Martin Brenner"],
    fact: "Henry Creel, devenu Un, devenu Vecna — nom offert par Dustin, toujours prompt à dégainer son bestiaire."
  },
  {
    level: 3, s: 4,
    q: "Quel objet obsédant annonce la mort des victimes de Vecna ?",
    choices: ["Une horloge de grand-père", "Un miroir brisé", "Une boîte à musique", "Un poste de radio"],
    fact: "Quatre coups d'horloge. Si vous les entendez, sortez le walkman. Vite."
  },
  {
    level: 3, s: 2,
    q: "Quel est le métier de Bob Newby, héros de Hawkins ?",
    choices: ["Vendeur chez RadioShack", "Professeur de sciences", "Pompier", "Journaliste"],
    fact: "Bob « the Brain », gérant du magasin. Seul à connaître le BASIC, il est descendu rétablir le courant et déverrouiller les portes. Les Demodogs l'ont rattrapé dans le hall, à deux pas de la sortie."
  },
  {
    level: 3, s: 1,
    q: "Quel professeur de sciences fournit aimants, conseils et métaphores douteuses ?",
    choices: ["M. Clarke", "M. Hauser", "M. Wheeler", "M. Munson"],
    fact: "Scott Clarke : le seul adulte de Hawkins qui réponde vraiment aux questions."
  },
  {
    level: 3, s: 2,
    q: "Comment s'appelle la chatte que Dart dévore chez Dustin ?",
    choices: ["Mews", "Yurtle", "Mittens", "Tews"],
    fact: "Mews, la chatte adorée de Claudia Henderson. Dustin l'a enterrée dans le jardin et a envoyé sa mère la chercher à l'autre bout du quartier."
  },
  {
    level: 3, s: 4,
    q: "Dans quelle pizzeria travaille Argyle en saison 4 ?",
    choices: ["Surfer Boy Pizza", "Benny's Burgers", "Enzo's", "Scoops Ahoy"],
    fact: "Une camionnette, de l'ananas et un niveau de sérénité jamais atteint dans cette série."
  },
  {
    level: 3, s: 1,
    q: "En quel mois et quelle année Will Byers disparaît-il ?",
    choices: ["Novembre 1983", "Octobre 1984", "Juillet 1985", "Mars 1986"],
    fact: "6 novembre 1983. Il rentrait d'une partie de D&D. Ne jamais rentrer seul."
  },
  {
    level: 3, s: 2,
    q: "Comment s'appelle le bal qui clôt la saison 2 ?",
    choices: ["Le Snow Ball", "Le Spring Fling", "Le Bal du Hellfire", "La Winter Formal"],
    fact: "Décembre 1984. Le slow le plus lourd de conséquences de l'histoire de la télévision."
  },
  {
    level: 3, s: 3,
    q: "Que finit par donner Suzie à Dustin pour sauver le monde ?",
    choices: [
      "La constante de Planck",
      "Le code de la porte du labo",
      "La fréquence radio des Russes",
      "Sa combinaison de ski"
    ],
    fact: "Mais seulement après une chanson entière. Le monde a attendu. Le monde a bien fait."
  },
  {
    level: 3, s: 4,
    q: "À quelle date le Monde à l'Envers est-il figé ?",
    choices: [
      "Au 6 novembre 1983, jour de la disparition de Will",
      "Au 4 juillet 1985, jour du Starcourt",
      "Au 1er janvier 1986",
      "À aucune date : il n'a pas de temps"
    ],
    fact: "Tout y est resté gelé à l'instant où Will a disparu. La révélation la plus élégante de la série."
  },
  {
    level: 3, s: 4,
    q: "Comment s'appelle le lac où s'ouvre une faille en saison 4 ?",
    choices: ["Lover's Lake", "Lake Michigan", "Le lac Creel", "Le lac Hawkins"],
    fact: "Lover's Lake. Les gamins ont surnommé la faille « Watergate ». Ils étaient très fiers."
  },
  {
    level: 3, s: 4,
    q: "Quel est le nom de l'installation où Eleven retrouve ses pouvoirs en saison 4 ?",
    choices: ["Le projet NINA", "Le projet MKUltra", "Le laboratoire Creel", "La station Cerebro"],
    fact: "Un caisson d'isolation au fond d'un ancien silo à missiles du Nevada, et Brenner de retour. Rien ne se passe jamais bien avec Brenner."
  },
  {
    level: 3, s: 3,
    q: "Quel tueur russe poursuit Hopper et Joyce dans tout Hawkins ?",
    choices: ["Grigori", "Alexei", "Dmitri", "Yuri"],
    fact: "Grigori. C'est le maire Kline qui le surnomme « Arnold Schwarzenegger » — la ressemblance avec le T-800 est entièrement assumée par la production."
  },
  {
    level: 3, s: 3,
    q: "Quel métier exerce Heather Holloway en saison 3 ?",
    choices: [
      "Maître-nageuse à la piscine municipale",
      "Vendeuse au Starcourt Mall",
      "Serveuse chez Enzo's",
      "Journaliste au Hawkins Post"
    ],
    fact: "Maître-nageuse, et collègue de Billy — qui l'enlèvera le lendemain de son propre écorchement. C'est son père qui dirige le Hawkins Post."
  },
  {
    level: 3, s: 2,
    q: "Comment les gamins détournent-ils les Demodogs du laboratoire ?",
    choices: [
      "En incendiant le nœud des tunnels à l'essence",
      "En les appâtant avec de la viande crue",
      "En diffusant un signal radio",
      "En répandant du sel dans les galeries"
    ],
    fact: "La viande crue, essayée à la casse quelques épisodes plus tôt, avait lamentablement échoué : Dart préfère le vivant. Restait l'essence."
  },
  {
    level: 3, s: 1,
    q: "Comment Nancy et Jonathan préparent-ils leur piège au Démogorgon ?",
    choices: [
      "Un piège à ours, de l'essence et beaucoup d'imprudence",
      "Une cage électrifiée",
      "Un filet et une batte cloutée",
      "Une bombe artisanale"
    ],
    fact: "Ils ont acheté l'arsenal chez un armurier sans qu'il pose la moindre question. 1983, quoi."
  },
  {
    level: 3, s: 4,
    q: "Quel morceau Eddie Munson joue-t-il depuis le Monde à l'Envers ?",
    choices: ["Master of Puppets", "Enter Sandman", "Paranoid", "Ace of Spades"],
    fact: "Le solo le plus coûteux de l'histoire du rock amateur. Et le plus mérité."
  },
  {
    level: 3, s: 4,
    q: "Quel contrebandier russe accepte de l'argent, puis change d'avis ?",
    choices: ["Yuri Ismaylov", "Dmitri", "Grigori", "Alexei"],
    fact: "Yuri, pilote d'avion et vendeur de beurre de cacahuète. Une reconversion difficile à suivre."
  },
  {
    level: 3, s: 1,
    q: "Qui est Connie Frazier ?",
    choices: [
      "L'agente du labo infiltrée qui abat Benny",
      "Une infirmière du laboratoire",
      "La mère de Barb",
      "Une journaliste de Hawkins"
    ],
    fact: "Faux services sociaux, vraie arme à feu. La série avait annoncé la couleur dès l'épisode 2."
  },
  {
    level: 3, s: 2,
    q: "Qui est Becky Ives ?",
    choices: ["La sœur de Terry", "La mère de Barb", "Une infirmière du labo", "La tante de Max"],
    fact: "Becky, qui s'occupe de Terry depuis des années dans une maison pleine de silence."
  },
  {
    level: 3, s: 3,
    q: "Quel film les personnages regardent-ils dans le cinéma du Starcourt ?",
    choices: ["Retour vers le futur", "Le Jour des morts-vivants", "Les Goonies", "E.T."],
    fact: "Dustin planque tout le monde dans une avant-première bondée pour semer les Russes. Le Jour des morts-vivants, lui, n'est qu'une affiche dans le hall."
  },
  {
    level: 3, s: 4,
    q: "Quelle équipe de basket Jason Carver mène-t-il en finale ?",
    choices: ["Les Tigers de Hawkins", "Les Demogorgons", "Les Wildcats", "Les Bulldogs"],
    fact: "Les Hawkins Tigers. Le match et le concert d'Eddie se jouent exactement en même temps."
  },
  {
    level: 3, s: 1,
    q: "Comment Eleven montre-t-elle ses pouvoirs aux garçons pour la première fois ?",
    choices: [
      "Elle claque la porte de la chambre à distance",
      "Elle écrase une canette par la pensée",
      "Elle fait léviter le Faucon Millenium",
      "Elle allume les guirlandes de Noël"
    ],
    fact: "Lucas voulait sortir prévenir Karen Wheeler : la porte s'est refermée seule, et Eleven saignait du nez. La fameuse canette écrasée, elle, n'est qu'un souvenir du laboratoire."
  },
  {
    level: 3, s: 2,
    q: "Quel est le nom de la tortue de Dustin ?",
    choices: ["Yurtle", "Mews", "Dart", "Chester"],
    fact: "Yurtle, avec un U — clin d'œil à la tortue de Dr. Seuss. Expulsée de son terrarium pour y loger Dart, elle s'en est bien mieux sortie que la chatte."
  },
  {
    level: 3, s: 1,
    q: "Quel est le prénom de la plus jeune des Wheeler ?",
    choices: ["Holly", "Karen", "Erica", "Sara"],
    fact: "Holly. Elle a vu les guirlandes s'animer chez les Byers, puis une silhouette pousser le mur. Personne ne l'a crue."
  },
  {
    level: 3, s: 3,
    q: "Que gagne Alexei à la fête foraine juste avant la fin ?",
    choices: ["Une peluche de Woody Woodpecker", "Un poisson rouge", "Un ballon", "Une casquette"],
    fact: "Il a crevé tous les ballons sans en manquer un seul, puis a couru montrer sa peluche à Murray en criant que ce n'était pas truqué. Grigori l'a abattu dans la seconde."
  },
  {
    level: 3, s: 4, type: "spell",
    q: "Épelez le nom de famille de Vecna, celui de sa naissance.",
    answer: "CREEL",
    fact: "Creel. Un nom de famille, une maison, et soixante ans de malentendu."
  },
  {
    level: 3, s: 4, type: "vf",
    q: "Le Monde à l'Envers est figé au jour de la disparition de Will Byers.",
    answer: true,
    fact: "Vrai. Nancy le découvre en ouvrant son journal intime : la page est restée au 6 novembre 1983."
  },
  {
    level: 3, s: 3, type: "vf",
    q: "Alexei a triché pour gagner sa peluche à la fête foraine.",
    answer: false,
    fact: "Faux, et c'est tout le sel de la scène : il a crevé tous les ballons sans en manquer un, puis a couru crier à Murray que ce n'était pas truqué."
  },
  {
    level: 3, s: 3, type: "intrus",
    q: "Trois de ces personnages sont russes. Lequel est l'intrus ?",
    choices: ["Murray Bauman", "Alexei", "Grigori", "Dmitri"],
    fact: "Murray est américain. Il parle russe, ce qui n'est pas tout à fait la même chose — et ce qui lui a sauvé la mise plus d'une fois."
  },
  {
    level: 3, s: 1, type: "chrono",
    q: "Remettez ces trois moments de la saison 1 dans l'ordre.",
    steps: [
      "Will disparaît sur la route du retour",
      "Joyce peint l'alphabet sur le mur du salon",
      "Les garçons remplissent une pataugeoire de sel"
    ],
    fact: "Du 6 au 12 novembre 1983. Six jours pendant lesquels personne n'a dormi, à commencer par Joyce."
  },
  {
    level: 3, s: 4, type: "chrono",
    q: "Remettez ces trois moments de la série dans l'ordre.",
    steps: [
      "Le bal du Snow Ball",
      "L'incendie du Starcourt Mall",
      "La première victime de Vecna"
    ],
    fact: "Décembre 1984, juillet 1985, mars 1986. Hawkins n'aura jamais eu plus de dix-huit mois de répit."
  },
  {
    level: 3, s: 4, type: "draw",
    art: "baladeur",
    q: "Quel objet a arraché Max aux griffes de Vecna ?",
    choices: ["Un baladeur à cassette", "Un magnétoscope", "Un appareil photo", "Un grille-pain"],
    fact: "Le baladeur de Max. L'équipement de survie le plus efficace jamais opposé à Vecna."
  },
  {
    level: 3, s: 3, type: "spell",
    q: "Épelez le prénom du Russe amateur de Slurpee à la cerise.",
    answer: "ALEXEI",
    fact: "Alexei. Le personnage le plus attachant à avoir tenu six épisodes."
  },
  {
    level: 3, s: 2, type: "spell",
    q: "Épelez le nom de la salle d'arcade de Hawkins.",
    answer: "PALACE",
    fact: "Le Palace Arcade. Keith y tient le comptoir, et il monnaie chaque information."
  },
  {
    level: 3, s: 3, type: "spell",
    q: "Épelez le prénom de la petite amie de Dustin, quelque part dans l'Utah.",
    answer: "SUZIE",
    fact: "Suzie. Elle existe vraiment. Personne n'y croyait, et on la comprend un peu."
  }
];

/* Rangs du mode Campagne : indexés sur le nombre de questions tenues. */
const CAMPAIGN_RANKS = [
  {
    min: 0, max: 3,
    name: "Mort au premier jet",
    wall: "RATE",
    line: "Le maître du donjon n'a même pas eu le temps de poser le décor. Il reste des chips, si ça console."
  },
  {
    min: 4, max: 7,
    name: "Personnage de niveau 1",
    wall: "NOVICE",
    line: "Vous avez survécu à la taverne et pas beaucoup plus. Tout le monde commence quelque part."
  },
  {
    min: 8, max: 12,
    name: "Aventurier du Hellfire",
    wall: "EDDIE",
    line: "Eddie vous aurait laissé jouer un magicien. Avec un peu de méfiance, mais il vous aurait laissé."
  },
  {
    min: 13, max: 17,
    name: "Paladin de Hawkins",
    wall: "HEROS",
    line: "Vous encaissez, vous relancez, vous tenez. C'est exactement ce qu'on demande à un paladin."
  },
  {
    min: 18, max: 19,
    name: "Maître du donjon",
    wall: "MAITRE",
    line: "À ce stade, c'est vous qui écrivez la campagne. Les autres ne font que lancer les dés."
  },
  {
    min: 20, max: 9999,
    name: "Campagne terminée",
    wall: "VECNA",
    line: "Vingt questions, vingt victoires. Même Vecna range son manuel et vous laisse la table."
  }
];

/* Rangs du mode Survie : indexés sur le nombre de questions tenues. */
const SURVIVAL_RANKS = [
  {
    min: 0, max: 2,
    name: "Repas du soir",
    wall: "BARB",
    line: "Le Démogorgon n'a même pas eu besoin de courir. C'est presque vexant pour lui."
  },
  {
    min: 3, max: 5,
    name: "Proie standard",
    wall: "FUITE",
    line: "Vous avez tenu le temps d'un générique. Hawkins ne retiendra pas votre nom."
  },
  {
    min: 6, max: 9,
    name: "Survivant du placard",
    wall: "STEVE",
    line: "Caché, silencieux, vivant. Trois qualités, dans le bon ordre."
  },
  {
    min: 10, max: 14,
    name: "Membre du Hellfire",
    wall: "EDDIE",
    line: "Vous avez joué de la guitare pendant l'attaque. Personne ne vous demandait ça, et pourtant."
  },
  {
    min: 15, max: 19,
    name: "Chasseur de Demodogs",
    wall: "DUSTIN",
    line: "Vous les avez attirés avec de la viande crue et un plan douteux. Ça a marché."
  },
  {
    min: 20, max: 24,
    name: "Shérif de Hawkins",
    wall: "HOPPER",
    line: "Vous avez traversé ça au café et à la mauvaise foi. Personne ne comprend comment."
  },
  {
    min: 25, max: 9999,
    name: "Sujet 011",
    wall: "ELEVEN",
    line: "À ce stade, ce n'est plus de la survie. C'est vous qui les traquez."
  }
];

/* Rangs du mode Enquête : le mur d'alphabet épelle `wall`. */
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
