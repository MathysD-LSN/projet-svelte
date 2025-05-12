import type { PageLoad } from './$types';
import { getMovies } from '../../utils/getMovies';

export const load: PageLoad = async () => {
	try {
		const movies = await getMovies();
		return { movies };
	} catch (err) {
		console.error('Erreur chargement catalogue:', err);
		return {
			movies: []
		};
	}
};
