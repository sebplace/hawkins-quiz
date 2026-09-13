# Polices

Deux familles, toutes deux publiées sous **SIL Open Font License 1.1**, qui autorise
l'utilisation, la modification et la redistribution, y compris auto-hébergée.

| Famille | Graisses | Auteur | Source |
|---|---|---|---|
| Rozha One | 400 | Indian Type Foundry | https://fonts.google.com/specimen/Rozha+One |
| Space Grotesk | 400, 500, 700 | Florian Karsten | https://fonts.google.com/specimen/Space+Grotesk |

Les fichiers `.woff2` de ce dossier sont les sous-ensembles **latin** et **latin-ext**
servis par l'API Google Fonts, récupérés une fois puis versionnés ici. Les règles
`@font-face` correspondantes vivent dans `../fonts.css` et conservent les
`unicode-range` d'origine : un lecteur francophone ne télécharge donc que les
fichiers `latin`, soit environ 75 Ko.

Les héberger nous-mêmes supprime toute requête vers un tiers, et surtout garantit
que l'application garde sa typographie lorsqu'elle tourne hors ligne.

Le texte complet de la licence est disponible à l'adresse
https://openfontlicense.org/
