/* ==================================================================
   Hawkins Quiz — banque anglaise
   Indexée sur l'intitulé français, qui sert de clé stable (le validateur
   garantit son unicité). Une question sans entrée ici n'est simplement
   pas proposée en anglais : rien ne casse, l'offre se réduit.
   Pour les choix multiples, l'ordre DOIT suivre celui du français,
   la bonne réponse restant en première position.
================================================================== */

const QUESTIONS_EN = {
  /* ---------------- Niveau 1 ---------------- */
  "Dans quelle petite ville de l'Indiana tout part en vrille ?": {
    q: "In which small Indiana town does everything go sideways?",
    choices: ["Hawkins", "Derry", "Hill Valley", "Twin Peaks"],
    fact: "Hawkins, Indiana. Population steady, except in November."
  },
  "Quelle marque de gaufres surgelées fait fondre Eleven ?": {
    q: "Which brand of frozen waffles melts Eleven's heart?",
    choices: ["Eggo", "Pop-Tarts", "Toaster Strudel", "Bisquick"],
    fact: "Eggo. On its own, it justifies a second freezer."
  },
  "À quel jeu de rôle les garçons jouent-ils dans le sous-sol de Mike ?": {
    q: "Which role-playing game do the boys play in Mike's basement?",
    choices: ["Dungeons & Dragons", "Risk", "Monopoly", "Cluedo"],
    fact: "Ten hours of campaign, and Will still rolls a seven. Great start."
  },
  "Comment Joyce Byers bricole-t-elle un téléphone vers l'au-delà ?": {
    q: "How does Joyce Byers rig up a telephone to the other side?",
    choices: [
      "An alphabet painted on the wall and Christmas lights",
      "A CB radio and a microwave oven",
      "A Ouija board and a torch",
      "Two walkie-talkies and a lot of tape"
    ],
    fact: "26 letters, 26 bulbs. The broadband of 1983."
  },
  "Quel est le vrai prénom d'Eleven ?": {
    q: "What is Eleven's real first name?",
    choices: ["Jane", "Joyce", "Janet", "Jean"],
    fact: "Jane. But \u201cEleven\u201d fits better on a T-shirt."
  },
  "Qui est le chef de la police de Hawkins ?": {
    q: "Who is Hawkins' chief of police?",
    choices: ["Jim Hopper", "Scott Clarke", "Bob Newby", "Murray Bauman"],
    fact: "Hopper. Diet: coffee, cigarettes and bad faith."
  },
  "Comment les gamins baptisent-ils le monstre de la saison 1 ?": {
    q: "What do the kids name the season 1 monster?",
    choices: ["The Demogorgon", "The Mind Flayer", "Vecna", "The Demodog"],
    fact: "The name comes from their own D&D game: Eleven identified it by placing the monster's figure on the board."
  },
  "Comment s'appelle le fort en bois de Will, au fond des bois ?": {
    q: "What is Will's wooden fort in the woods called?",
    choices: ["Castle Byers", "Fort Hawkins", "The Dungeon", "The King's Hut"],
    fact: "Castle Byers. Three planks, a sheet, and more memories than the whole town."
  },
  "Où Joyce Byers travaille-t-elle au début de la série ?": {
    q: "Where does Joyce Byers work at the start of the series?",
    choices: ["At Melvald's General Store", "At RadioShack", "At the Palace Arcade", "At Benny's"],
    fact: "Melvald's General Store. Mostly she cleaned out the fairy-light aisle."
  },
  "Comment Eleven explique-t-elle aux garçons où se trouve Will ?": {
    q: "How does Eleven explain to the boys where Will is?",
    choices: [
      "By flipping the Dungeons & Dragons board over",
      "By drawing a map in felt-tip",
      "By spelling his name on the wall",
      "By pointing at the forest"
    ],
    fact: "The upturned board. The show's entire mythology fits in that one gesture."
  },
  "Quel restaurant tient Benny, premier adulte gentil de la série ?": {
    q: "Which diner does Benny run, the show's first kind adult?",
    choices: ["Benny's Burgers", "Enzo's", "Surfer Boy Pizza", "Melvald's"],
    fact: "Benny's Burgers. He gave Eleven fries. It did not work out well for him."
  },
  "Comment Eleven se déguise-t-elle pour passer inaperçue au collège ?": {
    q: "How does Eleven disguise herself to slip into the middle school?",
    choices: [
      "A blonde wig and a pink dress",
      "A scout uniform",
      "A cap and a tracksuit",
      "A ghost costume"
    ],
    fact: "Blonde wig and a dress borrowed from Nancy. Nobody noticed, which says a lot about Hawkins."
  },
  "Comment s'appelle le grand frère de Will, photographe à ses heures ?": {
    q: "What is the name of Will's older brother, the part-time photographer?",
    choices: ["Jonathan", "Steve", "Billy", "Lucas"],
    fact: "Jonathan Byers. He photographs everything, including what he shouldn't."
  },
  "D'où débarque Max Mayfield en saison 2 ?": {
    q: "Where does Max Mayfield arrive from in season 2?",
    choices: ["California", "Maine", "Utah", "Chicago"],
    fact: "California. The skateboard and the attitude came with her."
  },
  "Quel lien unit Billy Hargrove et Max Mayfield ?": {
    q: "What is the actual link between Billy Hargrove and Max Mayfield?",
    choices: [
      "Billy's father married Max's mother",
      "They share the same mother",
      "They are first cousins",
      "They grew up as neighbours in California"
    ],
    fact: "Neil Hargrove married Susan Mayfield. No blood tie: Billy is Max's stepbrother, and a catastrophic driver."
  },
  "En quoi les garçons se déguisent-ils pour Halloween en saison 2 ?": {
    q: "What do the boys dress up as for Halloween in season 2?",
    choices: ["Ghostbusters", "Demogorgons", "Cowboys", "Hellfire members"],
    fact: "Four Ghostbusters. They were the only ones in costume. The photo is merciless."
  },
  "Quelle créature géante plane au-dessus de Hawkins en saison 2 ?": {
    q: "Which giant creature looms over Hawkins in season 2?",
    choices: ["The Mind Flayer", "The Demogorgon", "Vecna", "The Demodog"],
    fact: "The Mind Flayer. Another name lifted straight from the D&D bestiary."
  },
  "Où Hopper cache-t-il Eleven pendant presque un an ?": {
    q: "Where does Hopper hide Eleven for almost a year?",
    choices: ["In a cabin deep in the woods", "In the Wheelers' basement", "At the laboratory", "At Joyce's house"],
    fact: "A cabin, three rules and a great many waffles. The rules lasted three episodes."
  },
  "Quelle créature Dustin ramène-t-il chez lui, persuadé que c'est un têtard ?": {
    q: "Which creature does Dustin take home, convinced it's a tadpole?",
    choices: ["D'Artagnan, alias Dart", "Mews", "Yurtle", "Chester"],
    fact: "Dart ate the cat. Dustin kept the name anyway."
  },
  "Quel centre commercial flambant neuf ouvre en saison 3 ?": {
    q: "Which brand-new shopping mall opens in season 3?",
    choices: ["Starcourt Mall", "Hawkins Plaza", "Midway Mall", "Palace Mall"],
    fact: "Starcourt burned down on the night of 4 July 1985. Official toll: thirty dead, and a very convenient version of events."
  },
  "Où Steve Harrington rame-t-il en costume de marin, saison 3 ?": {
    q: "Where does Steve Harrington flounder in a sailor suit in season 3?",
    choices: ["Scoops Ahoy", "Surfer Boy Pizza", "Family Video", "The Palace Arcade"],
    fact: "Scoops Ahoy. Phone numbers collected by the sailor hat: zero."
  },
  "Avec qui Steve travaille-t-il derrière le comptoir de Scoops Ahoy ?": {
    q: "Who works the Scoops Ahoy counter alongside Steve?",
    choices: ["Robin Buckley", "Nancy Wheeler", "Erica Sinclair", "Heather Holloway"],
    fact: "Robin. She keeps a tally of his failures on a board. The board fills up fast."
  },
  "Que cachent les Russes sous le Starcourt Mall ?": {
    q: "What are the Russians hiding under Starcourt Mall?",
    choices: ["A secret base", "A car park", "A cinema", "A Slurpee warehouse"],
    fact: "An entire base. Nobody in Hawkins found the building works suspicious."
  },
  "Comment Erica Sinclair se rend-elle indispensable à l'équipe ?": {
    q: "How does Erica Sinclair make herself indispensable to the team?",
    choices: [
      "She's the only one who fits in the mall's air ducts",
      "She speaks fluent Russian",
      "She hacks the central computer",
      "She drives the truck"
    ],
    fact: "None of the other three fit in the vents. She negotiated free ice cream for life before signing on."
  },
  "Qui est la première victime de Vecna en saison 4 ?": {
    q: "Who is Vecna's first victim in season 4?",
    choices: ["Chrissy Cunningham", "Fred Benson", "Patrick McKinney", "Max Mayfield"],
    fact: "Chrissy Cunningham, head cheerleader. First of the 1986 wave — Henry Creel had already killed in 1959, then in 1979."
  },
  "Où vivent les Byers au début de la saison 4 ?": {
    q: "Where do the Byers live at the start of season 4?",
    choices: ["In Lenora Hills, California", "In Chicago", "In Salt Lake City", "Still in Hawkins"],
    fact: "California. The sunshine helped precisely nothing."
  },
  "Qui accuse publiquement Eddie Munson de diriger une secte ?": {
    q: "Who publicly accuses Eddie Munson of leading a cult?",
    choices: ["Jason Carver", "Sheriff Powell", "Mr Clarke", "Murray Bauman"],
    fact: "Jason Carver, basketball captain and self-appointed prosecutor."
  },
  "Quel objet Max ne quitte plus en saison 4 ?": {
    q: "Which object does Max never put down in season 4?",
    choices: ["Her walkman", "Her skateboard", "Her walkie-talkie", "Her camera"],
    fact: "A walkman and a cassette. The most effective survival kit in the entire show."
  },
  "Épelez le nom de famille de Will, Jonathan et Joyce.": {
    q: "Spell the surname of Will, Jonathan and Joyce.",
    fact: "Byers. The most tried family in Indiana, by a wide margin."
  },
  "Épelez la marque de gaufres qui sert de monnaie d'échange à Eleven.": {
    q: "Spell the waffle brand that serves as Eleven's currency.",
    fact: "Eggo. No other brand has mattered so much in the fight against the supernatural."
  },
  "Épelez le prénom de la petite sœur de Lucas, redoutable négociatrice.": {
    q: "Spell the first name of Lucas' little sister, a fearsome negotiator.",
    fact: "Erica Sinclair. Rate: unlimited ice cream. Non-negotiable."
  },
  "Le Démogorgon doit son nom au manuel de Donjons & Dragons des garçons.": {
    q: "The Demogorgon is named after the boys' Dungeons & Dragons game.",
    fact: "True. The monster from their campaign gave its name to the real one. The game would supply two more: Mind Flayer, then Vecna."
  },
  "Barb est retrouvée vivante à la fin de la saison 1.": {
    q: "Barb is found alive at the end of season 1.",
    fact: "False, to put it mildly. It took until season 2 for anyone to properly care."
  },
  "Quel objet est dessiné ici ?": {
    q: "What object is drawn here?",
    choices: ["A waffle", "A waffle iron", "A manhole cover", "A chessboard"],
    fact: "A waffle. The only foodstuff capable of drawing Eleven out of hiding."
  },
  "Quel appareil le Party utilise-t-il pour rester en contact ?": {
    q: "Which device does the Party use to stay in touch?",
    choices: ["A walkie-talkie", "A calculator", "A radio set", "A metal detector"],
    fact: "The walkie-talkie: the Party's network, with a wildly optimistic stated range."
  },
  "Par quel objet toute l'histoire a-t-elle commencé ?": {
    q: "Which object started the whole story?",
    choices: ["A twenty-sided die", "A diamond", "A football", "A disco ball"],
    fact: "The twenty-sided die. The one Will rolled at the very beginning — and it came up seven."
  }
,
  /* ---------------- Saison 5 ---------------- */
  "En quelle année se déroule la saison 5 ?": {
    q: "In which year is season 5 set?",
    choices: ["1987", "1985", "1986", "1988"],
    fact: "November 1987. Four years, almost to the day, after Will vanished."
  },
  "Dans quel état se trouve Hawkins au début de la saison 5 ?": {
    q: "What state is Hawkins in at the start of season 5?",
    choices: ["Under military quarantine", "Completely evacuated", "Rebuilt and prosperous", "Wiped off the map"],
    fact: "Quarantined since the rifts opened in March 1986. There are more soldiers than residents."
  },
  "Où Steve et Robin travaillent-ils en saison 5 ?": {
    q: "Where do Steve and Robin work in season 5?",
    choices: ["At radio station WSQK", "At Family Video", "At Scoops Ahoy", "At the public library"],
    fact: "\u201cThe Squawk\u201d. Robin broadcasts as Rockin' Robin and slips coded messages into her show."
  },
  "Quelle petite sœur passe au premier plan en saison 5 ?": {
    q: "Which little sister steps into the spotlight in season 5?",
    choices: ["Holly Wheeler", "Erica Sinclair", "Sara Hopper", "Max Mayfield"],
    fact: "Holly, the youngest Wheeler, promoted to the main cast after eight years in the background."
  },
  "Sous quel nom Vecna se fait-il passer auprès de Holly ?": {
    q: "What name does Vecna use with Holly?",
    choices: ["Mr Whatsit", "Mr Nobody", "The Attic Friend", "The Sandman"],
    fact: "An imaginary friend — until Karen works out that this \u201cHenry\u201d is nothing of the sort."
  },
  "Argyle, le livreur de pizzas, revient en saison 5.": {
    q: "Argyle, the pizza delivery guy, returns in season 5.",
    fact: "False: Eduardo Franco does not reprise the role. The Surfer Boy van stays in the garage."
  },
  "Combien d'épisodes compte la saison 5 ?": {
    q: "How many episodes does season 5 have?",
    choices: ["Eight", "Seven", "Nine", "Ten"],
    fact: "Eight, released in three waves: four, then three, then the finale on its own."
  },
  "Qui dirige la Wolf Pack, l'unité lancée aux trousses d'Eleven ?": {
    q: "Who leads the Wolf Pack, the unit hunting Eleven?",
    choices: ["Doctor Kay", "Colonel Sullivan", "Doctor Owens", "Doctor Brenner"],
    fact: "A general and scientist played by Linda Hamilton. She is after Eleven's blood."
  },
  "Comment s'appelle la zone militaire bâtie autour de la faille principale ?": {
    q: "What is the military zone built around the main rift called?",
    choices: ["The MAC-Z", "The Starcourt", "The Creel Sector", "The Weathertop Zone"],
    fact: "Military Access Control Zone, raised where the public library stood. Robin calls it the \u201cBig Mac\u201d on air."
  },
  "Quel personnage absent depuis la saison 2 réapparaît en saison 5 ?": {
    q: "Which character, gone since season 2, returns in season 5?",
    choices: ["Kali, Subject Eight", "Barbara Holland", "Bob Newby", "Billy Hargrove"],
    fact: "Kali Prasad, whose power is illusion, not telekinesis. The Duffers said they were waiting for the right moment."
  },
  "Dans quel état Max se trouve-t-elle au début de la saison 5 ?": {
    q: "What condition is Max in at the start of season 5?",
    choices: ["In a coma", "Gone from Hawkins", "Under military guard", "Long since recovered"],
    fact: "In a coma since March 1986. Lucas visits her and plays her cassettes."
  },
  "Quel écrivain a inspiré le nom de la prison mentale de la saison 5 ?": {
    q: "Which author inspired the name of season 5's mental prison?",
    choices: ["Madeleine L'Engle", "Stephen King", "Ray Bradbury", "Ursula K. Le Guin"],
    fact: "Camazotz comes from \u201cA Wrinkle in Time\u201d. Holly reads the novel, and Holly supplies the name."
  },
  "Épelez le nom de la prison mentale où Max est retenue.": {
    q: "Spell the name of the mental prison where Max is held.",
    fact: "Camazotz: a prison built from Henry Creel's memories. In Maya, the word names a death bat."
  },
  "Qui porte le coup fatal à Vecna, et avec quoi ?": {
    q: "Who deals Vecna the killing blow, and with what?",
    choices: ["Joyce Byers, with an axe", "Eleven, by telekinesis", "Hopper, with a rifle", "Will, by turning his powers back on him"],
    fact: "Eleven impales him, Joyce finishes the job. Nobody in this show has ever underestimated Joyce Byers twice."
  },
  "Que révèle la saison 5 sur la nature du Monde à l'Envers ?": {
    q: "What does season 5 reveal about the nature of the Upside Down?",
    choices: ["It is not a dimension but a wormhole", "It is a collective dream of Vecna's", "It is Hawkins' future", "It is a laboratory simulation"],
    fact: "A passage to the Abyss, the true dimension of origin, held open by a mass of exotic matter."
  },
  "D'où vient réellement le pouvoir de Henry Creel ?": {
    q: "Where does Henry Creel's power actually come from?",
    choices: ["A scarlet stone he found in a mine as a child", "An experiment by Doctor Brenner", "A Demogorgon bite", "He was born with it"],
    fact: "Scouting in Nevada, he opens a wounded spy's briefcase and touches a shard of the Mind Flayer. Everything follows from that."
  },
  "Quelle date tombe au cœur du dénouement de la saison 5 ?": {
    q: "Which date sits at the heart of season 5's climax?",
    choices: ["6 November 1987", "4 July 1987", "31 December 1987", "12 November 1987"],
    fact: "Four years to the day after Will disappeared. The show closes the loop on the exact date it opened it."
  },
  "Que représentent pour Vecna les douze enfants qu'il enlève ?": {
    q: "What do the twelve children Vecna takes represent to him?",
    choices: ["\u201cPerfect vessels\u201d", "Bargaining hostages", "An army of child soldiers", "Test subjects for Doctor Kay"],
    fact: "Twelve children put into a trance to thin the membranes between worlds and, in his words, remake the world."
  },
  "Quel réalisateur est sorti de sa retraite pour signer deux épisodes ?": {
    q: "Which director came out of retirement to direct two episodes?",
    choices: ["Frank Darabont", "Shawn Levy", "John Carpenter", "Sam Raimi"],
    fact: "The director of The Shawshank Redemption takes chapters three and five. He replaced Dan Trachtenberg, who was booked elsewhere."
  },
  "Will Byers fait son coming out devant le groupe en saison 5.": {
    q: "Will Byers comes out to the group in season 5.",
    fact: "True, in chapter seven. The scene earned the episode a coordinated review-bombing campaign."
  },
  "Remettez ces trois moments de la saison 5 dans l'ordre.": {
    q: "Put these three season 5 moments in order.",
    steps: ["Holly disappears from Hawkins", "Max wakes from her coma", "Joyce beheads Vecna"],
    fact: "Chapter two to chapter eight. In between, someone had to go and fetch Max from the depths of Henry Creel's memory."
  },  /* ---------------- Niveau 2 ---------------- */
  "Quel laboratoire a gentiment percé un trou vers une autre dimension ?": {
    q: "Which laboratory politely drilled a hole into another dimension?",
    choices: ["Hawkins National Laboratory", "Black Mesa", "The Creel Institute", "The Weathertop station"],
    fact: "Officially: Department of Energy. Unofficially: \u201cwe're fixing the leak, promise\u201d."
  },
  "Comment s'appelle le club de D&D du lycée en saison 4 ?": {
    q: "What is the high school D&D club called in season 4?",
    choices: ["The Hellfire Club", "The AV Club", "The Party", "The Demogorgon Circle"],
    fact: "Chaired by Eddie Munson. The town decided it was a satanic cult. The town was wrong."
  },
  "Quelle chanson de Kate Bush devient un gilet de sauvetage en saison 4 ?": {
    q: "Which Kate Bush song becomes a life jacket in season 4?",
    choices: ["Running Up That Hill", "Wuthering Heights", "Cloudbusting", "Babooshka"],
    fact: "A well-charged walkman saves more lives than a shotgun."
  },
  "Comment s'appelle le « Papa » d'Eleven au laboratoire ?": {
    q: "What is the name of Eleven's \u201cPapa\u201d at the lab?",
    choices: ["Dr Martin Brenner", "Dr Sam Owens", "Dr Henry Creel", "Dr Alexei Petrov"],
    fact: "On the scale of father figures, somewhere below \u201cHopper on a drinking night\u201d."
  },
  "Quel est le nom de la radio géante que Dustin construit pour capter les Russes ?": {
    q: "What is the giant radio Dustin builds to pick up the Russians called?",
    choices: ["Cerebro", "Bumblebee", "Heathkit", "The Mind Flayer"],
    fact: "Set up on Weathertop hill. Two geek references for a single gadget."
  },
  "Qui est Suzie ?": {
    q: "Who is Suzie?",
    choices: ["Dustin's girlfriend, in Utah", "Robin's sister", "A Russian scientist", "The English teacher at Hawkins High"],
    fact: "Long-distance relationship, ham radio and absolutely catastrophic timing."
  },
  "Quel Russe très sympathique se prend d'amour pour les Slurpee à la cerise ?": {
    q: "Which extremely likeable Russian falls for cherry Slurpees?",
    choices: ["Alexei", "Yuri", "Grigori", "Dmitri"],
    fact: "He only wanted to keep his fairground plush toy. This show forgives nothing."
  },
  "Qui est la disparue que tout le monde oublie en saison 1 ?": {
    q: "Who is the missing girl everyone forgets in season 1?",
    choices: ["Barbara Holland", "Chrissy Cunningham", "Heather Holloway", "Nancy Wheeler"],
    fact: "Justice for Barb. Still pending."
  },
  "Dans quelle salle d'arcade MADMAX pulvérise-t-il le record de Dig Dug ?": {
    q: "In which arcade does MADMAX smash the Dig Dug record?",
    choices: ["The Palace Arcade", "The Starcourt Arcade", "The Hawkins Fun Center", "Surfer Boy"],
    fact: "Dustin demanded a recount. Dustin lost."
  },
  "Quel programme gouvernemental a servi de terrain de jeu au Dr Brenner ?": {
    q: "Which government programme served as Dr Brenner's playground?",
    choices: ["MKUltra", "The Manhattan Project", "Blue Book", "Stargate"],
    fact: "MKUltra. The one acronym in the show that unfortunately exists for real."
  },
  "Comment s'appelle la mère biologique d'Eleven ?": {
    q: "What is the name of Eleven's biological mother?",
    choices: ["Terry Ives", "Becky Ives", "Karen Wheeler", "Joyce Byers"],
    fact: "Terry Ives. After the electroshocks she repeats six fragments on a loop. It took years to realise it was a message."
  },
  "Comment les garçons improvisent-ils un caisson d'isolation sensorielle ?": {
    q: "How do the boys improvise a sensory deprivation tank?",
    choices: [
      "A paddling pool set up in the middle school, filled with road salt",
      "The public pool and bags of table salt",
      "The Byers' bathtub and a lot of ice",
      "The tank salvaged from the laboratory"
    ],
    fact: "They picked the middle school for its stock of road salt. Mr Clarke gave them the recipe over the phone, on a Saturday night, without asking a single question."
  },
  "Quel médecin remplace Brenner à la tête du laboratoire en saison 2 ?": {
    q: "Which doctor replaces Brenner at the head of the lab in season 2?",
    choices: ["Dr Sam Owens", "Dr Martin Brenner", "Dr Alexei", "Dr Victor Creel"],
    fact: "Owens. Considerably nicer, which was not a high bar."
  },
  "Qui est Kali, la femme qu'Eleven retrouve à Chicago ?": {
    q: "Who is Kali, the woman Eleven finds in Chicago?",
    choices: ["Subject Eight", "Her half-sister", "A scientist on the run", "A friend of Terry's"],
    fact: "Eight. She makes illusions, including the illusion of a workable plan."
  },
  "Qu'est-ce qui pourrit dans les champs de citrouilles autour de Hawkins ?": {
    q: "What is rotting in the pumpkin fields around Hawkins?",
    choices: ["The whole crop, poisoned from the tunnels", "Nothing, it's a rumour", "Only the Byers' field", "The potatoes, not the pumpkins"],
    fact: "Farmer Merrill accuses his neighbour Eugene of poisoning him. Hopper isn't buying it: the rot radiates out from the laboratory."
  },
  "Comment Robin perce-t-elle le code du message russe ?": {
    q: "How does Robin crack the Russian message?",
    choices: ["She speaks four languages and decodes it by ear", "She has an uncle who is a translator", "She uses the lab's computer", "She asks Murray"],
    fact: "Four languages, she says: Spanish, French, Italian... and pig latin. Russian is not among them, which did not stop her decoding the lot."
  },
  "Comment les gamins tentent-ils de neutraliser Billy, possédé, en saison 3 ?": {
    q: "How do the kids try to neutralise a possessed Billy in season 3?",
    choices: ["By locking him in the sauna", "By knocking him out with a bat", "By luring him to the lab", "By calling the police"],
    fact: "The sauna. Heat against the Mind Flayer: their best idea of the season."
  },
  "Où Hopper est-il retenu prisonnier au début de la saison 4 ?": {
    q: "Where is Hopper held prisoner at the start of season 4?",
    choices: ["In Kamchatka, Russia", "In the Hawkins laboratory", "In Alaska", "In the Upside Down"],
    fact: "A gulag, a sledgehammer, and a Demogorgon in the pit. The ideal holiday."
  },
  "Quelle maison de Hawkins est au cœur du mystère de la saison 4 ?": {
    q: "Which Hawkins house sits at the heart of the season 4 mystery?",
    choices: ["The Creel house", "The Wheeler house", "The Byers house", "The Harrington house"],
    fact: "The Creel house. The kind of property no estate agent can shift."
  },
  "Qui est Victor Creel et où le trouve-t-on ?": {
    q: "Who is Victor Creel and where is he found?",
    choices: ["Henry's father, committed to Pennhurst Asylum", "A scientist at the Hawkins lab", "The mayor of Hawkins", "A former colleague of Brenner's"],
    fact: "Committed since 1959 for a crime he did not commit. Nobody listened to him either."
  },
  "Dans quel parc de mobil-homes vit Eddie Munson ?": {
    q: "In which trailer park does Eddie Munson live?",
    choices: ["Forest Hills", "Lover's Lake", "Starcourt", "Roane Hills"],
    fact: "Forest Hills Trailer Park. Uncle Wayne's trailer, and a ceiling in very poor condition."
  },
  "Épelez le nom de famille du chef de la police de Hawkins.": {
    q: "Spell the surname of Hawkins' chief of police.",
    fact: "Hopper. Six letters, a lot of shoulders, and zero aptitude for conversation."
  },
  "Robin Buckley parle couramment le russe.": {
    q: "Robin Buckley speaks fluent Russian.",
    fact: "False. She claims four languages — Spanish, French, Italian and pig latin — but not Russian. She decoded the whole thing by ear."
  },
  "Eleven est la fille biologique de Jim Hopper.": {
    q: "Eleven is Jim Hopper's biological daughter.",
    fact: "False: her mother is Terry Ives. Hopper will adopt her officially, which takes nothing away from it."
  },
  "Trois de ces personnes ont travaillé pour le laboratoire de Hawkins. Qui est l'intrus ?": {
    q: "Three of these people worked for the Hawkins laboratory. Who is the odd one out?",
    choices: ["Bob Newby", "Martin Brenner", "Sam Owens", "Connie Frazier"],
    fact: "Bob sold radios at RadioShack. The other three were on the lab's books, each in their own way."
  },
  "Trois de ces lieux se trouvent à Hawkins. Lequel est l'intrus ?": {
    q: "Three of these places are in Hawkins. Which is the odd one out?",
    choices: ["Lenora Hills", "Lover's Lake", "Forest Hills", "Starcourt Mall"],
    fact: "Lenora Hills is in California: that's where the Byers tried to start a normal life again."
  },
  "Remettez ces trois moments de la saison 3 dans l'ordre.": {
    q: "Put these three season 3 moments in order.",
    steps: ["Billy hits the creature at the steelworks", "Heather is taken at the pool", "Starcourt Mall goes up in flames"],
    fact: "Billy is flayed first, he takes Heather the very next day, and it all ends in the fire of 4 July."
  },
  "Sur quel engin le Party traverse-t-il Hawkins ?": {
    q: "On what does the Party cross Hawkins?",
    choices: ["A bicycle", "A pair of goggles", "A cart", "A wheelbarrow"],
    fact: "The bike: the Party's only transport until Steve agreed to play chauffeur."
  },
  "Épelez le nom du centre commercial qui a duré un été.": {
    q: "Spell the name of the mall that lasted one summer.",
    fact: "Starcourt. Nine letters and a considerable insurance claim."
  },
  "Épelez le nom du club de jeu de rôle d'Eddie Munson.": {
    q: "Spell the name of Eddie Munson's role-playing club.",
    fact: "Hellfire. A name chosen to provoke. Objective met well beyond expectations."
  },
  "Combien de règles Hopper impose-t-il à Eleven dans la cabane ?": {
    q: "How many rules does Hopper impose on Eleven in the cabin?",
    choices: ["Three", "Just one", "Five", "Ten"],
    fact: "Three. Curtains always drawn, door locked, and no going outside. Eleven broke all three the same evening."
  },
  "Quel est le vrai métier de Murray Bauman avant la théorie du complot ?": {
    q: "What was Murray Bauman's actual job before the conspiracy theories?",
    choices: ["Investigative journalist", "FBI agent", "Russian teacher", "Plumber"],
    fact: "Journalist, then conspiracy theorist, then... best detective in the show, in fact."
  },
  "Quel surnom Dustin donne-t-il au monstre de la saison 4 ?": {
    q: "What nickname does Dustin give the season 4 monster?",
    choices: ["Vecna", "The Mind Flayer", "The Demogorgon", "Henry"],
    fact: "Vecna, from D&D again. At this point the rulebook should be treated as evidence."
  },
  "Qui sont Callahan et Powell ?": {
    q: "Who are Callahan and Powell?",
    choices: ["Hopper's deputies", "Two lab agents", "Barb's parents", "Two teachers"],
    fact: "The two deputies. Their contribution to the investigation fits inside a doughnut."
  },
  "Qui aide Hopper à s'évader depuis l'intérieur de la prison russe ?": {
    q: "Who helps Hopper escape from inside the Russian prison?",
    choices: ["Dmitri, alias Enzo", "Yuri", "Grigori", "Alexei"],
    fact: "Dmitri. The code name \u201cEnzo\u201d came from the restaurant of a date that never happened."
  },
  "Qui tient le comptoir du Palace Arcade et monnaie chaque information ?": {
    q: "Who works the Palace Arcade counter and puts a price on every piece of information?",
    choices: ["Keith", "Murray", "Billy", "Steve"],
    fact: "Keith, a plain employee. His rate: a date with Nancy Wheeler. Mike refused flat out; Dustin and Lucas were ready to sign."
  },  /* ---------------- Niveau 3 ---------------- */
  "Sous quel nom Vecna est-il né ?": {
    q: "Under what name was Vecna born?",
    choices: ["Henry Creel", "Peter Ballard", "Victor Creel", "Martin Brenner"],
    fact: "Henry Creel, who became One, who became Vecna — a name supplied by Dustin, forever quick on the bestiary."
  },
  "Quel objet obsédant annonce la mort des victimes de Vecna ?": {
    q: "Which haunting object announces the death of Vecna's victims?",
    choices: ["A grandfather clock", "A broken mirror", "A music box", "A radio set"],
    fact: "Four chimes. If you hear them, get the walkman out. Fast."
  },
  "Quel est le métier de Bob Newby, héros de Hawkins ?": {
    q: "What is the job of Bob Newby, hero of Hawkins?",
    choices: ["RadioShack salesman", "Science teacher", "Firefighter", "Journalist"],
    fact: "Bob \u201cthe Brain\u201d, store manager. The only one who knew BASIC, he went down to restore power and unlock the doors. The Demodogs caught him in the lobby, two steps from the exit."
  },
  "Quel professeur de sciences fournit aimants, conseils et métaphores douteuses ?": {
    q: "Which science teacher supplies magnets, advice and dubious metaphors?",
    choices: ["Mr Clarke", "Mr Hauser", "Mr Wheeler", "Mr Munson"],
    fact: "Scott Clarke: the only adult in Hawkins who actually answers questions."
  },
  "Comment s'appelle la chatte que Dart dévore chez Dustin ?": {
    q: "What is the name of the cat Dart devours at Dustin's house?",
    choices: ["Mews", "Yurtle", "Mittens", "Tews"],
    fact: "Mews, Claudia Henderson's beloved cat. Dustin buried her in the garden and sent his mother looking for her across the neighbourhood."
  },
  "Dans quelle pizzeria travaille Argyle en saison 4 ?": {
    q: "At which pizza place does Argyle work in season 4?",
    choices: ["Surfer Boy Pizza", "Benny's Burgers", "Enzo's", "Scoops Ahoy"],
    fact: "A van, pineapple, and a level of serenity never before reached in this show."
  },
  "En quel mois et quelle année Will Byers disparaît-il ?": {
    q: "In which month and year does Will Byers disappear?",
    choices: ["November 1983", "October 1984", "July 1985", "March 1986"],
    fact: "6 November 1983. He was cycling home from a D&D session. Never ride home alone."
  },
  "Comment s'appelle le bal qui clôt la saison 2 ?": {
    q: "What is the dance that closes season 2 called?",
    choices: ["The Snow Ball", "The Spring Fling", "The Hellfire Ball", "The Winter Formal"],
    fact: "December 1984. The most consequential slow dance in television history."
  },
  "Que finit par donner Suzie à Dustin pour sauver le monde ?": {
    q: "What does Suzie finally give Dustin to save the world?",
    choices: ["Planck's constant", "The lab door code", "The Russians' radio frequency", "Her ski suit"],
    fact: "But only after an entire song. The world waited. The world was right to."
  },
  "À quelle date le Monde à l'Envers est-il figé ?": {
    q: "At what date is the Upside Down frozen?",
    choices: ["6 November 1983, the day Will vanished", "4 July 1985, the day of Starcourt", "1 January 1986", "No date at all: it has no time"],
    fact: "Everything froze there the instant Will disappeared. The show's most elegant reveal."
  },
  "Comment s'appelle le lac où s'ouvre une faille en saison 4 ?": {
    q: "What is the lake where a rift opens in season 4 called?",
    choices: ["Lover's Lake", "Lake Michigan", "Creel Lake", "Hawkins Lake"],
    fact: "Lover's Lake. The kids nicknamed the rift \u201cWatergate\u201d. They were very proud."
  },
  "Quel est le nom de l'installation où Eleven retrouve ses pouvoirs en saison 4 ?": {
    q: "What is the facility where Eleven regains her powers in season 4 called?",
    choices: ["Project NINA", "Project MKUltra", "The Creel laboratory", "Cerebro station"],
    fact: "An isolation tank at the bottom of a former Nevada missile silo, and Brenner back again. Nothing ever goes well with Brenner."
  },
  "Quel tueur russe poursuit Hopper et Joyce dans tout Hawkins ?": {
    q: "Which Russian killer chases Hopper and Joyce across Hawkins?",
    choices: ["Grigori", "Alexei", "Dmitri", "Yuri"],
    fact: "Grigori. It is Mayor Kline who calls him \u201cArnold Schwarzenegger\u201d — the resemblance to the T-800 is entirely intentional."
  },
  "Quel métier exerce Heather Holloway en saison 3 ?": {
    q: "What job does Heather Holloway have in season 3?",
    choices: ["Lifeguard at the public pool", "Shop assistant at Starcourt Mall", "Waitress at Enzo's", "Reporter at the Hawkins Post"],
    fact: "Lifeguard, and Billy's colleague — he takes her the day after his own flaying. Her father runs the Hawkins Post."
  },
  "Comment les gamins détournent-ils les Demodogs du laboratoire ?": {
    q: "How do the kids draw the Demodogs away from the laboratory?",
    choices: ["By torching the tunnel hub with petrol", "By baiting them with raw meat", "By broadcasting a radio signal", "By spreading salt in the tunnels"],
    fact: "The raw meat, tried at the junkyard a few episodes earlier, had failed miserably: Dart prefers his prey alive. That left petrol."
  },
  "Comment Nancy et Jonathan préparent-ils leur piège au Démogorgon ?": {
    q: "How do Nancy and Jonathan set their trap for the Demogorgon?",
    choices: ["A bear trap, petrol and a great deal of recklessness", "An electrified cage", "A net and a spiked bat", "A homemade bomb"],
    fact: "They bought the arsenal from a gun shop without a single question being asked. 1983, basically."
  },
  "Quel morceau Eddie Munson joue-t-il depuis le Monde à l'Envers ?": {
    q: "Which track does Eddie Munson play from the Upside Down?",
    choices: ["Master of Puppets", "Enter Sandman", "Paranoid", "Ace of Spades"],
    fact: "The most expensive solo in the history of amateur rock. And the most deserved."
  },
  "Quel contrebandier russe accepte de l'argent, puis change d'avis ?": {
    q: "Which Russian smuggler takes the money, then changes his mind?",
    choices: ["Yuri Ismaylov", "Dmitri", "Grigori", "Alexei"],
    fact: "Yuri, pilot and peanut butter salesman. A career path that is hard to follow."
  },
  "Qui est Connie Frazier ?": {
    q: "Who is Connie Frazier?",
    choices: ["The undercover lab agent who shoots Benny", "A lab nurse", "Barb's mother", "A Hawkins journalist"],
    fact: "Fake social services, real firearm. The show showed its hand in episode 2."
  },
  "Qui est Becky Ives ?": {
    q: "Who is Becky Ives?",
    choices: ["Terry's sister", "Barb's mother", "A lab nurse", "Max's aunt"],
    fact: "Becky, who has cared for Terry for years in a house full of silence."
  },
  "Quel film les personnages regardent-ils dans le cinéma du Starcourt ?": {
    q: "Which film do the characters watch in the Starcourt cinema?",
    choices: ["Back to the Future", "Day of the Dead", "The Goonies", "E.T."],
    fact: "Dustin hides everyone in a packed preview screening to shake off the Russians. Day of the Dead is only a poster in the lobby."
  },
  "Quelle équipe de basket Jason Carver mène-t-il en finale ?": {
    q: "Which basketball team does Jason Carver lead to the final?",
    choices: ["The Hawkins Tigers", "The Demogorgons", "The Wildcats", "The Bulldogs"],
    fact: "The Hawkins Tigers. The game and Eddie's concert play out at exactly the same time."
  },
  "Comment Eleven montre-t-elle ses pouvoirs aux garçons pour la première fois ?": {
    q: "How does Eleven first show the boys her powers?",
    choices: ["She slams the bedroom door from across the room", "She crushes a can with her mind", "She levitates the Millennium Falcon", "She lights up the Christmas lights"],
    fact: "Lucas wanted to go and tell Karen Wheeler: the door shut on its own, and Eleven's nose was bleeding. The famous crushed can is only a memory from the lab."
  },
  "Quel est le nom de la tortue de Dustin ?": {
    q: "What is the name of Dustin's tortoise?",
    choices: ["Yurtle", "Mews", "Dart", "Chester"],
    fact: "Yurtle, with a U — a nod to the Dr. Seuss turtle. Evicted from his terrarium to house Dart, he fared far better than the cat."
  },
  "Quel est le prénom de la plus jeune des Wheeler ?": {
    q: "What is the first name of the youngest Wheeler?",
    choices: ["Holly", "Karen", "Erica", "Sara"],
    fact: "Holly. She saw the fairy lights come alive at the Byers house, then a shape pushing through the wall. Nobody believed her."
  },
  "Que gagne Alexei à la fête foraine juste avant la fin ?": {
    q: "What does Alexei win at the fair just before the end?",
    choices: ["A Woody Woodpecker plush toy", "A goldfish", "A balloon", "A cap"],
    fact: "He popped every balloon without missing one, then ran to show Murray his prize, shouting that it wasn't rigged. Grigori shot him a second later."
  },
  "Épelez le nom de famille de Vecna, celui de sa naissance.": {
    q: "Spell Vecna's surname, the one he was born with.",
    fact: "Creel. A surname, a house, and sixty years of misunderstanding."
  },
  "Le Monde à l'Envers est figé au jour de la disparition de Will Byers.": {
    q: "The Upside Down is frozen on the day Will Byers disappeared.",
    fact: "True. Nancy finds out by opening her diary: the page is still on 6 November 1983."
  },
  "Alexei a triché pour gagner sa peluche à la fête foraine.": {
    q: "Alexei cheated to win his plush toy at the fair.",
    fact: "False, and that's the whole point of the scene: he popped every balloon without missing one, then ran to tell Murray it wasn't rigged."
  },
  "Trois de ces personnages sont russes. Lequel est l'intrus ?": {
    q: "Three of these characters are Russian. Which is the odd one out?",
    choices: ["Murray Bauman", "Alexei", "Grigori", "Dmitri"],
    fact: "Murray is American. He speaks Russian, which is not quite the same thing — and which has saved his skin more than once."
  },
  "Remettez ces trois moments de la saison 1 dans l'ordre.": {
    q: "Put these three season 1 moments in order.",
    steps: ["Will disappears on the way home", "Joyce paints the alphabet on the living room wall", "The boys fill a paddling pool with salt"],
    fact: "From 6 to 12 November 1983. Six days during which nobody slept, starting with Joyce."
  },
  "Remettez ces trois moments de la série dans l'ordre.": {
    q: "Put these three moments from the series in order.",
    steps: ["The Snow Ball dance", "The Starcourt Mall fire", "Vecna's first victim"],
    fact: "December 1984, July 1985, March 1986. Hawkins never got more than eighteen months of peace."
  },
  "Quel objet a arraché Max aux griffes de Vecna ?": {
    q: "Which object tore Max from Vecna's grasp?",
    choices: ["A cassette walkman", "A video recorder", "A camera", "A toaster"],
    fact: "Max's walkman. The most effective survival kit ever deployed against Vecna."
  },
  "Épelez le prénom du Russe amateur de Slurpee à la cerise.": {
    q: "Spell the first name of the Russian with a taste for cherry Slurpees.",
    fact: "Alexei. The most endearing character ever to last six episodes."
  },
  "Épelez le nom de la salle d'arcade de Hawkins.": {
    q: "Spell the name of the Hawkins arcade.",
    fact: "The Palace Arcade. Keith works the counter, and puts a price on every piece of information."
  },
  "Épelez le prénom de la petite amie de Dustin, quelque part dans l'Utah.": {
    q: "Spell the first name of Dustin's girlfriend, somewhere in Utah.",
    fact: "Suzie. She really does exist. Nobody believed it, and you can see why."
  }
};
/* Exposé explicitement : un const de portée script n'atterrit pas sur window. */
window.QUESTIONS_EN = QUESTIONS_EN;

