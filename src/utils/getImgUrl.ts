import bgWhite from '../assets/icons/bg-white.jpg';

export const getImageUrl = (path: string | null): string => {
  if (!path) return bgWhite;
  return `https://image.tmdb.org/t/p/original/${path}`;
};
