const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const getMovies = async (page: number = 1): Promise<unknown[] | undefined> => {
	try {
		// Calcul de la page TMDB correspondante (20 films par page TMDB)
		const tmdbPage = Math.floor(((page - 1) * 8) / 20) + 1;

		const response = await fetch(
			`https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&page=${tmdbPage}`,
			{
				headers: {
					Authorization: `Bearer ${apiKey}`,
					Accept: 'application/json'
				}
			}
		);

		if (!response.ok) {
			throw new Error('Erreur lors de la récupération des films');
		}

		const data = await response.json();
		// Indice de départ dans les résultats TMDB pour cette page
		const startIndex = ((page - 1) * 8) % data.results.length;
		// Retourne les 8 films correspondants
		return data.results.slice(startIndex, startIndex + 8);
	} catch (error) {
		console.error('getMovies — Erreur :', error);
	}
};
