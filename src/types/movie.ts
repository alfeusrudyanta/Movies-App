interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface BaseMovie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids?: number[];
  genres?: Genre[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// For search movies: /search/movie?query={movie_name}
interface MovieSearchResponse {
  page: number;
  results: BaseMovie[];
  total_pages: number;
  total_results: number;
}

// For new released: /movie/now_playing
interface NowPlayingResponse extends MovieSearchResponse {
  dates: {
    maximum: string;
    minimum: string;
  };
}

// For trending movies: /trending/movie/week
interface TrendingMovie extends BaseMovie {
  media_type: 'movie';
}

interface TrendingResponse {
  page: number;
  results: TrendingMovie[];
}

// For detailed movies /movie/{movie_id}
interface MovieDetails extends BaseMovie {
  belongs_to_collection: null | {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  };
  budget: number;
  homepage: string;
  imdb_id: string;
  origin_country: string[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string | null;
}

// For movie videos /movie/{movie_id}/videos
interface MovieVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

interface MovieVideosResponse {
  id: number;
  results: MovieVideo[];
}

interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  order: number;
}

interface CrewMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

interface MovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export type {
  MovieSearchResponse as MovieSearch,
  NowPlayingResponse as NewReleased,
  TrendingResponse as TrendingMovies,
  MovieDetails,
  MovieVideosResponse as MovieVideos,
  MovieCredits,
  BaseMovie,
};
