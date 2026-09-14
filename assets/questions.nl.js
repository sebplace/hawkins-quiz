/* ==================================================================
   Hawkins Quiz — Nederlandse vragenbank
   Geïndexeerd op het stabiele id van de vraag, niet op de Franse tekst:
   een typefout verbeteren in het Frans breekt hier dus niets.
   Een vraag zonder vermelding hier wordt in het Nederlands gewoon niet
   voorgelegd. Bij meerkeuzevragen MOET de volgorde die van het Frans
   volgen, met het juiste antwoord op de eerste plaats.
================================================================== */

const QUESTIONS_NL = {
  /* ---------------- Niveau 1 ---------------- */
  "petite-ville-indiana": {
    q: "In welk stadje in Indiana loopt alles uit de hand?",
    choices: ["Hawkins", "Derry", "Hill Valley", "Twin Peaks"],
    fact: "Hawkins, Indiana. Stabiel inwonertal, behalve in november."
  },
  "marque-gaufres-surgelees": {
    q: "Van welk merk diepvrieswafels smelt Eleven?",
    choices: ["Eggo", "Pop-Tarts", "Toaster Strudel", "Bisquick"],
    fact: "Eggo. Op zich al reden genoeg voor een tweede diepvriezer."
  },
  "jeu-role-garcons": {
    q: "Welk rollenspel spelen de jongens in de kelder van Mike?",
    choices: ["Dungeons & Dragons", "Risk", "Monopoly", "Cluedo"],
    fact: "Tien uur campagne, en Will gooit alsnog een zeven. Veelbelovend begin."
  },
  "joyce-byers-bricole": {
    q: "Hoe knutselt Joyce Byers een telefoon naar de andere kant?",
    choices: [
      "Een alfabet op de muur en kerstverlichting",
      "Een bakkie en een magnetron",
      "Een ouijabord en een zaklamp",
      "Twee walkietalkies en heel veel plakband"
    ],
    fact: "26 letters, 26 lampjes. De breedband van 1983."
  },
  "eleven": {
    q: "Wat is de echte voornaam van Eleven?",
    choices: ["Jane", "Joyce", "Janet", "Jean"],
    fact: "Jane. Maar \u201cEleven\u201d staat beter op een T-shirt."
  },
  "chef-police-hawkins": {
    q: "Wie is het hoofd van de politie van Hawkins?",
    choices: ["Jim Hopper", "Scott Clarke", "Bob Newby", "Murray Bauman"],
    fact: "Hopper. Dieet: koffie, sigaretten en kwade trouw."
  },
  "gamins-baptisent-monstre": {
    q: "Hoe dopen de kinderen het monster van seizoen 1?",
    choices: ["De Demogorgon", "De Mind Flayer", "Vecna", "De Demodog"],
    fact: "De naam komt uit hun eigen Dungeons & Dragons-spel: Eleven herkende het beest door het figuurtje op het bord te zetten."
  },
  "appelle-fort-bois": {
    q: "Hoe heet het houten fort van Will, diep in het bos?",
    choices: ["Castle Byers", "Fort Hawkins", "De Kerker", "De Hut van de Koning"],
    fact: "Castle Byers. Drie planken, een laken en meer herinneringen dan de hele stad."
  },
  "joyce-byers-travaille": {
    q: "Waar werkt Joyce Byers aan het begin van de serie?",
    choices: ["Bij Melvald's", "Bij RadioShack", "In de Palace Arcade", "Bij Benny's"],
    fact: "Melvald's General Store. Ze heeft er vooral het rek met kerstverlichting leeggehaald."
  },
  "eleven-explique-garcons": {
    q: "Hoe legt Eleven de jongens uit waar Will is?",
    choices: [
      "Door het Dungeons & Dragons-bord om te keren",
      "Door een kaart te tekenen met een stift",
      "Door zijn naam op de muur te spellen",
      "Door naar het bos te wijzen"
    ],
    fact: "Het omgekeerde bord. De hele mythologie van de serie zit in dat ene gebaar."
  },
  "restaurant-tient-benny": {
    q: "Welke zaak houdt Benny open, de eerste aardige volwassene van de serie?",
    choices: ["Benny's Burgers", "Enzo's", "Surfer Boy Pizza", "Melvald's"],
    fact: "Benny's Burgers. Hij trakteerde Eleven op friet. Dat heeft hem geen geluk gebracht."
  },
  "eleven-deguise-passer": {
    q: "Hoe vermomt Eleven zich om onopgemerkt op school rond te lopen?",
    choices: [
      "Een blonde pruik en een roze jurk",
      "Een scoutsuniform",
      "Een pet en een trainingspak",
      "Een spookkostuum"
    ],
    fact: "Blonde pruik en een jurk van Nancy. Niemand merkte iets, wat veel zegt over Hawkins."
  },
  "appelle-grand-frere": {
    q: "Hoe heet de grote broer van Will, fotograaf in zijn vrije tijd?",
    choices: ["Jonathan", "Steve", "Billy", "Lucas"],
    fact: "Jonathan Byers. Hij fotografeert alles, ook wat hij beter niet zou fotograferen."
  },
  "debarque-max-mayfield": {
    q: "Waar komt Max Mayfield vandaan in seizoen 2?",
    choices: ["Uit Californië", "Uit Maine", "Uit Utah", "Uit Chicago"],
    fact: "Californië. Het skateboard en het slechte humeur kwamen mee."
  },
  "lien-unit-billy": {
    q: "Welke band hebben Billy Hargrove en Max Mayfield?",
    choices: [
      "De vader van Billy trouwde met de moeder van Max",
      "Ze hebben dezelfde moeder",
      "Ze zijn volle neef en nicht",
      "Ze groeiden op als buren in Californië"
    ],
    fact: "Neil Hargrove trouwde met Susan Mayfield. Geen bloedband: Billy is Max' stiefbroer, en een rampzalige chauffeur."
  },
  "garcons-deguisent-halloween": {
    q: "Als wat verkleden de jongens zich met Halloween in seizoen 2?",
    choices: ["Als Ghostbusters", "Als Demogorgons", "Als cowboys", "Als leden van Hellfire"],
    fact: "Vier Ghostbusters. Ze waren de enigen die verkleed waren. De foto is meedogenloos."
  },
  "creature-geante-plane": {
    q: "Welk reusachtig wezen hangt in seizoen 2 boven Hawkins?",
    choices: ["De Mind Flayer", "De Demogorgon", "Vecna", "De Demodog"],
    fact: "De Mind Flayer. Alweer een naam gejat uit het bestiarium van D&D."
  },
  "hopper-cache-eleven": {
    q: "Waar verstopt Hopper Eleven bijna een jaar lang?",
    choices: [
      "In een hut diep in het bos",
      "In de kelder van de Wheelers",
      "In het laboratorium",
      "Bij Joyce thuis"
    ],
    fact: "Een hut, drie regels en heel veel wafels. Het reglement hield het drie afleveringen vol."
  },
  "creature-dustin-ramene": {
    q: "Welk wezen neemt Dustin mee naar huis, overtuigd dat het een kikkervisje is?",
    choices: ["D'Artagnan, oftewel Dart", "Mews", "Yertle", "Chester"],
    fact: "Dart heeft de kat opgegeten. Dustin hield de naam toch aan."
  },
  "centre-commercial-flambant": {
    q: "Welk gloednieuw winkelcentrum opent in seizoen 3?",
    choices: ["Starcourt Mall", "Hawkins Plaza", "Midway Mall", "Palace Mall"],
    fact: "Starcourt brandde af in de nacht van 4 juli 1985. Officieel dodental: dertig, en een zeer creatieve lezing van de feiten."
  },
  "steve-harrington-rame": {
    q: "Waar zwoegt Steve Harrington in matrozenpak in seizoen 3?",
    choices: ["Bij Scoops Ahoy", "Bij Surfer Boy Pizza", "Bij Family Video", "In de Palace Arcade"],
    fact: "Scoops Ahoy. Opbrengst van de matrozenhoed: nul telefoonnummers."
  },
  "steve-travaille-derriere": {
    q: "Met wie staat Steve achter de toonbank van Scoops Ahoy?",
    choices: ["Robin Buckley", "Nancy Wheeler", "Erica Sinclair", "Heather Holloway"],
    fact: "Robin. Ze houdt zijn mislukkingen bij op een bord. Dat bord raakt snel vol."
  },
  "cachent-russes-sous": {
    q: "Wat verbergen de Russen onder Starcourt Mall?",
    choices: ["Een geheime basis", "Een parkeergarage", "Een bioscoop", "Een Slurpee-opslag"],
    fact: "Een complete basis. Niemand in Hawkins vond die werken verdacht."
  },
  "erica-sinclair-rend": {
    q: "Hoe maakt Erica Sinclair zich onmisbaar voor de groep?",
    choices: [
      "Alleen zij past door de luchtkokers van het winkelcentrum",
      "Zij spreekt vloeiend Russisch",
      "Zij hackt de centrale computer",
      "Zij rijdt de vrachtwagen"
    ],
    fact: "Geen van de andere drie paste door de kokers. Ze bedong onbeperkt ijs voordat ze meeging."
  },
  "premiere-victime-vecna": {
    q: "Wie is het eerste slachtoffer van Vecna in seizoen 4?",
    choices: ["Chrissy Cunningham", "Fred Benson", "Patrick McKinney", "Max Mayfield"],
    fact: "Chrissy Cunningham, aanvoerster van de cheerleaders. De eerste van de golf van 1986 — Henry Creel doodde al in 1959, en opnieuw in 1979."
  },
  "vivent-byers-debut": {
    q: "Waar wonen de Byers aan het begin van seizoen 4?",
    choices: ["In Lenora Hills, Californië", "In Chicago", "In Salt Lake City", "Nog steeds in Hawkins"],
    fact: "Californië. De zon heeft er niets aan verholpen."
  },
  "accuse-publiquement-eddie": {
    q: "Wie beschuldigt Eddie Munson publiekelijk van het leiden van een sekte?",
    choices: ["Jason Carver", "Sheriff Powell", "Meneer Clarke", "Murray Bauman"],
    fact: "Jason Carver, basketbalaanvoerder en zelfbenoemd openbaar aanklager."
  },
  "objet-max-quitte": {
    q: "Welk voorwerp laat Max in seizoen 4 niet meer los?",
    choices: ["Haar walkman", "Haar skateboard", "Haar walkietalkie", "Haar fototoestel"],
    fact: "Een walkman en een cassette. De doeltreffendste overlevingsuitrusting van de hele serie."
  },
  "famille-will-jonathan": {
    q: "Spel de achternaam van Will, Jonathan en Joyce.",
    fact: "Byers. Het zwaarst beproefde gezin van Indiana, met ruime voorsprong."
  },
  "demogorgon-doit-manuel": {
    q: "De Demogorgon dankt zijn naam aan het Dungeons & Dragons-handboek van de jongens.",
    fact: "Waar. Het monster uit hun campagne gaf de naam aan het echte. Het spel levert er nog twee: Mind Flayer, en later Vecna."
  },
  "barb-retrouvee-vivante": {
    q: "Barb wordt aan het eind van seizoen 1 levend teruggevonden.",
    fact: "Onwaar, en dat is zacht uitgedrukt. Pas in seizoen 2 maakt iemand er zich echt druk om."
  },
  "objet-dessine-ici": {
    q: "Welk voorwerp is hier getekend?",
    choices: ["Een wafel", "Een wafelijzer", "Een putdeksel", "Een dambord"],
    fact: "Een wafel. Het enige levensmiddel dat Eleven uit een schuilplaats krijgt."
  },
  "appareil-party-utilise": {
    q: "Welk apparaat gebruikt de Party om contact te houden?",
    choices: ["Een walkietalkie", "Een rekenmachine", "Een radiotoestel", "Een metaaldetector"],
    fact: "De walkietalkie: het netwerk van de Party, met een zeer optimistisch opgegeven bereik."
  },
  "objet-toute-histoire": {
    q: "Met welk voorwerp is het hele verhaal begonnen?",
    choices: ["Een twintigzijdige dobbelsteen", "Een diamant", "Een voetbal", "Een discobal"],
    fact: "De twintigzijdige dobbelsteen. Die Will gooide aan het begin van alles — en die op een zeven viel."
  },
  "marque-gaufres-sert": {
    q: "Spel het wafelmerk dat Eleven als ruilmiddel gebruikt.",
    fact: "Eggo. Geen enkel ander merk heeft zoveel betekend in de strijd tegen het bovennatuurlijke."
  },
  "petite-lucas-redoutable": {
    q: "Spel de voornaam van het zusje van Lucas, geducht onderhandelaarster.",
    fact: "Erica Sinclair. Tarief: onbeperkt ijs. Niet onderhandelbaar."
  },
  "annee-deroule-saison": {
    q: "In welk jaar speelt seizoen 5 zich af?",
    choices: ["1987", "1985", "1986", "1988"],
    fact: "November 1987. Bijna precies vier jaar na de verdwijning van Will."
  },
  "etat-trouve-hawkins": {
    q: "In welke toestand verkeert Hawkins aan het begin van seizoen 5?",
    choices: ["Onder militaire quarantaine", "Volledig geëvacueerd", "Herbouwd en welvarend", "Van de kaart geveegd"],
    fact: "Quarantaine sinds de scheuren opengingen, in maart 1986. Er zijn meer militairen dan inwoners."
  },
  "steve-robin-travaillent": {
    q: "Waar werken Steve en Robin in seizoen 5?",
    choices: ["Bij radiostation WSQK", "Bij videotheek Family Video", "Bij Scoops Ahoy", "In de stadsbibliotheek"],
    fact: "\u201cThe Squawk\u201d. Robin presenteert er onder de naam Rockin' Robin en verstopt er gecodeerde boodschappen."
  },
  "petite-passe-premier": {
    q: "Welk zusje komt in seizoen 5 op de voorgrond?",
    choices: ["Holly Wheeler", "Erica Sinclair", "Sara Hopper", "Max Mayfield"],
    fact: "Holly, de jongste Wheeler, na acht jaar op de achtergrond bevorderd tot hoofdcast."
  },
  "sous-vecna-passer": {
    q: "Onder welke naam doet Vecna zich voor bij Holly?",
    choices: ["Meneer Misverstand", "Meneer Niemand", "De Vriend van Zolder", "Klaas Vaak"],
    fact: "Een denkbeeldige vriend — tot Karen doorheeft dat die \u201cHenry\u201d niets denkbeeldigs heeft."
  },
  "argyle-livreur-pizzas": {
    q: "Argyle, de pizzakoerier, keert terug in seizoen 5.",
    fact: "Onwaar: Eduardo Franco speelt de rol niet opnieuw. Het busje van Surfer Boy blijft in de garage."
  },
  "episodes-compte-saison": {
    q: "Uit hoeveel afleveringen bestaat seizoen 5?",
    choices: ["Acht", "Zeven", "Negen", "Tien"],
    fact: "Acht, uitgebracht in drie golven: vier, dan drie, dan de finale alleen."
  },

  /* ---------------- Niveau 2 ---------------- */
  "dirige-wolf-pack": {
    q: "Wie leidt de Wolf Pack, de eenheid die op Eleven wordt losgelaten?",
    choices: ["Dokter Kay", "Kolonel Sullivan", "Dokter Owens", "Dokter Brenner"],
    fact: "Een generaal én wetenschapper, gespeeld door Linda Hamilton. Ze jaagt op Eleven om haar bloed."
  },
  "appelle-zone-militaire": {
    q: "Hoe heet de militaire zone rond de hoofdscheur?",
    choices: ["De MAC-Z", "Starcourt", "De Creel-sector", "De Weathertop-zone"],
    fact: "Military Access Control Zone, opgetrokken op de plek van de stadsbibliotheek. Robin noemt het op de radio de \u201cBig Mac\u201d."
  },
  "personnage-absent-depuis": {
    q: "Welk personage, afwezig sinds seizoen 2, duikt weer op in seizoen 5?",
    choices: ["Kali, Proefpersoon Acht", "Barbara Holland", "Bob Newby", "Billy Hargrove"],
    fact: "Kali Prasad, wier gave illusie is en geen telekinese. De gebroeders Duffer zeiden op het juiste moment te wachten."
  },
  "etat-max-trouve": {
    q: "In welke toestand verkeert Max aan het begin van seizoen 5?",
    choices: ["In coma", "Vertrokken uit Hawkins", "Onder militair toezicht", "Allang hersteld"],
    fact: "In coma sinds maart 1986. Lucas bezoekt haar en draait cassettes voor haar."
  },
  "ecrivain-inspire-prison": {
    q: "Welke schrijfster inspireerde de naam van de mentale gevangenis in seizoen 5?",
    choices: ["Madeleine L'Engle", "Stephen King", "Ray Bradbury", "Ursula K. Le Guin"],
    fact: "Camazotz komt uit \u201cEen rimpel in de tijd\u201d. Holly leest het boek, en Holly geeft de naam."
  },
  "prison-mentale-max": {
    q: "Spel de naam van de mentale gevangenis waar Max wordt vastgehouden.",
    fact: "Camazotz: een gevangenis gemaakt van de herinneringen van Henry Creel. In het Maya betekent het woord een doodsvleermuis."
  },
  "laboratoire-gentiment-perce": {
    q: "Welk laboratorium boorde zo vriendelijk een gat naar een andere dimensie?",
    choices: ["Het Hawkins National Laboratory", "Black Mesa", "Het Creel-instituut", "Het station van Weathertop"],
    fact: "Officieel: ministerie van Energie. Officieus: \u201cwe dichten het lek, beloofd\u201d."
  },
  "appelle-club-lycee": {
    q: "Hoe heet de D&D-club van de middelbare school in seizoen 4?",
    choices: ["De Hellfire Club", "De AV Club", "De Party", "De Kring van de Demogorgon"],
    fact: "Voorgezeten door Eddie Munson. De stad dacht aan een satanische sekte. De stad had het mis."
  },
  "chanson-kate-bush": {
    q: "Welk nummer van Kate Bush wordt in seizoen 4 een reddingsvest?",
    choices: ["Running Up That Hill", "Wuthering Heights", "Cloudbusting", "Babooshka"],
    fact: "Een goed opgeladen walkman redt meer levens dan een pompgeweer."
  },
  "appelle-papa-eleven": {
    q: "Hoe heet de \u201cPapa\u201d van Eleven in het laboratorium?",
    choices: ["Dr. Martin Brenner", "Dr. Sam Owens", "Dr. Henry Creel", "Dr. Alexei Petrov"],
    fact: "Op de schaal van vaderfiguren ergens onder \u201cHopper na een avond drinken\u201d."
  },
  "radio-geante-dustin": {
    q: "Hoe heet de reuzenradio die Dustin bouwt om de Russen op te vangen?",
    choices: ["Cerebro", "Bumblebee", "Heathkit", "De Mind Flayer"],
    fact: "Opgesteld op de heuvel Weathertop. Twee nerdverwijzingen voor één apparaat."
  },
  "suzie": {
    q: "Wie is Suzie?",
    choices: [
      "Het vriendinnetje van Dustin, in Utah",
      "De zus van Robin",
      "Een Russische wetenschapper",
      "De lerares Engels van Hawkins High"
    ],
    fact: "Langeafstandsrelatie, zendamateur en een volstrekt rampzalig gevoel voor timing."
  },
  "russe-tres-sympathique": {
    q: "Welke buitengewoon sympathieke Rus verliest zijn hart aan kersen-Slurpees?",
    choices: ["Alexei", "Yuri", "Grigori", "Dmitri"],
    fact: "Hij wilde alleen zijn kermisknuffel houden. Deze serie vergeeft niets."
  },
  "disparue-tout-monde": {
    q: "Wie is de vermiste die iedereen vergeet in seizoen 1?",
    choices: ["Barbara Holland", "Chrissy Cunningham", "Heather Holloway", "Nancy Wheeler"],
    fact: "Gerechtigheid voor Barb. Nog altijd niet."
  },
  "salle-arcade-madmax": {
    q: "In welke speelhal verplettert MADMAX het record van Dig Dug?",
    choices: ["De Palace Arcade", "De Starcourt Arcade", "Het Hawkins Fun Center", "Surfer Boy"],
    fact: "Dustin eiste een hertelling. Dustin verloor."
  },
  "programme-gouvernemental-servi": {
    q: "Welk overheidsprogramma diende dr. Brenner als speeltuin?",
    choices: ["MKUltra", "Het Manhattanproject", "Blue Book", "Stargate"],
    fact: "MKUltra. Het enige letterwoord uit de serie dat helaas echt bestaat."
  },
  "appelle-mere-biologique": {
    q: "Hoe heet de biologische moeder van Eleven?",
    choices: ["Terry Ives", "Becky Ives", "Karen Wheeler", "Joyce Byers"],
    fact: "Terry Ives. Na de elektroshocks herhaalt ze zes flarden in een lus. Het duurde jaren voor iemand doorhad dat het een boodschap was."
  },
  "garcons-improvisent-caisson": {
    q: "Hoe improviseren de jongens een sensorische isolatietank?",
    choices: [
      "Een opzetbadje in de school, gevuld met strooizout",
      "Het gemeentelijk zwembad en zakken keukenzout",
      "Het bad van de Byers en heel veel ijsblokjes",
      "De tank die ze uit het laboratorium haalden"
    ],
    fact: "Ze kozen de school om de voorraad strooizout. Meneer Clarke gaf het recept door aan de telefoon, op een zaterdagavond, zonder één vraag te stellen."
  },
  "medecin-remplace-brenner": {
    q: "Welke arts vervangt Brenner aan het hoofd van het laboratorium in seizoen 2?",
    choices: ["Dr. Sam Owens", "Dr. Martin Brenner", "Dr. Alexei", "Dr. Victor Creel"],
    fact: "Owens. Aanzienlijk sympathieker, wat geen groot kunststuk was."
  },
  "kali-femme-eleven": {
    q: "Wie is Kali, de vrouw die Eleven terugvindt in Chicago?",
    choices: ["Proefpersoon Acht", "Haar halfzus", "Een gevluchte wetenschapper", "Een vriendin van Terry"],
    fact: "Acht. Ze maakt illusies, waaronder die van een plan dat zou kunnen werken."
  },
  "pourrit-champs-citrouilles": {
    q: "Wat rot er weg op de pompoenvelden rond Hawkins?",
    choices: [
      "De hele oogst, vergiftigd vanuit de tunnels",
      "Niets, het is een gerucht",
      "Alleen het veld van de Byers",
      "De aardappelen, niet de pompoenen"
    ],
    fact: "Boer Merrill beschuldigt zijn buurman Eugene van vergiftiging. Hopper gelooft er niets van: de rotting straalt uit vanaf het laboratorium."
  },
  "robin-perce-code": {
    q: "Hoe kraakt Robin de code van de Russische boodschap?",
    choices: [
      "Ze spreekt vier talen en decodeert op het gehoor",
      "Ze heeft een oom die vertaler is",
      "Ze gebruikt de computer van het laboratorium",
      "Ze vraagt het aan Murray"
    ],
    fact: "Vier talen, zegt ze: Spaans, Frans, Italiaans... en pig latin. Russisch zit er niet bij, wat haar er niet van weerhield alles te ontcijferen."
  },
  "gamins-tentent-neutraliser": {
    q: "Hoe proberen de kinderen de bezeten Billy uit te schakelen in seizoen 3?",
    choices: [
      "Door hem op te sluiten in de sauna",
      "Door hem neer te slaan met een knuppel",
      "Door hem naar het lab te lokken",
      "Door de politie te bellen"
    ],
    fact: "De sauna. Hitte tegen de Mind Flayer: hun beste idee van het seizoen."
  },
  "hopper-retenu-prisonnier": {
    q: "Waar wordt Hopper gevangengehouden aan het begin van seizoen 4?",
    choices: ["In Kamtsjatka, Rusland", "In het laboratorium van Hawkins", "In Alaska", "In de Upside Down"],
    fact: "Een goelag, een moker en een Demogorgon in de kuil. De ideale vakantie."
  },
  "maison-hawkins-mystere": {
    q: "Welk huis in Hawkins staat centraal in het mysterie van seizoen 4?",
    choices: ["Het Creel-huis", "Het Wheeler-huis", "Het Byers-huis", "Het Harrington-huis"],
    fact: "Het Creel-huis. Precies het soort pand dat geen enkele makelaar verkocht krijgt."
  },
  "victor-creel-trouve": {
    q: "Wie is Victor Creel en waar vind je hem?",
    choices: [
      "De vader van Henry, opgenomen in het gesticht van Pennhurst",
      "Een wetenschapper van het lab van Hawkins",
      "De burgemeester van Hawkins",
      "Een oud-collega van Brenner"
    ],
    fact: "Opgenomen sinds 1959 voor een misdaad die hij niet pleegde. Ook naar hem heeft niemand geluisterd."
  },
  "parc-mobil-homes": {
    q: "In welk caravanpark woont Eddie Munson?",
    choices: ["Forest Hills", "Lover's Lake", "Starcourt", "Roane Hills"],
    fact: "Forest Hills Trailer Park. De caravan van oom Wayne, en een plafond in erbarmelijke staat."
  },
  "famille-chef-police": {
    q: "Spel de achternaam van het hoofd van de politie van Hawkins.",
    fact: "Hopper. Zes letters, een postuur, en nul talent voor gesprekken."
  },
  "robin-buckley-parle": {
    q: "Robin Buckley spreekt vloeiend Russisch.",
    fact: "Onwaar. Ze claimt vier talen — Spaans, Frans, Italiaans en pig latin — maar geen Russisch. Ze heeft alles op het gehoor ontcijferd."
  },
  "eleven-fille-biologique": {
    q: "Eleven is de biologische dochter van Jim Hopper.",
    fact: "Onwaar: haar moeder is Terry Ives. Hopper adopteert haar later officieel, wat er niets aan afdoet."
  },
  "trois-personnes-ont": {
    q: "Drie van deze mensen werkten voor het laboratorium van Hawkins. Wie is de vreemde eend?",
    choices: ["Bob Newby", "Martin Brenner", "Sam Owens", "Connie Frazier"],
    fact: "Bob verkocht radio's bij RadioShack. De andere drie stonden op de loonlijst van het lab, elk op hun manier."
  },
  "trois-lieux-trouvent": {
    q: "Drie van deze plekken liggen in Hawkins. Welke is de vreemde eend?",
    choices: ["Lenora Hills", "Lover's Lake", "Forest Hills", "Starcourt Mall"],
    fact: "Lenora Hills ligt in Californië: daar probeerden de Byers een normaal leven op te bouwen."
  },
  "remettez-trois-moments-2": {
    q: "Zet deze drie momenten uit seizoen 3 in de juiste volgorde.",
    steps: [
      "Billy rijdt het wezen aan bij de staalfabriek",
      "Heather wordt ontvoerd bij het zwembad",
      "Starcourt Mall gaat in vlammen op"
    ],
    fact: "Billy wordt als eerste besmet, hij ontvoert Heather de dag erna, en alles eindigt in de brand van 4 juli."
  },
  "engin-party-traverse": {
    q: "Op welk voertuig doorkruist de Party Hawkins?",
    choices: ["Een fiets", "Een bril", "Een winkelwagen", "Een kruiwagen"],
    fact: "De fiets: het enige vervoermiddel van de Party, tot Steve zich liet inschakelen als chauffeur."
  },
  "centre-commercial-dure": {
    q: "Spel de naam van het winkelcentrum dat één zomer standhield.",
    fact: "Starcourt. Negen letters en een aanzienlijke verzekeringsrekening."
  },
  "club-jeu-role": {
    q: "Spel de naam van de rollenspelclub van Eddie Munson.",
    fact: "Hellfire. Een naam gekozen om te provoceren. Doel ruimschoots bereikt."
  },
  "regles-hopper-impose": {
    q: "Hoeveel regels legt Hopper Eleven op in de hut?",
    choices: ["Drie", "Eén enkele", "Vijf", "Tien"],
    fact: "Drie. Gordijnen altijd dicht, deur op slot, en niet naar buiten. Eleven overtrad ze alle drie op dezelfde avond."
  },
  "metier-murray-bauman": {
    q: "Wat is het echte beroep van Murray Bauman, vóór de complottheorieën?",
    choices: ["Onderzoeksjournalist", "FBI-agent", "Leraar Russisch", "Loodgieter"],
    fact: "Journalist, dan complotdenker, dan... eigenlijk de beste speurder van de serie."
  },
  "surnom-dustin-donne": {
    q: "Welke bijnaam geeft Dustin aan het monster van seizoen 4?",
    choices: ["Vecna", "De Mind Flayer", "De Demogorgon", "Henry"],
    fact: "Vecna, alweer uit D&D. Op dit punt zou dat handboek als bewijsstuk moeten gelden."
  },
  "sont-callahan-powell": {
    q: "Wie zijn Callahan en Powell?",
    choices: ["De hulpsheriffs van Hopper", "Twee agenten van het lab", "De ouders van Barb", "Twee leraren"],
    fact: "De twee hulpsheriffs. Hun bijdrage aan het onderzoek past in één donut."
  },
  "aide-hopper-evader": {
    q: "Wie helpt Hopper ontsnappen van binnenuit de Russische gevangenis?",
    choices: ["Dmitri, alias Enzo", "Yuri", "Grigori", "Alexei"],
    fact: "Dmitri. De codenaam \u201cEnzo\u201d kwam van het restaurant van de gemiste afspraak."
  },
  "tient-comptoir-palace": {
    q: "Wie staat achter de balie van de Palace Arcade en laat zich voor elk weetje betalen?",
    choices: ["Keith", "Murray", "Billy", "Steve"],
    fact: "Keith, gewoon werknemer. Zijn tarief: een afspraakje met Nancy Wheeler. Mike weigerde botweg; Dustin en Lucas wilden meteen tekenen."
  },

  /* ---------------- Niveau 3 ---------------- */
  "porte-coup-fatal": {
    q: "Wie geeft Vecna de genadeslag, en waarmee?",
    choices: [
      "Joyce Byers, met een bijl",
      "Eleven, met telekinese",
      "Hopper, met een geweer",
      "Will, door zijn krachten om te keren"
    ],
    fact: "Eleven spietst hem, Joyce maakt het af. Niemand in deze serie heeft Joyce Byers twee keer onderschat."
  },
  "revele-saison-nature": {
    q: "Wat onthult seizoen 5 over de aard van de Upside Down?",
    choices: [
      "Het is geen dimensie maar een wormgat",
      "Het is een collectieve droom van Vecna",
      "Het is de toekomst van Hawkins",
      "Het is een simulatie van het laboratorium"
    ],
    fact: "Een doorgang naar de Afgrond, de echte oorspronkelijke dimensie, opengehouden door een massa exotische materie."
  },
  "vient-reellement-pouvoir": {
    q: "Waar komt de kracht van Henry Creel werkelijk vandaan?",
    choices: [
      "Van een scharlaken steen die hij als kind in een mijn vond",
      "Van een experiment van dokter Brenner",
      "Van een beet van een Demogorgon",
      "Hij werd ermee geboren"
    ],
    fact: "Als scout in Nevada opent hij de koffer van een gewonde spion en raakt hij een fragment van de Mind Flayer aan. Daar begint alles."
  },
  "date-tombe-denouement": {
    q: "Welke datum valt in het hart van de ontknoping van seizoen 5?",
    choices: ["6 november 1987", "4 juli 1987", "31 december 1987", "12 november 1987"],
    fact: "Precies vier jaar na de verdwijning van Will. De serie sluit de cirkel op exact de datum waarop ze hem opende."
  },
  "representent-vecna-douze": {
    q: "Wat betekenen de twaalf ontvoerde kinderen voor Vecna?",
    choices: [
      "\u201cVolmaakte vaten\u201d",
      "Gijzelaars om mee te onderhandelen",
      "Een leger kindsoldaten",
      "Proefkonijnen voor dokter Kay"
    ],
    fact: "Twaalf kinderen in trance om de membranen tussen de werelden te verzwakken en, in zijn woorden, de wereld te hervormen."
  },
  "realisateur-sorti-retraite": {
    q: "Welke regisseur kwam uit zijn pensioen om twee afleveringen te tekenen?",
    choices: ["Frank Darabont", "Shawn Levy", "John Carpenter", "Sam Raimi"],
    fact: "De regisseur van The Shawshank Redemption tekent voor hoofdstuk drie en vijf. Hij verving Dan Trachtenberg, die elders vastzat."
  },
  "will-byers-coming": {
    q: "Will Byers komt in seizoen 5 uit de kast bij de groep.",
    fact: "Waar, in hoofdstuk zeven. De scène leverde de aflevering een gecoördineerde campagne van negatieve beoordelingen op."
  },
  "remettez-trois-moments": {
    q: "Zet deze drie momenten uit seizoen 5 in de juiste volgorde.",
    steps: [
      "Holly verdwijnt uit Hawkins",
      "Max ontwaakt uit haar coma",
      "Joyce onthoofdt Vecna"
    ],
    fact: "Van hoofdstuk twee tot hoofdstuk acht. Daartussen moest Max diep uit de herinneringen van Henry Creel worden opgehaald."
  },
  "sous-vecna": {
    q: "Onder welke naam werd Vecna geboren?",
    choices: ["Henry Creel", "Peter Ballard", "Victor Creel", "Martin Brenner"],
    fact: "Henry Creel, werd Één, werd Vecna — een naam van Dustin, altijd snel met zijn bestiarium."
  },
  "objet-obsedant-annonce": {
    q: "Welk obsederend voorwerp kondigt de dood van Vecna's slachtoffers aan?",
    choices: ["Een staande klok", "Een gebroken spiegel", "Een muziekdoos", "Een radiotoestel"],
    fact: "Vier klokslagen. Hoor je ze, pak dan je walkman. Snel."
  },
  "metier-bob-newby": {
    q: "Wat is het beroep van Bob Newby, held van Hawkins?",
    choices: ["Verkoper bij RadioShack", "Leraar wetenschappen", "Brandweerman", "Journalist"],
    fact: "Bob \u201cthe Brain\u201d, filiaalhouder. Als enige kende hij BASIC; hij ging naar beneden om de stroom te herstellen en de deuren te ontgrendelen. De Demodogs kregen hem in de hal te pakken, vlak bij de uitgang."
  },
  "professeur-sciences-fournit": {
    q: "Welke leraar wetenschappen levert magneten, advies en twijfelachtige metaforen?",
    choices: ["Meneer Clarke", "Meneer Hauser", "Meneer Wheeler", "Meneer Munson"],
    fact: "Scott Clarke: de enige volwassene in Hawkins die echt antwoord geeft op vragen."
  },
  "appelle-chatte-dart": {
    q: "Hoe heet de kat die Dart bij Dustin thuis opeet?",
    choices: ["Mews", "Yurtle", "Mittens", "Tews"],
    fact: "Mews, de geliefde kat van Claudia Henderson. Dustin begroef haar in de tuin en stuurde zijn moeder haar aan de andere kant van de wijk zoeken."
  },
  "pizzeria-travaille-argyle": {
    q: "In welke pizzeria werkt Argyle in seizoen 4?",
    choices: ["Surfer Boy Pizza", "Benny's Burgers", "Enzo's", "Scoops Ahoy"],
    fact: "Een busje, ananas en een sereniteit die deze serie verder nooit heeft gehaald."
  },
  "mois-annee-will": {
    q: "In welke maand en welk jaar verdwijnt Will Byers?",
    choices: ["November 1983", "Oktober 1984", "Juli 1985", "Maart 1986"],
    fact: "6 november 1983. Hij fietste terug van een potje D&D. Nooit alleen naar huis."
  },
  "appelle-bal-clot": {
    q: "Hoe heet het bal waarmee seizoen 2 afsluit?",
    choices: ["De Snow Ball", "De Spring Fling", "Het Hellfire-bal", "De Winter Formal"],
    fact: "December 1984. De schuifelplaat met de zwaarste gevolgen uit de televisiegeschiedenis."
  },
  "finit-donner-suzie": {
    q: "Wat geeft Suzie uiteindelijk aan Dustin om de wereld te redden?",
    choices: [
      "De constante van Planck",
      "De code van de labdeur",
      "De radiofrequentie van de Russen",
      "Haar skipak"
    ],
    fact: "Maar pas na een compleet liedje. De wereld heeft gewacht. Terecht."
  },
  "date-monde-envers": {
    q: "Op welke datum staat de Upside Down stil?",
    choices: [
      "Op 6 november 1983, de dag dat Will verdween",
      "Op 4 juli 1985, de dag van Starcourt",
      "Op 1 januari 1986",
      "Op geen enkele datum: er is daar geen tijd"
    ],
    fact: "Alles bleef daar bevroren op het moment dat Will verdween. De elegantste onthulling van de serie."
  },
  "appelle-lac-ouvre": {
    q: "Hoe heet het meer waar in seizoen 4 een scheur opengaat?",
    choices: ["Lover's Lake", "Lake Michigan", "Het Creel-meer", "Het Hawkins-meer"],
    fact: "Lover's Lake. De kinderen doopten de scheur \u201cWatergate\u201d. Ze waren er heel trots op."
  },
  "installation-eleven-retrouve": {
    q: "Hoe heet de installatie waar Eleven in seizoen 4 haar krachten terugvindt?",
    choices: ["Project NINA", "Project MKUltra", "Het Creel-laboratorium", "Station Cerebro"],
    fact: "Een isolatietank onderin een oude raketsilo in Nevada, en Brenner terug van weggeweest. Met Brenner loopt het nooit goed af."
  },
  "tueur-russe-poursuit": {
    q: "Welke Russische huurmoordenaar achtervolgt Hopper en Joyce door heel Hawkins?",
    choices: ["Grigori", "Alexei", "Dmitri", "Yuri"],
    fact: "Grigori. Burgemeester Kline doopt hem \u201cArnold Schwarzenegger\u201d — de gelijkenis met de T-800 is volledig bedoeld."
  },
  "metier-exerce-heather": {
    q: "Welk beroep oefent Heather Holloway uit in seizoen 3?",
    choices: [
      "Badmeester bij het gemeentelijk zwembad",
      "Verkoopster in Starcourt Mall",
      "Serveerster bij Enzo's",
      "Journaliste bij de Hawkins Post"
    ],
    fact: "Badmeester, en collega van Billy — die haar ontvoert de dag na zijn eigen besmetting. Haar vader leidt de Hawkins Post."
  },
  "gamins-detournent-demodogs": {
    q: "Hoe lokken de kinderen de Demodogs weg van het laboratorium?",
    choices: [
      "Door de knoop van de tunnels in brand te steken met benzine",
      "Door ze te lokken met rauw vlees",
      "Door een radiosignaal uit te zenden",
      "Door zout in de gangen te strooien"
    ],
    fact: "Het rauwe vlees, een paar afleveringen eerder uitgeprobeerd op het autokerkhof, mislukte jammerlijk: Dart houdt van levend. Bleef de benzine over."
  },
  "nancy-jonathan-preparent": {
    q: "Hoe bereiden Nancy en Jonathan hun val voor de Demogorgon voor?",
    choices: [
      "Een berenklem, benzine en veel onvoorzichtigheid",
      "Een geëlektrificeerde kooi",
      "Een net en een knuppel met spijkers",
      "Een zelfgemaakte bom"
    ],
    fact: "Ze kochten het hele arsenaal bij een wapenhandelaar die geen enkele vraag stelde. 1983, dus."
  },
  "morceau-eddie-munson": {
    q: "Welk nummer speelt Eddie Munson vanuit de Upside Down?",
    choices: ["Master of Puppets", "Enter Sandman", "Paranoid", "Ace of Spades"],
    fact: "De duurste solo uit de geschiedenis van de amateurrock. En de meest verdiende."
  },
  "contrebandier-russe-accepte": {
    q: "Welke Russische smokkelaar neemt het geld aan en bedenkt zich dan?",
    choices: ["Yuri Ismaylov", "Dmitri", "Grigori", "Alexei"],
    fact: "Yuri, vliegtuigpiloot en pindakaasverkoper. Een moeilijk te volgen carrièreswitch."
  },
  "connie-frazier": {
    q: "Wie is Connie Frazier?",
    choices: [
      "De infiltrante van het lab die Benny neerschiet",
      "Een verpleegster van het laboratorium",
      "De moeder van Barb",
      "Een journaliste uit Hawkins"
    ],
    fact: "Nep-maatschappelijk werk, echt vuurwapen. De serie liet er al in aflevering 2 geen twijfel over bestaan."
  },
  "becky-ives": {
    q: "Wie is Becky Ives?",
    choices: ["De zus van Terry", "De moeder van Barb", "Een verpleegster van het lab", "De tante van Max"],
    fact: "Becky, die al jaren voor Terry zorgt in een huis vol stilte."
  },
  "film-personnages-regardent": {
    q: "Welke film kijken de personages in de bioscoop van Starcourt?",
    choices: ["Back to the Future", "Day of the Dead", "The Goonies", "E.T."],
    fact: "Dustin verstopt iedereen in een uitverkochte avant-première om de Russen af te schudden. Day of the Dead hangt alleen als affiche in de hal."
  },
  "equipe-basket-jason": {
    q: "Welk basketbalteam leidt Jason Carver naar de finale?",
    choices: ["De Hawkins Tigers", "De Demogorgons", "De Wildcats", "De Bulldogs"],
    fact: "De Hawkins Tigers. De wedstrijd en het concert van Eddie vallen precies samen."
  },
  "eleven-montre-pouvoirs": {
    q: "Hoe toont Eleven de jongens voor het eerst haar krachten?",
    choices: [
      "Ze slaat de slaapkamerdeur op afstand dicht",
      "Ze plet een blikje met haar gedachten",
      "Ze laat de Millennium Falcon zweven",
      "Ze doet de kerstverlichting aan"
    ],
    fact: "Lucas wilde naar boven om Karen Wheeler te waarschuwen: de deur ging vanzelf dicht en Elevens neus bloedde. Dat beroemde geplette blikje is een herinnering uit het laboratorium."
  },
  "tortue-dustin": {
    q: "Hoe heet de schildpad van Dustin?",
    choices: ["Yurtle", "Mews", "Dart", "Chester"],
    fact: "Yurtle, met een U — een knipoog naar de schildpad van Dr. Seuss. Uit haar terrarium gezet om plaats te maken voor Dart, kwam ze er veel beter vanaf dan de kat."
  },
  "plus-jeune-wheeler": {
    q: "Wat is de voornaam van de jongste Wheeler?",
    choices: ["Holly", "Karen", "Erica", "Sara"],
    fact: "Holly. Zij zag de lampjes bewegen bij de Byers, en daarna een gestalte door de muur duwen. Niemand geloofde haar."
  },
  "gagne-alexei-fete": {
    q: "Wat wint Alexei op de kermis, vlak voor het einde?",
    choices: ["Een knuffel van Woody Woodpecker", "Een goudvis", "Een ballon", "Een pet"],
    fact: "Hij schoot alle ballonnen lek zonder er één te missen, rende toen naar Murray om te roepen dat het niet doorgestoken kaart was. Grigori schoot hem meteen neer."
  },
  "famille-vecna-celui": {
    q: "Spel de achternaam van Vecna, die waarmee hij geboren werd.",
    fact: "Creel. Een familienaam, een huis en zestig jaar misverstand."
  },
  "monde-envers-fige": {
    q: "De Upside Down staat stil op de dag dat Will Byers verdween.",
    fact: "Waar. Nancy ontdekt het door haar dagboek open te slaan: de bladzijde bleef staan op 6 november 1983."
  },
  "alexei-triche-gagner": {
    q: "Alexei heeft vals gespeeld om zijn knuffel op de kermis te winnen.",
    fact: "Onwaar, en daar zit precies de charme van de scène: hij schoot alle ballonnen lek zonder er één te missen en rende naar Murray om te roepen dat het eerlijk was."
  },
  "trois-personnages-sont": {
    q: "Drie van deze personages zijn Russisch. Wie is de vreemde eend?",
    choices: ["Murray Bauman", "Alexei", "Grigori", "Dmitri"],
    fact: "Murray is Amerikaan. Hij spreekt Russisch, wat niet helemaal hetzelfde is — en wat hem meer dan eens heeft gered."
  },
  "remettez-trois-moments-3": {
    q: "Zet deze drie momenten uit seizoen 1 in de juiste volgorde.",
    steps: [
      "Will verdwijnt op de weg naar huis",
      "Joyce schildert het alfabet op de woonkamermuur",
      "De jongens vullen een opzetbadje met zout"
    ],
    fact: "Van 6 tot 12 november 1983. Zes dagen waarin niemand sliep, Joyce voorop."
  },
  "remettez-trois-moments-4": {
    q: "Zet deze drie momenten uit de serie in de juiste volgorde.",
    steps: [
      "Het Snow Ball-bal",
      "De brand in Starcourt Mall",
      "Het eerste slachtoffer van Vecna"
    ],
    fact: "December 1984, juli 1985, maart 1986. Hawkins heeft nooit meer dan achttien maanden rust gekend."
  },
  "objet-arrache-max": {
    q: "Welk voorwerp rukte Max los uit de klauwen van Vecna?",
    choices: ["Een cassettewalkman", "Een videorecorder", "Een fototoestel", "Een broodrooster"],
    fact: "De walkman van Max. De doeltreffendste overlevingsuitrusting die ooit tegen Vecna is ingezet."
  },
  "russe-amateur-slurpee": {
    q: "Spel de voornaam van de Rus die dol is op kersen-Slurpees.",
    fact: "Alexei. Het innemendste personage dat het ooit zes afleveringen volhield."
  },
  "salle-arcade-hawkins": {
    q: "Spel de naam van de speelhal van Hawkins.",
    fact: "De Palace Arcade. Keith staat er achter de balie en laat zich voor elk weetje betalen."
  },
  "petite-amie-dustin": {
    q: "Spel de voornaam van het vriendinnetje van Dustin, ergens in Utah.",
    fact: "Suzie. Ze bestaat echt. Niemand geloofde het, en dat is enigszins begrijpelijk."
  },

  /* ---------------- Complément d'équilibrage ---------------- */
  "nom-creature-dustin": {
    q: "Welke naam geeft Dustin aan het wezen dat hij in seizoen 2 opvangt?",
    choices: ["Dart", "Rex", "Yertle", "Spock"],
    fact: "Dart, kort voor D'Artagnan. Yertle was de schildpad. Dustin heeft een thema."
  },
  "travail-steve-robin-1985": {
    q: "Waar werken Steve en Robin in de zomer van 1985?",
    choices: [
      "Bij Scoops Ahoy, de ijssalon van Starcourt",
      "In de Palace Arcade",
      "Bij Melvald's General Store",
      "Bij de Hawkins Post"
    ],
    fact: "Scoops Ahoy. De matrozenhoed was niet onderhandelbaar, het contract evenmin."
  },
  "epeler-centre-commercial": {
    q: "Spel de naam van het winkelcentrum van Hawkins.",
    fact: "Starcourt. Het maakte het stadscentrum kapot lang voordat de Russen zich in de kelder vestigden."
  },
  "club-donjons-dragons-lycee": {
    q: "Hoe heet de Dungeons & Dragons-club van de middelbare school van Hawkins?",
    choices: ["De Hellfire Club", "De Dragon Club", "De AV Club", "De Cerebro Club"],
    fact: "De Hellfire Club, voorgezeten door Eddie Munson. T-shirts inbegrepen."
  },
  "morceau-sauve-max": {
    q: "Welk nummer rukt Max los uit de greep van Vecna?",
    choices: [
      "Running Up That Hill",
      "Should I Stay or Should I Go",
      "Never Ending Story",
      "Master of Puppets"
    ],
    fact: "Running Up That Hill, van Kate Bush. Uitgebracht in 1985, zevenendertig jaar later terug bovenaan de hitlijsten."
  },
  "ou-vit-eleven-debut": {
    q: "Waar woont Eleven aan het begin van seizoen 4?",
    choices: ["In Lenora Hills, Californië", "In Hawkins", "In Chicago", "In Alaska"],
    fact: "Lenora Hills, Californië. De zon hielp niet, en de middelbare school nog minder."
  },
  "instrument-eddie-munson": {
    q: "Welk instrument bespeelt Eddie Munson?",
    choices: ["Elektrische gitaar", "Drums", "Keyboard", "Basgitaar"],
    fact: "Gitaar. De dapperste solo ooit gespeeld vanaf het dak van een caravan."
  },
  "combien-receptacles-vecna": {
    q: "Hoeveel kinderen ontvoert Vecna om er zijn \u201cvolmaakte vaten\u201d van te maken?",
    choices: ["Twaalf", "Vier", "Zeven", "Eenentwintig"],
    fact: "Twaalf. Vecna heeft nooit halve maatregelen gekend, en discretie al helemaal niet."
  },
  "envers-dimension-parallele": {
    q: "De Upside Down is wel degelijk een parallelle dimensie, zoals men sinds 1983 dacht.",
    fact: "Onwaar: seizoen 5 hakt de knoop door, het is een wormgat. Vier seizoenen misverstand."
  },
  "ministere-laboratoire-hawkins": {
    q: "Onder welk Amerikaans ministerie valt het laboratorium van Hawkins officieel?",
    choices: [
      "Het ministerie van Energie",
      "Het ministerie van Defensie",
      "Het ministerie van Binnenlandse Zaken",
      "NASA"
    ],
    fact: "Het ministerie van Energie. Een handige dekmantel voor een gang die nergens in de buurt van een centrale uitkomt."
  },
  "pseudo-arcade-max": {
    q: "Onder welk pseudoniem troont Max bovenaan de scorelijst van de speelhal?",
    choices: ["MADMAX", "MAXINE", "ZOOMER", "REDHEAD"],
    fact: "MADMAX, op Dig Dug. Dustin en Lucas speurden wekenlang om te eindigen achter een meisje van dertien."
  }
};
/* Exposé explicitement : un const de portée script n'atterrit pas sur window. */
window.QUESTIONS_NL = QUESTIONS_NL;
