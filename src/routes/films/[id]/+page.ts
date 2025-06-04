import { error } from '@sveltejs/kit';

// Fonction pour appeler l'API et récupérer les informations du film
export const load = async ({ params, fetch }) => {
	const movieId = params.id;
	const apiKey = import.meta.env.VITE_TMDB_API_KEY;

	try {
		const responseMovie = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
			{
				headers: {
					Authorization: `Bearer ${apiKey}`,
					Accept: 'application/json'
				}
			}
		);

		if (!responseMovie.ok) {
			throw new Error('Failed to fetch movie data');
		}
		const responseAlternativeMovies = await fetch(
			` https://api.themoviedb.org/3/movie/${movieId}/alternative_titles`,
			{
				headers: {
					Authorization: `Bearer ${apiKey}`,
					Accept: 'application/json'
				}
			}
		);

		if (!responseAlternativeMovies.ok) {
			throw new Error('Failed to fetch alternative movies data');
		}

		const responseCredits = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
			{
				headers: {
					Authorization: `Bearer ${apiKey}`,
					Accept: 'application/json'
				}
			}
		);

		if (!responseCredits.ok) {
			throw new Error('Failed to fetch alternative movies data');
		}

		const dataMovie = await responseMovie.json();
		const dataAlternativeMovies = await responseAlternativeMovies.json();
		const dataCredits = await responseCredits.json();

		return {
			movieData: dataMovie,
			alternativeMovies: dataAlternativeMovies,
			credits: dataCredits
		};
	} catch (err) {
		console.error('Error fetching movie data:', err);
		throw error(500, 'Error fetching movie data');
	}
};
