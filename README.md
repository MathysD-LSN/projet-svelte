# Cinefilm

## Description

Cinefilm est une application web qui permet de découvrir facilement les films en salles, grâce à l’API The Movie Database (TMDB). L’interface est pensée pour offrir une expérience fluide et agréable.

### Les principales fonctionnalités de Cinefilm incluent :

- **Accueil** : affichage des dernières sorties en salle avec affiches, titres et résumés.
- **Recherche** : barre de recherche réactive avec suggestions en temps réel (jusqu’à 5 résultats).
- **Pages films** : pages détaillées avec affiche, résumé, date de sortie, note, durée, casting, etc.
- **Pages acteurs** : biographie, photo, infos principales et sélection de leurs films récents.
- **Catalogue** : liste complète des films à l’affiche, avec filtres par genre et note, pagination intégrée.

## Installation et exécution en local

Pour exécuter Cinefilm en local sur votre machine de développement, suivez ces étapes :

### Cloner le dépôt

Récupérez le code source du projet depuis GitHub en clonant le dépôt MathysD-LSN/projet-svelte. Par exemple, via la ligne de commande :

```bash
git clone https://github.com/MathysD-LSN/projet-svelte
```

puis placez-vous dans le dossier du projet avec :

```bash
cd projet-svelte
```

### Installer les dépendances

Assurez-vous d’avoir Node.js installé, puis installez les dépendances npm du projet en exécutant :

```bash
npm install
```

Cela télécharge tous les modules requis (framework SvelteKit, Vite, Tailwind, etc.).

### Configurer l’API TMDB

Le projet nécessite une clé API TMDB pour fonctionner. Créez un fichier `.env` à la racine du projet et ajoutez-y la ligne suivante :

```bash
VITE_TMDB_API_KEY=<votre_clé_tmdb>
```

en remplaçant <VITE_TMDB_API_KEY> par votre clé personnelle TMDB. (Astuce : vous pouvez obtenir une clé en créant un compte sur le site de The Movie Database. Cette clé est nécessaire pour autoriser les appels à l’API.)

Pour avoir votre clé API, cliquez sur ce lien https://www.themoviedb.org/settings/api et créez vous un compte.

Puis copier le "Jeton d'accès en lecture à l'API" et collez le dans votre `.env`.

Assurez-vous que le fichier `.env` est bien enregistré à la racine du projet – il sera automatiquement pris en compte par Vite et SvelteKit pour fournir la clé à l’application.

### Lancer le serveur de développement

Démarrez l’application en mode développement avec la commande :

```bash
npm run dev
```

Cette commande lance le serveur Vite/SvelteKit sur le port 5173 (ou autre port indiqué dans la console).

## Technologies utilisées

Cinefilm s’appuie sur un écosystème moderne de technologies web :

- SvelteKit
- Vite
- Tailwind CSS
- TypeScript
- API TMDB (The Movie Database)
