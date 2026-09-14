/* ==================================================================
   Hawkins Quiz — internationalisation (néerlandais)
   Le français reste la langue source : les clés SONT les chaînes
   françaises. Toute chaîne non traduite retombe donc naturellement
   sur le français plutôt que d'afficher une clé technique.
   Chargé avant app.js, déposé dans window.HQ_I18N.nl.
================================================================== */
(() => {
  "use strict";

  /* Textes statiques de la page, repérés par sélecteur CSS. */
  const UI = {
    "title": "Hawkins Quiz — Test je fankennis",
    'meta[name="description"]@content':
      "Twaalf vragen, drie dimensies en een Demogorgon die de seconden telt. Test je kennis van Stranger Things. Niet-officieel fanproject.",

    ".brand__kicker": "De onofficiële fantest",
    ".brand__tag": "Twaalf vragen. Drie dimensies. Een Demogorgon die de seconden telt.",
    "#wallCaption": "Joyce heeft een bericht achtergelaten.",
    "#udLabel": "Upside Down-modus",
    "#startLabel": "De kelder in",
    "#soundLabel": "Geluid: uit",
    "#btnStats": "Statistieken",
    ".seasons__label": "Seizoenen",

    "#modeEnquete b": "Onderzoek",
    "#modeEnquete span": "12 vragen, 3 dimensies",
    "#modeSurvie b": "Overleven",
    "#modeSurvie span": "Tot je eerste fout",
    "#modeDefi span": "Voor iedereen dezelfde 12 vragen",
    "#modeDuel b": "Lokaal duel",
    "#modeDuel span": "Twee spelers, één toestel, om beurten",
    "#modeCampagne b": "Campagne",
    "#modeCampagne span": "20 levenspunten, één twintigzijdige dobbelsteen, geen genade",
    "#modeRevanche b": "Revanche",

    "#optsSum": "Speelcomfort",
    "#optRelax b": "Zonder klok",
    "#optRelax span": "De Demogorgon wacht wel. Buiten de erelijst",
    "#optParty b": "Feestmodus",
    "#optParty span": "Grote letters, om samen hardop te spelen",
    "#optLisible b": "Leesbaar lettertype",
    "#optLisible span": "Soberder, ruimer en groter",
    "#optNoart b": "Zonder tekenraadsels",
    "#optNoart span": "Slaat de vragen over die op een afbeelding steunen",

    ".only-enquete.only-normal:nth-of-type(2)": null,

    "#relay .relay__kicker": "Geef het toestel door",
    "#relayGo": "Ik ben klaar",

    ".hunt": null,
    "#btnNext": "Volgende",
    ".spell__hint": null,
    "#spellBack": "Wissen",
    "#chronoBack": "Wissen",
    ".chrono__hint": null,

    "#joker5050 .joker__lbl": null,
    ".result__kicker": "Uitzending beëindigd",
    "#btnReplay": "Opnieuw spelen",
    "#btnShare": "Mijn score kopiëren",
    "#btnCard": "Deelkaart",
    ".initials__title": "Je staat op de erelijst",
    ".initials__hint": "Tik drie letters op de muur hierboven.",
    "#iniBack": "Wissen",
    "#iniOk": "Graveren",
    "#statsTitle": "Jouw statistieken",
    "#btnStatsBack": "Terug",
    "#btnWipe": "Mijn gegevens wissen",

    ".foot p:first-child":
      "Niet-officieel fanproject, zonder enige band met Netflix of de makers van de serie. Er wordt geen beeld- of geluidsmateriaal uit de serie gebruikt: alles hier is in CSS getekend en in Web Audio gesynthetiseerd.",
    ".foot a": "Broncode"
  };

  /* Blocs à remplacer en HTML (listes de règles, libellés composés). */
  const HTML = {
    ".rules": `
      <li class="only-enquete"><b>12 vragen</b> uit <span id="bankSize">140</span>, nooit tweemaal dezelfde</li>
      <li class="only-enquete only-normal">Het decor wordt donkerder naarmate je vordert&nbsp;: Hawkins → het lab → <i>de Upside Down</i></li>
      <li class="only-enquete only-normal">De klok wordt korter met elke dimensie. Nul seconden = nul wafels</li>
      <li class="only-enquete only-ud">Drie lagen, <b>geen uitweg</b>&nbsp;: verdronken Hawkins → het dode lab → bij hem thuis</li>
      <li class="only-enquete only-ud">Klok gehalveerd&nbsp;: <b>15 s, 12 s, 10 s</b>. De vragen komen gespiegeld binnen</li>
      <li class="only-survie"><b>Eén fout</b> en de jacht is voorbij. Geen tweede kans</li>
      <li class="only-survie">De klok verliest elke vraag een halve seconde. Ze loopt nooit terug</li>
      <li class="only-defi"><b>Voor iedereen dezelfde 12 vragen</b>, getrokken op de datum van vandaag</li>
      <li class="only-defi">Eén poging. Het seizoensfilter geldt niet&nbsp;: iedereen speelt hetzelfde pakket</li>
      <li class="only-duel"><b>Zes vragen elk</b>, om beurten. Het toestel gaat van hand tot hand</li>
      <li class="only-duel">Geen jokers: gelijke wapens, of geen duel</li>
      <li class="only-campagne"><b>20 levenspunten.</b> Een fout kost er 4, 6 of 8, afhankelijk van het niveau</li>
      <li class="only-campagne">Voor elke vraag wordt een <b>twintigzijdige dobbelsteen</b> geworpen. Een 20 haalt twee antwoorden weg, een 1 halveert de klok</li>
      <li class="only-campagne">De campagne stopt bij nul levenspunten. Twintig vragen volgehouden en je komt er levend uit</li>
      <li class="only-revanche"><b>Alleen de vragen die je fout had</b>, uit je eigen foutenboekje</li>
      <li class="only-revanche">Een goed antwoord schrapt de vraag uit het boekje. Een fout antwoord laat ze staan</li>
      <li class="only-keys">Toetsenbord&nbsp;: toetsen <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> <kbd>4</kbd></li>
      <li class="rules__hint">Ze zeggen dat de muur antwoordt, als je hem aanspreekt.</li>
      <li class="rules__hint">De bank bestrijkt alle vijf seizoenen&nbsp;: vink S5 uit om spoilers te vermijden.</li>`,

    "#jokers": `
      <button class="joker" id="joker5050" type="button">
        <span class="joker__ico">½</span>
        <span class="joker__lbl">Knuppel van Steve<i>Twee antwoorden minder</i></span>
      </button>
      <button class="joker" id="jokerTime" type="button">
        <span class="joker__ico">‖</span>
        <span class="joker__lbl">Walkman van Max<i>De klok stopt</i></span>
      </button>
      <button class="joker" id="jokerAv" type="button">
        <span class="joker__ico">AV</span>
        <span class="joker__lbl">Cerebro-radio<i>Vraag het de AV Club</i></span>
      </button>`,

    "#spell .spell__hint": `
      Spel het antwoord op de muur, of tik het in.
      <button class="spell__back" id="spellBack" type="button">Wissen</button>`,

    "#chrono .chrono__hint": `
      Tik de drie momenten aan, van oudste naar recentste.
      <button class="spell__back" id="chronoBack" type="button">Wissen</button>`
  };

  /* Chaînes produites par le script. La clé est la version française. */
  const S = {
    /* Modes et bandeau */
    "Entrer dans le sous-sol": "De kelder in",
    "Lancer la chasse": "Start de jacht",
    "Lancer le duel": "Start het duel",
    "Ouvrir la campagne": "Open de campagne",
    "Ouvrir le carnet": "Open het boekje",
    "Relever le défi": "Neem de uitdaging aan",
    "Défi déjà relevé": "Uitdaging al gedaan",
    "Son : coupé": "Geluid: uit",
    "Son : branché": "Geluid: aan",

    /* Phases */
    "Hawkins, 1983": "Hawkins, 1983",
    "Hawkins National Lab": "Hawkins National Lab",
    "Le Monde à l'Envers": "De Upside Down",
    "Strate I — Hawkins noyé": "Laag I — Verdronken Hawkins",
    "Strate II — Le labo mort": "Laag II — Het dode lab",
    "Strate III — Chez lui": "Laag III — Bij hem thuis",
    "La chasse commence": "De jacht begint",
    "Il accélère": "Hij versnelt",
    "Il est derrière vous": "Hij staat achter je",
    "Niveau 1 — Sous-sol des Wheeler": "Niveau 1 — De kelder van de Wheelers",
    "Niveau 2 — Accès restreint": "Niveau 2 — Verboden toegang",
    "Niveau 3 — Ne respirez pas": "Niveau 3 — Niet ademen",
    "Le sous-sol, mais en dessous": "De kelder, maar dan eronder",
    "Plus personne ne tient la porte": "Niemand houdt de deur nog open",
    "L'horloge a déjà commencé": "De klok is al begonnen",
    "Il vous a repéré": "Hij heeft je gezien",
    "Le couloir se rétrécit": "De gang wordt smaller",
    "Ne vous retournez pas": "Kijk niet om",
    "Il est juste derrière": "Hij is vlak achter je",

    /* Quiz */
    "Question": "Vraag",
    "Suivant": "Volgende",
    "Voir le verdict": "Naar het oordeel",
    "Vrai": "Waar",
    "Faux": "Onwaar",
    "<b>Trop tard.</b> Le Démogorgon n'attend pas. ": "<b>Te laat.</b> De Demogorgon wacht niet. ",
    "<b>Exact.</b> ": "<b>Juist.</b> ",
    "Accès au laboratoire": "Toegang tot het laboratorium",
    "Vous glissez dans le Monde à l'Envers": "Je glijdt de Upside Down in",
    "Vous descendez encore": "Je zakt nog dieper",
    "Il vous a senti": "Hij heeft je geroken",
    "L'horloge sonne": "De klok slaat",
    "Série de 3 — saignement de nez": "Reeks van 3 — bloedneus",
    "Deux réponses écartées": "Twee antwoorden weggehaald",
    "Le walkman tient le monstre à distance": "De walkman houdt het monster op afstand",
    "Cerebro a capté deux lettres": "Cerebro ving twee letters op",
    "Cerebro a daté le premier moment": "Cerebro dateerde het eerste moment",
    "Le Club AV a voté": "De AV Club heeft gestemd",
    "Sans la moindre fausse note": "Zonder één valse noot",
    "Le Monde à l'Envers vous attend": "De Upside Down wacht op je",
    "Il faut bien garder une saison": "Eén seizoen moet je toch overhouden",
    "Nouveau jour, nouveau défi": "Nieuwe dag, nieuwe uitdaging",
    "Le défi du jour garde son chrono": "De dagelijkse uitdaging houdt haar klok",
    "20 naturel — le sort tourne": "Natuurlijke 20 — het tij keert",
    "1 naturel — échec critique": "Natuurlijke 1 — kritieke mislukking",
    "Bonjour Mike.": "Hallo Mike.",
    "Mode Eggo illimité": "Onbeperkte Eggo-modus",
    "Vous avez secoué l'antenne": "Je hebt aan de antenne geschud",
    "Le mur n'a plus rien à dire. Bravo.": "De muur heeft niets meer te zeggen. Bravo.",

    /* Dessins et accessibilité */
    "Un dessin au trait accompagne la question ; il n'est pas nécessaire pour répondre.":
      "Bij deze vraag hoort een lijntekening; je hebt ze niet nodig om te antwoorden.",
    "Cette question repose entièrement sur un dessin. Le réglage « Sans devinette dessinée » l'écarte du tirage.":
      "Deze vraag steunt volledig op een tekening. De instelling \u201cZonder tekenraadsels\u201d houdt ze buiten de trekking.",
    "Le dessin est masqué : la question se répond au texte seul.":
      "De tekening is verborgen: deze vraag kun je op de tekst alleen beantwoorden.",

    /* Résultat */
    "Transmission terminée": "Uitzending beëindigd",
    "Gaufres": "Wafels",
    "Gouttes": "Druppels",
    "Meilleure série": "Beste reeks",
    "Temps moyen": "Gemiddelde tijd",
    "Dévoré·e par le chrono": "Opgeslokt door de klok",
    "Questions tenues": "Vragen volgehouden",
    "Rattrapé·e": "Ingehaald",
    "Dernier chrono": "Laatste klok",
    "Joueur 1": "Speler 1",
    "Joueur 2": "Speler 2",
    "Points de vie": "Levenspunten",
    "Bonnes réponses": "Juiste antwoorden",
    "Parties": "Partijen",
    "Sans-faute": "Foutloos",
    "Record Survie": "Record Overleven",
    "Défis relevés": "Uitdagingen gedaan",
    "Série en cours": "Lopende reeks",
    "Revenu du Monde à l'Envers": "Teruggekeerd uit de Upside Down",
    "Resté dans le Monde à l'Envers": "Achtergebleven in de Upside Down",
    "Réparées": "Hersteld",
    "réparées": "hersteld",
    "Reste au carnet": "Nog in het boekje",
    "À réparer": "Te herstellen",
    "Revanches": "Revanches",
    "Duels": "Duels",

    /* Partage */
    "Copier mon score": "Mijn score kopiëren",
    "Copié !": "Gekopieerd!",
    "Partagé !": "Gedeeld!",
    "Copie impossible": "Kopiëren lukt niet",
    "Carte à partager": "Deelkaart",
    "Dessin en cours…": "Bezig met tekenen…",
    "Partage ouvert": "Deelvenster geopend",
    "Image enregistrée": "Afbeelding opgeslagen",
    "Échec du dessin": "Tekenen mislukt",

    /* Statistiques */
    "En chiffres": "In cijfers",
    "Défi du jour": "Dagelijkse uitdaging",
    "Galerie des rangs": "Galerij van rangen",
    "à débloquer": "te ontgrendelen",
    "Aucune partie terminée pour l'instant.": "Nog geen enkele partij afgerond.",
    "Le dossier se remplira tout seul.": "Het dossier vult zichzelf wel.",
    "Réussite par saison": "Score per seizoen",
    "Réussite par format": "Score per vraagvorm",
    "Votre point faible :": "Je zwakke plek:",
    "Ce qui vous résiste le plus :": "Wat je het meest weerstaat:",
    "Carnet d'erreurs": "Foutenboekje",
    "Carnet d'erreurs :": "Foutenboekje:",
    "questions à réparer": "vragen te herstellen",
    "question à réparer": "vraag te herstellen",
    "Saison 1": "Seizoen 1",
    "Saison 2": "Seizoen 2",
    "Saison 3": "Seizoen 3",
    "Saison 4": "Seizoen 4",
    "Saison 5": "Seizoen 5",
    "Choix multiple": "Meerkeuze",
    "À épeler": "Spellen",
    "Vrai ou faux": "Waar of onwaar",
    "Chronologie": "Tijdlijn",
    "L'intrus": "De vreemde eend",
    "Devinette dessinée": "Tekenraadsel",

    /* Coquille */
    "Recharger": "Herladen",
    "Installer": "Installeren",
    "Une nouvelle version est prête.": "Er staat een nieuwe versie klaar.",
    "Installer le quiz sur votre écran d'accueil ?": "De quiz op je beginscherm installeren?",

    /* Rangs de la campagne */
    "Mort au premier jet": "Dood bij de eerste worp",
    "Le maître du donjon n'a même pas eu le temps de poser le décor. Il reste des chips, si ça console.":
      "De spelleider kon het decor niet eens neerzetten. Er zijn nog chips, als dat troost.",
    "Personnage de niveau 1": "Personage van niveau 1",
    "Vous avez survécu à la taverne et pas beaucoup plus. Tout le monde commence quelque part.":
      "Je hebt de herberg overleefd en veel meer niet. Iedereen begint ergens.",
    "Aventurier du Hellfire": "Avonturier van Hellfire",
    "Eddie vous aurait laissé jouer un magicien. Avec un peu de méfiance, mais il vous aurait laissé.":
      "Eddie had je een magiër laten spelen. Met enige argwaan, maar hij had het toegelaten.",
    "Paladin de Hawkins": "Paladijn van Hawkins",
    "Vous encaissez, vous relancez, vous tenez. C'est exactement ce qu'on demande à un paladin.":
      "Je incasseert, je gooit opnieuw, je houdt stand. Precies wat men van een paladijn verwacht.",
    "Maître du donjon": "Spelleider",
    "À ce stade, c'est vous qui écrivez la campagne. Les autres ne font que lancer les dés.":
      "Op dit punt schrijf jij de campagne. De anderen gooien alleen nog de dobbelstenen.",
    "Campagne terminée": "Campagne voltooid",
    "Vingt questions, vingt victoires. Même Vecna range son manuel et vous laisse la table.":
      "Twintig vragen, twintig overwinningen. Zelfs Vecna bergt zijn handboek op en laat je de tafel.",

    /* Rangs de la survie */
    "Repas du soir": "Avondmaal",
    "Le Démogorgon n'a même pas eu besoin de courir. C'est presque vexant pour lui.":
      "De Demogorgon hoefde niet eens te rennen. Bijna beledigend voor hem.",
    "Proie standard": "Standaardprooi",
    "Vous avez tenu le temps d'un générique. Hawkins ne retiendra pas votre nom.":
      "Je hield het een leader lang vol. Hawkins zal je naam niet onthouden.",
    "Survivant du placard": "Overlever van de kast",
    "Caché, silencieux, vivant. Trois qualités, dans le bon ordre.":
      "Verstopt, stil, levend. Drie kwaliteiten, in de juiste volgorde.",
    "Membre du Hellfire": "Lid van Hellfire",
    "Vous avez joué de la guitare pendant l'attaque. Personne ne vous demandait ça, et pourtant.":
      "Je speelde gitaar tijdens de aanval. Niemand had erom gevraagd, en toch.",
    "Chasseur de Demodogs": "Demodog-jager",
    "Vous les avez attirés avec de la viande crue et un plan douteux. Ça a marché.":
      "Je lokte ze met rauw vlees en een twijfelachtig plan. Het werkte.",
    "Shérif de Hawkins": "Sheriff van Hawkins",
    "Vous avez traversé ça au café et à la mauvaise foi. Personne ne comprend comment.":
      "Je bent er doorgekomen op koffie en kwade trouw. Niemand begrijpt hoe.",
    "Sujet 011": "Proefpersoon 011",
    "À ce stade, ce n'est plus de la survie. C'est vous qui les traquez.":
      "Op dit punt is het geen overleven meer. Jij jaagt op hen.",

    /* Rangs de l'enquête */
    "Barb": "Barb",
    "Tu as disparu près de la piscine et personne n'a lancé d'avis de recherche. Personne.":
      "Je verdween bij het zwembad en niemand gaf een opsporingsbericht uit. Niemand.",
    "Le maire de Hawkins": "De burgemeester van Hawkins",
    "Tu es formel : c'était un ours. Un très gros ours. Avec une tête en forme de fleur.":
      "Je bent stellig: het was een beer. Een heel grote beer. Met een kop in de vorm van een bloem.",
    "Steve Harrington (saison 1)": "Steve Harrington (seizoen 1)",
    "La coiffure est irréprochable, les réponses beaucoup moins. Tu t'améliores à l'épisode 8.":
      "Het kapsel is onberispelijk, de antwoorden veel minder. Je wordt beter vanaf aflevering 8.",
    "Robin Buckley": "Robin Buckley",
    "Tu as décodé le message russe, mais tu parlais trop vite pour qu'on te suive.":
      "Je hebt de Russische boodschap ontcijferd, maar je praatte te snel om te volgen.",
    "Dustin Henderson": "Dustin Henderson",
    "Diplômé du Club AV, opérateur certifié Cerebro. Suzie serait fière.":
      "Afgestudeerd aan de AV Club, gecertificeerd Cerebro-operator. Suzie zou trots zijn.",
    "Eddie Munson": "Eddie Munson",
    "Solo de guitare impeccable, une seule fausse note. Tu ne t'es pas enfui, toi.":
      "Onberispelijke gitaarsolo, één valse noot. Jij bent tenminste niet weggelopen.",
    "Eleven": "Eleven",
    "Douze sur douze. Tu as saigné du nez pendant le quiz, avoue.":
      "Twaalf op twaalf. Je hebt tijdens de quiz een bloedneus gehad, geef maar toe.",
    "Le Démogorgon": "De Demogorgon",
    "Zéro sur douze. Statistiquement, il faut le faire exprès. La conclusion s'impose : le monstre, c'est vous.":
      "Nul op twaalf. Statistisch gezien moet je dat expres doen. De conclusie dringt zich op: het monster, dat ben jij.",

    /* Rangs du duel */
    "Match nul": "Gelijkspel",
    "Personne ne cède. Il va falloir rejouer, et cette fois sans excuses.":
      "Niemand geeft toe. Er moet opnieuw gespeeld worden, en deze keer zonder excuses.",
    "Joueur 1 l'emporte": "Speler 1 wint",
    "La victoire est nette. Le sous-sol des Wheeler a un nouveau maître.":
      "Een duidelijke overwinning. De kelder van de Wheelers heeft een nieuwe meester.",
    "Joueur 2 l'emporte": "Speler 2 wint",
    "Retourné la situation depuis le siège du passager. Élégant.":
      "De situatie omgedraaid vanaf de passagiersstoel. Elegant.",

    /* Tableau d'honneur, séries et défis */
    "Enquête": "Onderzoek",
    "Survie": "Overleven",
    "Défi": "Uitdaging",
    "Duel": "Duel",
    "Campagne": "Campagne",
    "Revanche": "Revanche",
    "Tableau d'honneur —": "Erelijst —",
    "Monde à l'Envers : ouvert": "Upside Down: open",
    "Monde à l'Envers : scellé": "Upside Down: verzegeld",
    "Série de défis : 1 jour": "Reeks uitdagingen: 1 dag",
    "Série de défis :": "Reeks uitdagingen:",
    "jours d'affilée": "dagen op rij",
    "Répartition des scores —": "Verdeling van de scores —",
    "partie": "partij",
    "parties": "partijen",
    "Galerie des rangs —": "Galerij van rangen —",
    "Défi du jour nº": "Dagelijkse uitdaging nr.",
    "Défi reçu": "Uitdaging ontvangen",
    "Déjà relevé :": "Al gedaan:",
    "Quelqu'un vous a envoyé exactement ce paquet": "Iemand stuurde je precies dit pakket",
    "Les mêmes 12 questions pour tout le monde": "Voor iedereen dezelfde 12 vragen",
    "Effacer scores, statistiques, secrets et défis enregistrés sur cet appareil ? C'est définitif.":
      "Scores, statistieken, geheimen en opgeslagen uitdagingen op dit toestel wissen? Dit is definitief.",

    /* Duel par lien */
    "Défi lancé par": "Uitdaging van",
    "un inconnu": "een onbekende",
    "à battre": "te verslaan",
    "votre adversaire": "je tegenstander",
    "contre": "tegen",
    "Vous l'emportez.": "Jij wint.",
    "La revanche attendra.": "De revanche moet wachten.",
    "Match nul, à la gaufre près.": "Gelijkspel, tot op de wafel na.",

    /* Texte de partage */
    "questions tenues": "vragen volgehouden",
    "Défi nº": "Uitdaging nr.",
    "joker": "joker",
    "jokers": "jokers",
    "Série :": "Reeks:",
    "jours": "dagen",
    "Rang :": "Rang:",
    "Mode Monde à l'Envers": "Upside Down-modus",
    "Même paquet, même chance. À vous :": "Zelfde pakket, zelfde kansen. Jouw beurt:",
    "Même paquet, même score à battre. À vous :": "Zelfde pakket, zelfde score te verslaan. Jouw beurt:",
    "Survivrez-vous au Monde à l'Envers ?": "Overleef jij de Upside Down?",

    /* Carte de score */
    "LE TEST OFFICIEUX DU FAN": "DE ONOFFICIËLE FANTEST",
    "MODE SURVIE": "OVERLEVINGSMODUS",
    "REVANCHE": "REVANCHE",
    "CAMPAGNE": "CAMPAGNE",
    "DUEL": "DUEL",
    "DÉFI REÇU": "UITDAGING ONTVANGEN",
    "DÉFI Nº": "UITDAGING NR.",
    "ENQUÊTE": "ONDERZOEK",
    "MONDE À L'ENVERS": "UPSIDE DOWN",
    "QUESTIONS TENUES": "VRAGEN VOLGEHOUDEN",
    "RÉPARÉES": "HERSTELD",
    "GOUTTES": "DRUPPELS",
    "GAUFRES": "WAFELS",
    "Projet de fan non officiel · sans affiliation avec Netflix":
      "Niet-officieel fanproject · zonder band met Netflix",

    /* Le mur */
    "Ne rentrez pas seul.": "Ga niet alleen naar huis.",
    "À vous de répondre.": "Jouw beurt om te antwoorden.",
    "Joyce a laissé un message.": "Joyce heeft een bericht achtergelaten.",
    "Le congélateur est ouvert.": "De diepvriezer staat open.",
    "Quatre coups. Courez.": "Vier slagen. Rennen.",
    "Elle vous a entendu.": "Ze heeft je gehoord.",
    "Quelqu'un s'en souvient, enfin.": "Eindelijk herinnert iemand het zich.",
    "Un peu tard pour ça, non ?": "Een beetje laat daarvoor, niet?",
    "La faille est ouverte.": "De scheur staat open."
  };

  window.HQ_I18N = Object.assign(window.HQ_I18N || {}, { nl: { UI, HTML, S } });
})();
