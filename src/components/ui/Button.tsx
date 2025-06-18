import React from 'react';
import iconPlayButton from '../../assets/icons/icon-play-button.svg';
import type { MovieVideo } from '../../types/movie';
import { api } from '../../services/api';

interface ButtonProps {
  variant: 'WatchTrailer' | 'Details' | 'Load' | 'Explore';
  movieId?: number;
}

const Button: React.FC<ButtonProps> = ({ variant, movieId }) => {
  const [trailerUrl, setTrailerUrl] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (variant === 'WatchTrailer' && movieId) {
      setLoading(true);
      api
        .getMovieTrailer(movieId)
        .then((response) => {
          const trailers = response.results.filter(
            (video: MovieVideo) =>
              video.site === 'YouTube' &&
              video.type === 'Trailer' &&
              video.official
          );
          setTrailerUrl(
            trailers.length > 0
              ? `https://www.youtube.com/watch?v=${trailers[0].key}`
              : null
          );
        })
        .catch(() => setTrailerUrl(null))
        .finally(() => setLoading(false));
    }
  }, [variant, movieId]);

  if (variant === 'WatchTrailer' && !loading && !trailerUrl) {
    return null;
  }

  const getButton = () => {
    switch (variant) {
      case 'WatchTrailer':
        return 'h-[44px] md:h-[52px] w-full md:w-[230px] p-2 gap-2 bg-[#961200] rounded-full cursor-pointer';
      case 'Details':
        return 'h-[44px] md:h-[52px] w-full md:w-[230px] p-2 gap-2 bg-[#0A0D1299] backdrop-blur-[40px] rounded-full cursor-pointer border border-[#181D27]';
      case 'Load':
        return 'h-[44px] md:h-[52px] w-[200px] md:w-[230px] p-2 gap-2 bg-[#181D27] backdrop-blur-[40px] rounded-full cursor-pointer border border-[#181D27]';
      case 'Explore':
        return 'h-[44px] md:h-[52px] w-full md:w-[230px] p-2 gap-2 bg-[#961200] rounded-full cursor-pointer';
      default:
        return '';
    }
  };

  const getButtonText = () => {
    switch (variant) {
      case 'WatchTrailer':
        return (
          <a href={trailerUrl || '#'} target='_blank' rel='noopener noreferrer'>
            <span className='flex flex-row justify-center items-center text-center gap-2'>
              <p className='font-semibold text-[14px] md:text-[16px] text-[#FDFDFD] leading-[28px] md:leading-[30px]'>
                {loading ? 'Loading...' : 'Watch Trailer'}
              </p>
              {!loading && (
                <img
                  src={iconPlayButton}
                  alt='icon-play-button'
                  className='h-[18px] w-[18px] md:h-6 md:w-6'
                />
              )}
            </span>
          </a>
        );
      case 'Details':
        return (
          <p className='font-semibold text-[14px] md:text-[16px] text-[#FDFDFD] leading-[28px] md:leading-[30px]'>
            See Detail
          </p>
        );
      case 'Load':
        return (
          <p className='font-semibold text-[14px] md:text-[16px] text-[#FDFDFD] leading-[28px] md:leading-[30px]'>
            Load More
          </p>
        );
      case 'Explore':
        return (
          <p className='font-semibold text-[14px] md:text-[16px] text-[#FDFDFD] leading-[28px] md:leading-[30px]'>
            Explore Movie
          </p>
        );
      default:
        return '';
    }
  };

  return <button className={getButton()}>{getButtonText()}</button>;
};

export default Button;
