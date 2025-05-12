const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export interface Movie {
	vote_average: number;
	genre: string;
	id: number;
	title: string;
	overview: string;
	poster_path: string | null;
}

export const getMovies = async (): Promise<Movie[]> => {
	const allMovies: Movie[] = [];
	let page = 1;
	let totalPages = 1;

	try {
		do {
			const res = await fetch(
				`https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&page=${page}`,
				{
					headers: {
						Authorization: `Bearer ${apiKey}`,
						Accept: 'application/json'
					}
				}
			);
			if (!res.ok) throw new Error(`TMDB error, page ${page}`);
			const data = await res.json();

			allMovies.push(...data.results);

			totalPages = data.total_pages;
			page++;
		} while (page <= totalPages);

		return allMovies;
	} catch (err) {
		console.error('getMovies — Erreur :', err);
		return [];
	}
};
