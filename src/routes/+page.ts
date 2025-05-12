import { getMovies } from '../utils/getMovies';
import type { Movie } from '../utils/getMovies';

export async function load() {
	try {
		const all = await getMovies();
		const movies: Movie[] = all.slice(0, 8);
		return { movies };
	} catch (e) {
		console.error('Erreur lors du chargement des films :', e);
		return { movies: [] };
	}
}
