import { error } from '@sveltejs/kit';

// Fonction pour appeler l'API et récupérer les informations de la personne
export const load = async ({ params, fetch }) => {
	const personId = params.id;
	const apiKey = import.meta.env.VITE_TMDB_API_KEY;

	try {
		const response = await fetch(`https://api.themoviedb.org/3/person/${personId}?language=en-US`, {
			headers: {
				Authorization: `Bearer ${apiKey}`,
				Accept: 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error('Failed to fetch person data');
		}

		const responseMovies = await fetch(
			`https://api.themoviedb.org/3/person/${personId}/movie_credits?language=en-US`,
			{
				headers: {
					Authorization: `Bearer ${apiKey}`,
					Accept: 'application/json'
				}
			}
		);

		if (!responseMovies.ok) {
			throw new Error('Failed to fetch person data');
		}

		const data = await response.json();
		const dataMovies = await responseMovies.json();

		return {
			actorData: data,
			moviesData: dataMovies
		};
	} catch (err) {
		console.error('Error fetching person data:', err);
		throw error(500, 'Error fetching person data');
	}
};
