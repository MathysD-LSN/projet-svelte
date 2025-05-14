export interface Genre {
  id: number;
  name: string;
};

type GenreResponse = {
  genres: Genre[];
};

const API_URL = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;



export async function fetchMovieGenres(): Promise<Genre[]> {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json'
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
}
