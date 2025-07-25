// components/MoviesCard.tsx
import { Link } from 'react-router-dom';
import iconStar from '../assets/icons/icon-star.svg';
import { getImageUrl } from '../utils/getImgUrl';
import type { BaseMovie } from '../types/movie';

interface MoviesCardProps {
  movie: BaseMovie;
  variant: 'standard' | 'slider';
  index: number;
}

const MoviesCard: React.FC<MoviesCardProps> = ({
  movie,
  variant = 'standard',
  index,
}) => {
  if (variant === 'slider') {
    return (
      <div className='relative'>
        <Link to={`/movie/${movie.id}`}>
          <div className='border border-transparent overflow-hidden rounded-[12px]'>
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className='w-full h-fit max-h-[266px] max-w-[173px] md:max-h-[321px] md:max-w-[216px] hover:scale-105 transition-transform duration-300'
              loading='lazy'
            />
            <div className='absolute left-2 md:left-3 top-2 md:top-3 flex h-[32px] md:h-[48px] w-[32px] md:w-[48px] items-center justify-center rounded-full bg-[#0A0D1299] backdrop-blur-[34.29px]  '>
              <p className='font-semibold text-[14px] md:text-[16px] leading-[28px] md:leading-[30px] text-[#FDFDFD]'>
                {(index += 1)}
              </p>
            </div>
          </div>
          <div className='flex flex-col gap-[2px] mt-2 max-w-[173px] md:max-w-[216px]'>
            <p className='font-semibold text-[16px] md:text-[18px] leading-[30px] md:leading-[32px] text-[#FDFDFD] whitespace-nowrap overflow-hidden text-ellipsis'>
              {movie.title}
            </p>
            <div className='flex items-center gap-1'>
              <img
                src={iconStar}
                alt='Rating'
                className='h-[18px] w-[18px] md:h-5 md:w-5'
                loading='lazy'
              />
              <p className='font-normal text-[14px] md:text-[16px] leading-[28px] md:leading-[30px] text-[#A4A7AE]'>
                {movie.vote_average.toFixed(1)}/10
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  // Standard variant
  return (
    <div>
      <Link to={`/movie/${movie.id}`}>
        <div className='border border-transparent overflow-hidden rounded-[12px]'>
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className='w-full h-fit hover:scale-105 transition-transform duration-300'
            loading='lazy'
          />
        </div>
        <div className='flex flex-col gap-[2px] mt-2'>
          <p className='font-semibold text-[16px] md:text-[18px] leading-[30px] md:leading-[32px] text-[#FDFDFD] whitespace-nowrap overflow-hidden text-ellipsis'>
            {movie.title}
          </p>
          <div className='flex items-center gap-1'>
            <img
              src={iconStar}
              alt='Rating'
              className='h-[18px] w-[18px] md:h-5 md:w-5'
              loading='lazy'
            />
            <p className='font-normal text-[14px] md:text-[16px] leading-[28px] md:leading-[30px] text-[#A4A7AE]'>
              {movie.vote_average.toFixed(1)}/10
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MoviesCard;
