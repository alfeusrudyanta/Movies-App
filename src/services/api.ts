import AxiosInstance from './axios';
import type {
  MovieSearch,
  NewReleased,
  TrendingMovies,
  MovieDetails,
  MovieVideos,
  MovieCredits,
} from '../types/movie';

export const api = {
  getMovieSearch: async (movieName: string): Promise<MovieSearch> => {
    const res = await AxiosInstance.get('/search/movie', {
      params: {
        query: movieName,
      },
    });
    return res.data;
  },

  getNewReleased: async (): Promise<NewReleased> => {
    const res = await AxiosInstance.get('/movie/now_playing');
    return res.data;
  },

  getTrendingMovies: async (): Promise<TrendingMovies> => {
    const res = await AxiosInstance.get('/trending/movie/week');
    return res.data;
  },

  getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
    const res = await AxiosInstance.get(`/movie/${movieId}`);
    return res.data;
  },

  getMovieTrailer: async (movieId: number): Promise<MovieVideos> => {
    const res = await AxiosInstance.get(`movie/${movieId}/videos`);
    return res.data;
  },

  getMovieCredit: async (movieId: number): Promise<MovieCredits> => {
    const res = await AxiosInstance.get(`movie/${movieId}/credits`);
    return res.data;
  },
};
