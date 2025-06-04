const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const MAX_PAGES = 10;

export interface Movie {
	vote_average: number;
	genre_ids: number[];
	id: number;
	title: string;
	overview: string;
	poster_path: string | null;
}

export interface Genre {
	id: number;
	name: string;
}

type GenreResponse = {
	genres: Genre[];
};

// 🔹 Récupère les films actuellement en salle (avec pagination jusqu'à MAX_PAGES)
export const getMovies = async (): Promise<Movie[]> => {
	try {
		const res1 = await fetch(`${BASE_URL}/movie/now_playing?language=fr-FR&page=1`, {
			headers: { Authorization: `Bearer ${API_KEY}` }
		});
		if (!res1.ok) throw new Error('TMDB error, page 1');
		const data1 = await res1.json();

		const totalPages = Math.min(data1.total_pages, MAX_PAGES);
		const firstResults: Movie[] = data1.results;

		const pageNumbers = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);
		const fetchPages = pageNumbers.map((page) =>
			fetch(`${BASE_URL}/movie/now_playing?language=fr-FR&page=${page}`, {
				headers: { Authorization: `Bearer ${API_KEY}` }
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

// 🔹 Récupère la liste des genres de films
export const fetchMovieGenres = async (): Promise<Genre[]> => {
	try {
		const response = await fetch(`${BASE_URL}/genre/movie/list?language=fr-FR`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${API_KEY}`,
				Accept: 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data: GenreResponse = await response.json();
		return data.genres;
	} catch (error) {
		console.error('Failed to fetch movie genres:', error);
		return [];
	}
};

// 🔹 Recherche de films par mot-clé (limite à 5 résultats)
export const searchMovies = async (query: string): Promise<Movie[] | undefined> => {
	if (!query) return;

	try {
		const response = await fetch(
			`${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=fr-FR&page=1`,
			{
				headers: {
					Authorization: `Bearer ${API_KEY}`,
					Accept: 'application/json'
				}
			}
		);

		if (!response.ok) {
			throw new Error('Erreur lors de la récupération des films');
		}

		const data = await response.json();
		return data.results.slice(0, 5);
	} catch (error) {
		console.error('Erreur:', error);
	}
};
