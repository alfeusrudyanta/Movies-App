import React, { useEffect, useState, useRef } from 'react';
import { api } from '../services/api';
import { getImageUrl } from '../utils/getImgUrl';
import type { TrendingMovies, NewReleased } from '../types/movie';
import Button from '../components/ui/Button';
import useResponsiveToggle from '../hooks/useResponsiveToggle';
import { Link } from 'react-router-dom';
import MoviesCard from '../components/MoviesCard';
import iconSlider from '../assets/icons/icon-slider-arrow.svg';
import bgWhite from '../assets/icons/bg-white.jpg';

const HomePage: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<TrendingMovies | null>(
    null
  );
  const [newMovies, setNewMovies] = useState<NewReleased | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [showAllNewMovies, setShowAllNewMovies] = useState(false);
  const { isMobile } = useResponsiveToggle();
  const trendingRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

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

  const checkScrollPosition = () => {
    if (trendingRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trendingRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollTrending = (direction: 'left' | 'right') => {
    if (trendingRef.current) {
      const scrollAmount = trendingRef.current.clientWidth * 0.8;
      trendingRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const currentRef = trendingRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
      checkScrollPosition();
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', checkScrollPosition);
      }
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [trendingMovies]);

  const handleMovieHover = (index: number) => {
    setFeaturedIndex(index);
  };

  const handleLoadMore = () => {
    setShowAllNewMovies(true);
  };

  if (!trendingMovies || !newMovies) {
    return (
      <div className='absolute text-white text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
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
        <div className='max-h-[810px] overflow-hidden min-h-[550px] md:min-h-[810px]'>
          <img
            src={
              featuredMovie.backdrop_path
                ? getImageUrl(featuredMovie.backdrop_path)
                : bgWhite
            }
            alt={featuredMovie.title}
            className='w-full h-full object-cover min-h-[550px] md:min-h-[810px]'
            loading='lazy'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-black/0 to-black to-[103.21%]' />
        </div>
        <div className='absolute px-4 top-[200px] md:top-[300px] md:left-[125px] md:mr-[120px] flex flex-col gap-6 md:gap-12 md:max-w-[635px]'>
          <div className='flex flex-col gap-[6px] md:gap-4'>
            <h1 className='font-bold text-[24px] md:text-[48px] leading-[36px] md:leading-[60px] text-[#FDFDFD]'>
              {featuredMovie.title}
            </h1>
            <p className='font-normal text-[14px] md:text-[16px] leading-[28px] md:leading-[30px] text-[#A4A7AE] line-clamp-6 md:line-clamp-none'>
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

      {/* Trending Movies Slider */}
      <div className='flex flex-col my-10 md:mt-0 md:mb-10 gap-6 md:gap-10'>
        <h2 className='mx-4 md:mx-[140px] font-bold text-[24px] md:text-[36px] leading-[36px] md:leading-[48px] text-[#FDFDFD]'>
          Trending Now
        </h2>
        <div className='relative'>
          <div
            ref={trendingRef}
            className='flex flex-row gap-4 md:gap-5 overflow-x-auto [scrollbar-width:none] px-4 md:px-[140px]'
          >
            {trendingMovies.results.map((movie, index) => (
              <div
                key={movie.id}
                className='flex-shrink-0 min-w-[173px] md:min-w-[216px]'
                onMouseEnter={() => handleMovieHover(index)}
              >
                <MoviesCard movie={movie} variant='slider' index={index} />
              </div>
            ))}
          </div>

          {showLeftArrow && (
            <>
              <div className='hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 md:h-full md:w-[140px] bg-gradient-to-l from-black/0 to-black to-[83.21%]' />
              <div className='flex absolute left-0 rounded-full' />
              <button
                onClick={() => scrollTrending('left')}
                className='flex absolute left-1 md:left-4 items-center justify-center top-1/2 transform -translate-y-1/2'
                aria-label='Scroll left'
              >
                <img
                  src={iconSlider}
                  alt=''
                  className='h-[44px] w-[44px] md:h-[56px] md:w-[56px] rotate-180 rounded-full'
                />
              </button>
            </>
          )}

          {showRightArrow && (
            <>
              <div className='hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 md:h-full md:w-[140px] bg-gradient-to-r from-black/0 to-black to-[83.21%]' />
              <div className='flex absolute right-0 rounded-full' />
              <button
                onClick={() => scrollTrending('right')}
                className='flex absolute right-1 md:right-4 items-center justify-center top-1/2 transform -translate-y-1/2'
                aria-label='Scroll right'
              >
                <img
                  src={iconSlider}
                  alt=''
                  className='h-[44px] w-[44px] md:h-[56px] md:w-[56px] rounded-full'
                />
              </button>
            </>
          )}
        </div>
      </div>

      {/* New Releases Section */}
      <div className='flex flex-col mb-6 md:mb-[90px] mx-4 md:mx-[140px] gap-6 md:gap-10 z-30'>
        <h2 className='font-bold text-[24px] md:text-[36px] leading-[36px] md:leading-[48px] text-[#FDFDFD]'>
          New Release
        </h2>
        <div className='relative grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5'>
          {displayedNewMovies.map((movie, index) => (
            <div key={movie.id}>
              <MoviesCard movie={movie} variant='standard' index={index} />
            </div>
          ))}

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
