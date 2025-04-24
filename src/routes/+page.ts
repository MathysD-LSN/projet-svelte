// src/routes/+page.ts
import { getMovies } from '../utils/getMovies';

export async function load() {
	try {
		const movies = await getMovies(1);
		return {
			movies: movies || []
		};
	} catch (e) {
		console.error('Erreur lors du chargement des films :', e);
		return {
			movies: []
		};
	}
}
