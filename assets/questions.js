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
    fact: "Nom emprunté à leur manuel de D&D. Le branding avant la survie."
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
    q: "Qui est Billy Hargrove pour Max ?",
    choices: ["Son demi-frère", "Son cousin", "Son voisin", "Son petit ami"],
    fact: "Demi-frère, conducteur catastrophique et problème à lui tout seul."
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
    fact: "Ouvert en juin, fermé en juillet. Un record difficile à battre."
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
    q: "Comment Erica Sinclair se rend-elle indispensable dans la base russe ?",
    choices: [
      "Elle est la seule à passer dans les conduits",
      "Elle parle russe couramment",
      "Elle pirate l'ordinateur central",
      "Elle conduit le camion"
    ],
    fact: "La seule assez petite pour passer, et la seule à avoir négocié un salaire."
  },
  {
    level: 1, s: 4,
    q: "Qui est la première victime de Vecna en saison 4 ?",
    choices: ["Chrissy Cunningham", "Fred Benson", "Patrick McKinney", "Max Mayfield"],
    fact: "Chrissy. La série ne prend jamais de gants pour son premier épisode."
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
    fact: "Terry Ives. Elle a passé des années à répéter les mêmes quatre mots. Personne n'écoutait."
  },
  {
    level: 2, s: 1,
    q: "Comment les garçons improvisent-ils un caisson d'isolation sensorielle ?",
    choices: [
      "Avec la piscine de l'école et beaucoup de sel",
      "Avec une baignoire et des glaçons",
      "Avec le réservoir du labo",
      "Avec le lac Lover's Lake"
    ],
    fact: "Trois tonnes de sel empruntées à la ville. M. Clarke n'a jamais posé de questions."
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
      "Toute la récolte, à cause des tunnels",
      "Rien, c'est une rumeur",
      "Seulement le champ des Byers",
      "Les pommes de terre, pas les citrouilles"
    ],
    fact: "Les tunnels sous la ville empoisonnent tout. Le fermier accuse les engrais."
  },
  {
    level: 2, s: 3,
    q: "Comment Robin perce-t-elle le code du message russe ?",
    choices: [
      "Elle parle quatre langues et travaille au comptoir",
      "Elle a un oncle traducteur",
      "Elle utilise l'ordinateur du labo",
      "Elle demande à Murray"
    ],
    fact: "Quatre langues, un job d'été et zéro reconnaissance. L'histoire de sa vie."
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
    fact: "Trois. Portes verrouillées, rideaux tirés, et sortie interdite. Score de respect : zéro sur trois."
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
    q: "Qui règne sur le Palace Arcade et monnaie chaque information ?",
    choices: ["Keith", "Murray", "Billy", "Steve"],
    fact: "Keith. Son tarif : une présentation à Nancy Wheeler. Dustin a accepté sans réfléchir."
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
    fact: "Bob « the Brain ». Il a résolu le labyrinthe ET tenu la porte. On ne s'en remet pas."
  },
  {
    level: 3, s: 1,
    q: "Quel professeur de sciences fournit aimants, conseils et métaphores douteuses ?",
    choices: ["M. Clarke", "M. Hauser", "M. Wheeler", "M. Munson"],
    fact: "Scott Clarke : le seul adulte de Hawkins qui réponde vraiment aux questions."
  },
  {
    level: 3, s: 2,
    q: "Quel est le nom du chat des Byers ?",
    choices: ["Mews", "Yertle", "Mittens", "Dart"],
    fact: "Disparu en service, digéré par un « têtard ». Repose en paix."
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
    fact: "Un caisson, des souvenirs, et Brenner de retour. Rien ne se passe jamais bien avec Brenner."
  },
  {
    level: 3, s: 3,
    q: "Quel tueur russe poursuit Hopper et Joyce dans tout Hawkins ?",
    choices: ["Grigori", "Alexei", "Dmitri", "Yuri"],
    fact: "Grigori. Surnommé « le Terminator » par Murray, qui n'avait pas tort."
  },
  {
    level: 3, s: 3,
    q: "Quelle employée du centre commercial est la première « écorchée » de la saison 3 ?",
    choices: ["Heather Holloway", "Robin Buckley", "Karen Wheeler", "Chrissy Cunningham"],
    fact: "Heather, maître-nageuse. Le Mind Flayer recrute avant tout le monde."
  },
  {
    level: 3, s: 2,
    q: "Comment les gamins attirent-ils les Demodogs hors des tunnels ?",
    choices: ["Avec de la viande crue", "Avec des feux d'artifice", "Avec une radio", "Avec du sel"],
    fact: "De la viande crue et un bidon d'essence. Le plan a fonctionné, ce qui reste une surprise."
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
    q: "Quel film les gamins vont-ils voir au cinéma du Starcourt ?",
    choices: ["Le Jour des morts-vivants", "Retour vers le futur", "Les Goonies", "E.T."],
    fact: "Ils y vont surtout pour l'air conditionné. Et pour espionner des Russes."
  },
  {
    level: 3, s: 4,
    q: "Quelle équipe de basket Jason Carver mène-t-il en finale ?",
    choices: ["Les Tigers de Hawkins", "Les Demogorgons", "Les Wildcats", "Les Bulldogs"],
    fact: "Les Hawkins Tigers. Le match et le concert d'Eddie se jouent exactement en même temps."
  },
  {
    level: 3, s: 1,
    q: "Comment Eleven prouve-t-elle ses pouvoirs à Mike et Dustin la première fois ?",
    choices: [
      "Elle écrase une canette par la pensée",
      "Elle allume les guirlandes",
      "Elle soulève la table",
      "Elle arrête une horloge"
    ],
    fact: "Une canette écrasée, deux gamins convaincus. Le meilleur pitch de recrutement de la série."
  },
  {
    level: 3, s: 2,
    q: "Quel est le nom de la tortue de Dustin ?",
    choices: ["Yertle", "Mews", "Dart", "Chester"],
    fact: "Yertle. Elle n'a rien demandé et s'en est sortie mieux que le chat."
  },
  {
    level: 3, s: 1,
    q: "Quel est le prénom de la plus jeune des Wheeler ?",
    choices: ["Holly", "Karen", "Erica", "Sara"],
    fact: "Holly. Elle a vu les guirlandes bouger avant tout le monde, et personne ne l'a crue."
  },
  {
    level: 3, s: 3,
    q: "Que gagne Alexei à la fête foraine juste avant la fin ?",
    choices: ["Une peluche de Woody Woodpecker", "Un poisson rouge", "Un ballon", "Une casquette"],
    fact: "Il a triché au jeu, gagné sa peluche, puis... la série a fait ce qu'elle fait toujours."
  },
  {
    level: 3, s: 1, type: "spell",
    q: "Épelez le nom de famille de Vecna, celui de sa naissance.",
    answer: "CREEL",
    fact: "Creel. Un nom de famille, une maison, et soixante ans de malentendu."
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
    fact: "Le Palace Arcade. Keith y règne, et il monnaie chaque information."
  },
  {
    level: 3, s: 3, type: "spell",
    q: "Épelez le prénom de la petite amie de Dustin, quelque part dans l'Utah.",
    answer: "SUZIE",
    fact: "Suzie. Elle existe vraiment. Personne n'y croyait, et on la comprend un peu."
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
