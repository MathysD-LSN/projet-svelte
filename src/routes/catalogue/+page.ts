import type { PageLoad } from './$types';
import { getMovies } from '../../utils/moviesUtils';
import { fetchMovieGenres } from '../../utils/moviesUtils';

export const load: PageLoad = async () => {
	try {
		const movies = await getMovies();
		const genres = await fetchMovieGenres();
		return { genres, movies };
	} catch (err) {
		console.error('Erreur chargement catalogue:', err);
		return {
			movies: []
		};
	}
};
