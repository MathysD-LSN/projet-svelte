const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export interface Movie {
	vote_average: number;
	genre_ids: number[];
	id: number;
	title: string;
	overview: string;
	poster_path: string | null;
}

const MAX_PAGES = 10;

export const getMovies = async (): Promise<Movie[]> => {
	try {
		const res1 = await fetch(
			`https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&page=1`,
			{ headers: { Authorization: `Bearer ${apiKey}` } }
		);
		if (!res1.ok) throw new Error('TMDB error, page 1');
		const data1 = await res1.json();

		const totalPages = Math.min(data1.total_pages, MAX_PAGES); // Limite ici
		const firstResults: Movie[] = data1.results;

		const pageNumbers = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);
		const fetchPages = pageNumbers.map((page) =>
			fetch(`https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&page=${page}`, {
				headers: { Authorization: `Bearer ${apiKey}` }
			})
				.then((res) => {
					if (!res.ok) throw new Error(`TMDB error, page ${page}`);
					return res.json();
				})
				.then((json) => json.results as Movie[])
		);

		const otherResultsArrays = await Promise.all(fetchPages);
		return firstResults.concat(...otherResultsArrays);
	} catch (err) {
		console.error('getMovies — Erreur :', err);
		return [];
	}
};
