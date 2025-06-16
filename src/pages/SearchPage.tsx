import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { api } from '../services/api';
import { getImageUrl } from '../utils/getImgUrl';
import type { BaseMovie } from '../types/movie';
import iconStar from '../assets/icons/icon-star.svg';
import Button from '../components/ui/Button';
import HeartIcon from '../components/ui/HeartIcon';
import NotFountPage from './NotFountPage';
import bgWhite from '../assets/icons/bg-white.jpg';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const [searchedMovies, setSearchedMovies] = useState<BaseMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');

    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        if (query) {
          const response = await api.getMovieSearch(query);
          setSearchedMovies(response.results);
        } else {
          setSearchedMovies([]);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchedMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [location.search]);

  if (loading) {
    return (
      <div className='mt-[150px] mx-4 md:mx-[140px] flex justify-center items-center min-h-[50vh]'>
        <p className='text-white'>Loading search results...</p>
      </div>
    );
  }

  return (
    <div className='mt-[80px] md:mt-[154px] mx-4 md:mx-[140px] flex flex-col'>
      {searchedMovies.length > 0 ? (
        <div className='flex flex-col gap-[64px] md:gap-[96px] mb-[37px] md:mb-[166px]'>
          {searchedMovies.map((movie) => (
            <div key={movie.id} className='md:flex md:gap-[126px] md:w-full'>
              <div className='flex flex-row gap-4 md:gap-6 w-full'>
                <div className='flex-shrink-0 max-h-[156px] md:max-h-[270px] max-w-[104px] md:max-w-[182px] overflow-hidden border border-transparent rounded-[8px]'>
                  <Link to={`/movie/${movie.id}`}>
                    <img
                      src={
                        movie.poster_path
                          ? getImageUrl(movie.poster_path)
                          : bgWhite
                      }
                      alt={movie.title}
                      className='w-full h-fit hover:transform hover:scale-105 transition-transform duration-300'
                      loading='lazy'
                    />
                  </Link>
                </div>

                <div className='flex flex-col gap-1 md:gap-3 min-w-0'>
                  <Link to={`/movie/${movie.id}`}>
                    <h2 className='font-bold text-[16px] md:text-[24px] leading-[30px] md:leading-[36px] text-[#FDFDFD]'>
                      {movie.title}
                    </h2>
                    <div className='flex items-center gap-1'>
                      <img
                        src={iconStar}
                        alt='rating'
                        className='h-[18px] w-[18px] md:h-6 md:w-6'
                      />
                      <p className='font-medium text-[14px] md:text-[18px] leading-[28px] md:leading-[32px] text-[#FDFDFD]'>
                        {movie.vote_average.toFixed(1)}/10
                      </p>
                    </div>
                  </Link>

                  <Link to={`/movie/${movie.id}`}>
                    <p className='font-normal text-[14px] md:text-[16px] leading-[28px] md:leading-[30px] text-[#A4A7AE] line-clamp-2 md:line-clamp-4'>
                      {movie.overview}
                    </p>
                  </Link>

                  <div className='hidden md:block'>
                    <Button variant='WatchTrailer' />
                  </div>
                </div>
              </div>

              <div className='flex flex-row max-w-full w-full md:max-w-[56px] pt-4 gap-4'>
                <div className='w-full max-w-full md:hidden'>
                  <Button variant='WatchTrailer' />
                </div>
                <HeartIcon movieId={movie.id} initialLiked={false} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NotFountPage />
      )}
    </div>
  );
};

export default SearchPage;
