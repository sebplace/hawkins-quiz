/* ==================================================================
   Hawkins Quiz — internationalisation
   Le français est la langue source : les clés SONT les chaînes
   françaises. Toute chaîne non traduite retombe donc naturellement
   sur le français plutôt que d'afficher une clé technique.
   Chargé avant app.js, exposé sous window.HQ_I18N.
================================================================== */
(() => {
  "use strict";

  /* Textes statiques de la page, repérés par sélecteur CSS. */
  const UI = {
    "html@lang": "en",
    "title": "Hawkins Quiz — Test your fan credentials",
    'meta[name="description"]@content':
      "Twelve questions, three dimensions and a Demogorgon counting the seconds. Test your Stranger Things knowledge. Unofficial fan project.",

    ".brand__kicker": "The unofficial fan test",
    ".brand__tag": "Twelve questions. Three dimensions. A Demogorgon counting the seconds.",
    "#wallCaption": "Joyce left a message.",
    "#udLabel": "Upside Down mode",
    "#startLabel": "Enter the basement",
    "#soundLabel": "Sound: off",
    "#btnStats": "Statistics",
    ".seasons__label": "Seasons",

    "#modeEnquete b": "Investigation",
    "#modeEnquete span": "12 questions, 3 dimensions",
    "#modeSurvie b": "Survival",
    "#modeSurvie span": "Until your first mistake",
    "#modeDefi span": "The same 12 questions for everyone",
    "#modeDuel b": "Local duel",
    "#modeDuel span": "Two players, one device, taking turns",
    "#modeCampagne b": "Campaign",
    "#modeCampagne span": "20 hit points, one twenty-sided die, no mercy",

    ".only-enquete.only-normal:nth-of-type(2)": null,

    "#relay .relay__kicker": "Pass the device",
    "#relayGo": "I'm ready",

    ".hunt": null,
    "#btnNext": "Next",
    ".spell__hint": null,
    "#spellBack": "Clear",
    "#chronoBack": "Clear",
    ".chrono__hint": null,

    "#joker5050 .joker__lbl": null,
    ".result__kicker": "Transmission complete",
    "#btnReplay": "Play again",
    "#btnShare": "Copy my score",
    "#btnCard": "Share card",
    ".initials__title": "You're on the leaderboard",
    ".initials__hint": "Tap three letters on the wall above.",
    "#iniBack": "Clear",
    "#iniOk": "Carve it",
    "#statsTitle": "Your statistics",
    "#btnStatsBack": "Back",
    "#btnWipe": "Erase my data",

    ".foot p:first-child":
      "Unofficial fan project, with no affiliation to Netflix or the creators of the series. No audiovisual content from the show is used: everything here is drawn in CSS and synthesised in Web Audio.",
    ".foot a": "Source code"
  };

  /* Blocs à remplacer en HTML (listes de règles, libellés composés). */
  const HTML = {
    ".rules": `
      <li class="only-enquete"><b>12 questions</b> drawn from <span id="bankSize">129</span>, never repeating</li>
      <li class="only-enquete only-normal">The scenery darkens as you go&nbsp;: Hawkins → the lab → <i>the Upside Down</i></li>
      <li class="only-enquete only-normal">The clock shortens with every dimension. Zero seconds = zero waffles</li>
      <li class="only-enquete only-ud">Three strata, <b>no way out</b>&nbsp;: drowned Hawkins → the dead lab → his place</li>
      <li class="only-enquete only-ud">Clock halved&nbsp;: <b>15s, 12s, 10s</b>. Questions arrive mirrored</li>
      <li class="only-survie"><b>One mistake</b> and the hunt is over. No second chance</li>
      <li class="only-survie">The clock loses half a second every question. It never goes back up</li>
      <li class="only-defi"><b>The same 12 questions for everyone</b>, drawn from today's date</li>
      <li class="only-defi">One attempt only. The season filter doesn't apply&nbsp;: everyone plays the same deck</li>
      <li class="only-duel"><b>Six questions each</b>, alternating. The device changes hands</li>
      <li class="only-duel">No lifelines: even odds, or no duel at all</li>
      <li class="only-campagne"><b>20 hit points.</b> A mistake costs 4, 6 or 8 depending on the level</li>
      <li class="only-campagne">A <b>twenty-sided die</b> is rolled before each question. A 20 removes two answers, a 1 halves the clock</li>
      <li class="only-campagne">The campaign ends at zero hit points. Twenty questions survived and you walked out alive</li>
      <li class="only-keys">Keyboard&nbsp;: keys <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> <kbd>4</kbd></li>
      <li class="rules__hint">They say the wall answers, if you talk to it.</li>
      <li class="rules__hint">The bank covers all five seasons&nbsp;: untick S5 to avoid spoilers.</li>`,

    "#jokers": `
      <button class="joker" id="joker5050" type="button">
        <span class="joker__ico">½</span>
        <span class="joker__lbl">Steve's bat<i>Two answers removed</i></span>
      </button>
      <button class="joker" id="jokerTime" type="button">
        <span class="joker__ico">‖</span>
        <span class="joker__lbl">Max's walkman<i>The clock freezes</i></span>
      </button>
      <button class="joker" id="jokerAv" type="button">
        <span class="joker__ico">AV</span>
        <span class="joker__lbl">Cerebro radio<i>Ask the AV Club</i></span>
      </button>`,

    "#spell .spell__hint": `
      Spell the answer on the wall, or type it.
      <button class="spell__back" id="spellBack" type="button">Clear</button>`,

    "#chrono .chrono__hint": `
      Tap the three moments from oldest to most recent.
      <button class="spell__back" id="chronoBack" type="button">Clear</button>`
  };

  /* Chaînes produites par le script. La clé est la version française. */
  const S = {
    /* Modes et bandeau */
    "Entrer dans le sous-sol": "Enter the basement",
    "Lancer la chasse": "Start the hunt",
    "Lancer le duel": "Start the duel",
    "Ouvrir la campagne": "Open the campaign",
    "Relever le défi": "Take the challenge",
    "Défi déjà relevé": "Challenge already taken",
    "Son : coupé": "Sound: off",
    "Son : branché": "Sound: on",
    "Hawkins, 1983": "Hawkins, 1983",
    "Hawkins National Lab": "Hawkins National Lab",
    "Le Monde à l'Envers": "The Upside Down",
    "Strate I — Hawkins noyé": "Stratum I — Drowned Hawkins",
    "Strate II — Le labo mort": "Stratum II — The dead lab",
    "Strate III — Chez lui": "Stratum III — His place",
    "La chasse commence": "The hunt begins",
    "Il accélère": "He's speeding up",
    "Il est derrière vous": "He's right behind you",
    "Niveau 1 — Sous-sol des Wheeler": "Level 1 — The Wheelers' basement",
    "Niveau 2 — Accès restreint": "Level 2 — Restricted access",
    "Niveau 3 — Ne respirez pas": "Level 3 — Don't breathe",
    "Le sous-sol, mais en dessous": "The basement, but underneath",
    "Plus personne ne tient la porte": "Nobody's holding the door now",
    "L'horloge a déjà commencé": "The clock has already started",
    "Il vous a repéré": "He's spotted you",
    "Le couloir se rétrécit": "The corridor is narrowing",
    "Ne vous retournez pas": "Don't look back",

    /* Déroulé d'une question */
    "Suivant": "Next",
    "Voir le verdict": "See the verdict",
    "Vrai": "True",
    "Faux": "False",
    "<b>Trop tard.</b> Le Démogorgon n'attend pas. ": "<b>Too late.</b> The Demogorgon doesn't wait. ",
    "<b>Exact.</b> ": "<b>Correct.</b> ",

    /* Messages fugaces */
    "Accès au laboratoire": "Lab access granted",
    "Vous glissez dans le Monde à l'Envers": "You're slipping into the Upside Down",
    "Vous descendez encore": "You're going deeper",
    "Il vous a senti": "He's sensed you",
    "L'horloge sonne": "The clock is chiming",
    "Série de 3 — saignement de nez": "Three in a row — nosebleed",
    "Deux réponses écartées": "Two answers removed",
    "Le walkman tient le monstre à distance": "The walkman holds the monster back",
    "Cerebro a capté deux lettres": "Cerebro picked up two letters",
    "Cerebro a daté le premier moment": "Cerebro dated the first moment",
    "Le Club AV a voté": "The AV Club has voted",
    "Sans la moindre fausse note": "Not a single wrong note",
    "Le Monde à l'Envers vous attend": "The Upside Down is waiting for you",
    "Il faut bien garder une saison": "You have to keep at least one season",
    "Nouveau jour, nouveau défi": "New day, new challenge",
    "20 naturel — le sort tourne": "Natural 20 — the tide turns",
    "1 naturel — échec critique": "Natural 1 — critical failure",
    "Bonjour Mike.": "Hello, Mike.",
    "Mode Eggo illimité": "Unlimited Eggo mode",
    "Vous avez secoué l'antenne": "You shook the antenna",
    "Le mur n'a plus rien à dire. Bravo.": "The wall has nothing left to say. Well done.",

    /* Résultat et statistiques */
    "Transmission terminée": "Transmission complete",
    "Gaufres": "Waffles",
    "Gouttes": "Drops",
    "Meilleure série": "Best streak",
    "Temps moyen": "Average time",
    "Dévoré·e par le chrono": "Caught by the clock",
    "Questions tenues": "Questions survived",
    "Rattrapé·e": "Caught",
    "Dernier chrono": "Last clock",
    "Joueur 1": "Player 1",
    "Joueur 2": "Player 2",
    "Points de vie": "Hit points",
    "Bonnes réponses": "Correct answers",
    "Parties": "Games",
    "Sans-faute": "Perfect runs",
    "Record Survie": "Survival record",
    "Défis relevés": "Challenges taken",
    "Série en cours": "Current streak",
    "Revenu du Monde à l'Envers": "Back from the Upside Down",
    "Resté dans le Monde à l'Envers": "Still in the Upside Down",
    "Copier mon score": "Copy my score",
    "Copié !": "Copied!",
    "Partagé !": "Shared!",
    "Copie impossible": "Copy failed",
    "Carte à partager": "Share card",
    "Dessin en cours…": "Drawing…",
    "Partage ouvert": "Share sheet open",
    "Image enregistrée": "Image saved",
    "Échec du dessin": "Drawing failed",
    "En chiffres": "At a glance",
    "Défi du jour": "Daily challenge",
    "Galerie des rangs": "Rank gallery",
    "à débloquer": "to unlock",
    "Recharger": "Reload",
    "Installer": "Install",
    "Une nouvelle version est prête.": "A new version is ready.",
    "Installer le quiz sur votre écran d'accueil ?": "Install the quiz on your home screen?",
    "Aucune partie terminée pour l'instant.": "No finished games yet.",
    "Le dossier se remplira tout seul.": "The file will fill itself in.",

    /* Rangs — Campagne */
    "Mort au premier jet": "Dead on the first roll",
    "Le maître du donjon n'a même pas eu le temps de poser le décor. Il reste des chips, si ça console.":
      "The dungeon master didn't even get to set the scene. There are crisps left, if that helps.",
    "Personnage de niveau 1": "Level 1 character",
    "Vous avez survécu à la taverne et pas beaucoup plus. Tout le monde commence quelque part.":
      "You survived the tavern and not much else. Everyone starts somewhere.",
    "Aventurier du Hellfire": "Hellfire adventurer",
    "Eddie vous aurait laissé jouer un magicien. Avec un peu de méfiance, mais il vous aurait laissé.":
      "Eddie would have let you play a wizard. With some suspicion, but he'd have let you.",
    "Paladin de Hawkins": "Paladin of Hawkins",
    "Vous encaissez, vous relancez, vous tenez. C'est exactement ce qu'on demande à un paladin.":
      "You take the hit, you roll again, you hold. That is exactly the job description.",
    "Maître du donjon": "Dungeon master",
    "À ce stade, c'est vous qui écrivez la campagne. Les autres ne font que lancer les dés.":
      "At this point you're writing the campaign. The others just roll the dice.",
    "Campagne terminée": "Campaign complete",
    "Vingt questions, vingt victoires. Même Vecna range son manuel et vous laisse la table.":
      "Twenty questions, twenty wins. Even Vecna puts his rulebook away and gives you the table.",

    /* Rangs — Survie */
    "Repas du soir": "Dinner",
    "Le Démogorgon n'a même pas eu besoin de courir. C'est presque vexant pour lui.":
      "The Demogorgon didn't even have to run. It's almost insulting for him.",
    "Proie standard": "Standard prey",
    "Vous avez tenu le temps d'un générique. Hawkins ne retiendra pas votre nom.":
      "You lasted the length of a title sequence. Hawkins will not remember your name.",
    "Survivant du placard": "Closet survivor",
    "Caché, silencieux, vivant. Trois qualités, dans le bon ordre.":
      "Hidden, quiet, alive. Three qualities, in the right order.",
    "Membre du Hellfire": "Hellfire member",
    "Vous avez joué de la guitare pendant l'attaque. Personne ne vous demandait ça, et pourtant.":
      "You played guitar during the attack. Nobody asked you to, and yet.",
    "Chasseur de Demodogs": "Demodog hunter",
    "Vous les avez attirés avec de la viande crue et un plan douteux. Ça a marché.":
      "You lured them with raw meat and a questionable plan. It worked.",
    "Shérif de Hawkins": "Chief of Hawkins",
    "Vous avez traversé ça au café et à la mauvaise foi. Personne ne comprend comment.":
      "You got through it on coffee and bad faith. Nobody understands how.",
    "Sujet 011": "Subject 011",
    "À ce stade, ce n'est plus de la survie. C'est vous qui les traquez.":
      "At this point it isn't survival any more. You're the one hunting them.",

    /* Rangs — Enquête */
    "Barb": "Barb",
    "Tu as disparu près de la piscine et personne n'a lancé d'avis de recherche. Personne.":
      "You vanished by the pool and nobody filed a missing persons report. Nobody.",
    "Le maire de Hawkins": "The mayor of Hawkins",
    "Tu es formel : c'était un ours. Un très gros ours. Avec une tête en forme de fleur.":
      "You're adamant: it was a bear. A very large bear. With a flower for a head.",
    "Steve Harrington (saison 1)": "Steve Harrington (season 1)",
    "La coiffure est irréprochable, les réponses beaucoup moins. Tu t'améliores à l'épisode 8.":
      "The hair is flawless, the answers much less so. You improve around episode 8.",
    "Robin Buckley": "Robin Buckley",
    "Tu as décodé le message russe, mais tu parlais trop vite pour qu'on te suive.":
      "You cracked the Russian message, but you talked too fast for anyone to follow.",
    "Dustin Henderson": "Dustin Henderson",
    "Diplômé du Club AV, opérateur certifié Cerebro. Suzie serait fière.":
      "AV Club graduate, certified Cerebro operator. Suzie would be proud.",
    "Eddie Munson": "Eddie Munson",
    "Solo de guitare impeccable, une seule fausse note. Tu ne t'es pas enfui, toi.":
      "Flawless guitar solo, one bum note. You, at least, did not run.",
    "Eleven": "Eleven",
    "Douze sur douze. Tu as saigné du nez pendant le quiz, avoue.":
      "Twelve out of twelve. Your nose bled during the quiz, admit it.",

    /* Rangs — Duel */
    "Match nul": "Draw",
    "Personne ne cède. Il va falloir rejouer, et cette fois sans excuses.":
      "Neither of you gives an inch. Rematch, and this time no excuses.",
    "Joueur 1 l'emporte": "Player 1 wins",
    "La victoire est nette. Le sous-sol des Wheeler a un nouveau maître.":
      "A clean win. The Wheeler basement has a new master.",
    "Joueur 2 l'emporte": "Player 2 wins",
    "Retourné la situation depuis le siège du passager. Élégant.":
      "Turned it around from the passenger seat. Elegant.",

    /* Rang du zéro pointé */
    "Le Démogorgon": "The Demogorgon",
    "Zéro sur douze. Statistiquement, il faut le faire exprès. La conclusion s'impose : le monstre, c'est vous.":
      "Zero out of twelve. Statistically you have to try. The conclusion is unavoidable: you are the monster.",

    /* Modes, tableaux et compteurs */
    "Enquête": "Investigation",
    "Survie": "Survival",
    "Défi": "Challenge",
    "Duel": "Duel",
    "Campagne": "Campaign",
    "Tableau d'honneur —": "Hall of fame —",
    "Monde à l'Envers : ouvert": "Upside Down: open",
    "Monde à l'Envers : scellé": "Upside Down: sealed",
    "Série de défis : 1 jour": "Challenge streak: 1 day",
    "Série de défis :": "Challenge streak:",
    "jours d'affilée": "days in a row",
    "Répartition des scores —": "Score distribution —",
    "partie": "game",
    "parties": "games",
    "Galerie des rangs —": "Rank gallery —",
    "Défi du jour nº": "Daily challenge no.",
    "Défi reçu": "Challenge received",
    "Déjà relevé :": "Already played:",
    "Quelqu'un vous a envoyé exactement ce paquet": "Someone sent you this exact deck",
    "Les mêmes 12 questions pour tout le monde": "The same 12 questions for everyone",
    "Il est juste derrière": "He is right behind you",
    "Effacer scores, statistiques, secrets et défis enregistrés sur cet appareil ? C'est définitif.":
      "Erase scores, statistics, secrets and challenges saved on this device? This cannot be undone.",

    /* Partage et carte */
    "questions tenues": "questions survived",
    "Défi nº": "Challenge no.",
    "joker": "lifeline",
    "jokers": "lifelines",
    "Série :": "Streak:",
    "jours": "days",
    "Rang :": "Rank:",
    "Mode Monde à l'Envers": "Upside Down mode",
    "Même paquet, même chance. À vous :": "Same deck, same odds. Your turn:",
    "Survivrez-vous au Monde à l'Envers ?": "Can you survive the Upside Down?",
    "LE TEST OFFICIEUX DU FAN": "THE UNOFFICIAL FAN TEST",
    "MODE SURVIE": "SURVIVAL MODE",
    "DÉFI REÇU": "CHALLENGE RECEIVED",
    "DÉFI Nº": "CHALLENGE NO.",
    "ENQUÊTE": "INVESTIGATION",
    "MONDE À L'ENVERS": "UPSIDE DOWN",
    "QUESTIONS TENUES": "QUESTIONS SURVIVED",
    "GOUTTES": "DROPS",
    "GAUFRES": "WAFFLES",
    "Projet de fan non officiel · sans affiliation avec Netflix":
      "Unofficial fan project · no affiliation with Netflix",

    /* Mur d'alphabet */
    "Ne rentrez pas seul.": "Don't ride home alone.",
    "À vous de répondre.": "Your turn to answer.",
    "Joyce a laissé un message.": "Joyce left a message.",
    "Le congélateur est ouvert.": "The freezer is open.",
    "Quatre coups. Courez.": "Four chimes. Run.",
    "Elle vous a entendu.": "She heard you.",
    "Quelqu'un s'en souvient, enfin.": "Someone remembers, at last.",
    "Un peu tard pour ça, non ?": "A little late for that, isn't it?",
    "La faille est ouverte.": "The rift is open."
  };

  window.HQ_I18N = { UI, HTML, S };
})();
