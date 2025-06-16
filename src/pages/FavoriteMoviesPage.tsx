import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { getImageUrl } from '../utils/getImgUrl';
import type { BaseMovie } from '../types/movie';
import iconClapperboardMagnifier from '../assets/icons/icon-clapperboard-magnifier.svg';
import iconStar from '../assets/icons/icon-star.svg';
import Button from '../components/ui/Button';
import HeartIcon from '../components/ui/HeartIcon';

const FavoriteMoviesPage: React.FC = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<BaseMovie[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshFavorites = () => {
    const favoriteIds = JSON.parse(
      localStorage.getItem('favoriteMovies') || '[]'
    );
    if (favoriteIds.length === 0) {
      setFavoriteMovies([]);
      setLoading(false);
      return;
    }

    Promise.all(favoriteIds.map((id: number) => api.getMovieDetails(id)))
      .then((movies) => {
        setFavoriteMovies(movies.filter((movie) => movie));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refreshFavorites();
  }, []);

  if (loading) {
    return <div className='text-white text-center py-8'>Loading...</div>;
  }

  return (
    <div className='mt-[64px] md:mt-[90px] mx-4 md:mx-[140px] flex flex-col'>
      <h1 className='font-bold text-[24px] md:text-[36px] leading-[36px] md:leading-[48px] text-[#FDFDFD] mb-6'>
        Favorites
      </h1>

      {favoriteMovies.length === 0 ? (
        <div className='flex flex-1 flex-col justify-center items-center text-center gap-4'>
          <img
            src={iconClapperboardMagnifier}
            alt='clapperboard_icon'
            className='w-[200px] h-[200px] object-contain'
          />
          <div className='gap-2'>
            <p className='font-semibold text-[16px] text-[#FFFFFF] leading-[30px]'>
              Data Empty
            </p>
            <p className='font-normal text-[14px] text-[#A4A7AE] leading-[28px]'>
              You don't have a favorite movie yet
            </p>
          </div>
          <Link to='/'>
            <Button variant='Explore' />
          </Link>
        </div>
      ) : (
        <div className='flex flex-col gap-[64px] md:gap-[96px] mb-[37px] md:mb-[166px]'>
          {favoriteMovies.map((movie) => (
            <div className='md:flex md:gap-[126px] md:w-full'>
              <div
                key={movie.id}
                className='flex flex-row gap-4 md:gap-6 w-full'
              >
                <div className='flex-shrink-0 max-h-[156px] md:max-h-[270px] max-w-[104px] md:max-w-[182px] overflow-hidden border border-transparent rounded-[8px]'>
                  <Link to={`/movie/${movie.id}`}>
                    <img
                      src={getImageUrl(movie.poster_path)}
                      alt={movie.title}
                      className='w-full h-fit hover:transform hover:scale-105 transition-transform duration-300 '
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

              {/* Mobile Item */}
              <div className='flex flex-row max-w-full w-full md:max-w-[56px] pt-4  gap-4'>
                <div className='w-full max-w-full md:hidden '>
                  <Button variant='WatchTrailer' />
                </div>
                <div onClick={() => refreshFavorites()}>
                  <HeartIcon movieId={movie.id} initialLiked={true} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteMoviesPage;
