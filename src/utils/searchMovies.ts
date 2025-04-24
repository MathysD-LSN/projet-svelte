 // Fonction pour effectuer la recherche
 export const searchMovies = async (query : string ) => {
  if (!query) return; // Si la requête est vide, ne rien faire
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=fr-FR&page=1`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des films');
    }

    const data = await response.json();
    return data.results.slice(0, 5); // Limite les résultats
  } catch (error) {
    console.error('Erreur:', error);
  }
};