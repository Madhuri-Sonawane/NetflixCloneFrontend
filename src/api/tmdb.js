const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE = "https://api.themoviedb.org/3";

export const IMG_BASE = "https://image.tmdb.org/t/p/w500";

// Fetch helper
async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("TMDB API Error");
  return res.json();
}

// Fetch genres
export function fetchGenres() {
  return fetchJSON(`${BASE}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
}

// Discover movies (filters)
export function discoverMovies({ genreIds = [], rating = 0, year = "", query = "" }) {

  // If searching → use search endpoint instead
  if (query && query.trim()) {
    const q = encodeURIComponent(query);
    return fetchJSON(
      `${BASE}/search/movie?api_key=${API_KEY}&query=${q}&include_adult=false`
    );
  }

  const withGenres = genreIds.length ? `&with_genres=${genreIds.join(",")}` : "";
  const voteFilter = rating ? `&vote_average.gte=${rating}` : "";
  const yearFilter = year ? `&primary_release_year=${year}` : "";

  const url = `${BASE}/discover/movie?api_key=${API_KEY}${withGenres}${voteFilter}${yearFilter}&sort_by=popularity.desc`;

  return fetchJSON(url);
}

// Movie details + videos
export function fetchMovieDetails(id) {
  return fetchJSON(
    `${BASE}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
  );
}
