import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { getImageUrl } from '../utils/getImgUrl';
import type { TrendingMovies, NewReleased } from '../types/movie';
import Button from '../components/ui/Button';
import useResponsiveToggle from '../hooks/useResponsiveToggle';
import { Link } from 'react-router-dom';
import MoviesCard from '../components/MoviesCard';

const HomePage: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<TrendingMovies | null>(
    null
  );
  const [newMovies, setNewMovies] = useState<NewReleased | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [showAllNewMovies, setShowAllNewMovies] = useState(false);
  const { isMobile } = useResponsiveToggle();

  useEffect(() => {
    const fetchData = async () => {
      const [trending, newReleased] = await Promise.all([
        api.getTrendingMovies(),
        api.getNewReleased(),
      ]);
      setTrendingMovies(trending);
      setNewMovies(newReleased);
    };

    fetchData();
  }, []);

  const handleMovieHover = (index: number) => {
    setFeaturedIndex(index);
  };

  const handleLoadMore = () => {
    setShowAllNewMovies(true);
  };

  if (!trendingMovies || !newMovies) {
    return (
      <div className='absolute text-white text-[16px] text-center top-1/2 left-1/2'>
        Loading...
      </div>
    );
  }

  const featuredMovie = trendingMovies.results[featuredIndex];
  const displayedNewMovies = showAllNewMovies
    ? newMovies.results
    : isMobile
    ? newMovies.results.slice(0, 8)
    : newMovies.results.slice(0, 15);

  return (
    <div className='flex flex-col'>
      {/* Featured Movie Section */}
      <div className='relative'>
        <div className='max-h-[810px] overflow-hidden min-h-[450px] md:min-h-[530px]'>
          <img
            src={getImageUrl(featuredMovie.backdrop_path)}
            alt={featuredMovie.title}
            className='w-full h-full object-cover min-h-[400px] md:min-h-[610px]'
            loading='lazy'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-black/0 to-black to-[103.21%] overflow-hidden' />
        </div>
        <div className='absolute px-4 top-[200px] md:top-[300px] md:left-[125px] md:mr-[120px] flex flex-col gap-6 md:gap-12 md:max-w-[635px]'>
          <div className='flex flex-col gap-[6px] md:gap-4'>
            <p className='font-bold text-[24px] md:text-[48px] leading-[36px] md:leading-[60px] text-[#FDFDFD]'>
              {featuredMovie.title}
            </p>
            <p className='font-normal text-[14px] md:text-[16px] leading-[28px] md:leading-[30px] text-[#A4A7AE] '>
              {featuredMovie.overview}
            </p>
          </div>
          <div className='flex flex-col md:flex-row gap-4'>
            <Button variant='WatchTrailer' />
            <Link to={`/movie/${featuredMovie.id}`}>
              <Button variant='Details' />
            </Link>
          </div>
        </div>
      </div>

      {/* Trending Movies Section */}
      <div className='flex flex-col my-10 md:mt-0 md:mb-10 mx-4 md:mx-0 gap-6 md:gap-10 z-30'>
        <p className='md:mx-[140px] font-bold text-[24px] md:text-[36px] leading-[36px] md:leading-[48px] text-[#FDFDFD]'>
          Trending Now
        </p>
        <div className='flex flex-row md:px-[140px] gap-4 md:gap-5 overflow-x-auto [scrollbar-width:none] '>
          {trendingMovies.results.map((movie, index) => (
            <div
              key={movie.id}
              className='min-h-full min-w-[173px] md:min-w-[216px] gap-2 md:gap-3 cursor-pointer'
              onMouseEnter={() => handleMovieHover(index)}
            >
              <MoviesCard movie={movie} />
            </div>
          ))}
        </div>
      </div>

      {/* New Releases Section */}
      <div className='flex flex-col mb-6 md:mb-[90px] mx-4 md:mx-[140px] gap-6 md:gap-10 z-30'>
        <p className='font-bold text-[24px] md:text-[36px] leading-[36px] md:leading-[48px] text-[#FDFDFD]'>
          New Release
        </p>
        <div className='relative grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5'>
          {displayedNewMovies.map((movie) => (
            <div
              key={movie.id}
              className='min-h-full min-w-[173px] md:min-w-[216px] gap-2 md:gap-3 cursor-pointer'
            >
              <MoviesCard movie={movie} />
            </div>
          ))}

          {/* Load More Button */}
          {!showAllNewMovies && (
            <div
              className='absolute bottom-0 h-[25%] md:h-[33%] w-full z-50 flex items-center justify-center bg-gradient-to-t from-black to-transparent cursor-pointer'
              onClick={handleLoadMore}
            >
              <Button variant='Load' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
