// components/MovieCard.tsx
import { Link } from 'react-router-dom';
import iconStar from '../assets/icons/icon-star.svg';
import { getImageUrl } from '../utils/getImgUrl';
import type { BaseMovie } from '../types/movie';

interface MoviesCardProps {
  movie: BaseMovie;
}

const MoviesCard: React.FC<MoviesCardProps> = ({ movie }) => {
  return (
    <div>
      <Link to={`/movie/${movie.id}`}>
        <div className='border border-transparent overflow-hidden rounded-[12px] '>
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className='w-full h-fit hover:transform hover:scale-105 transition-transform duration-300 '
            loading='lazy'
          />
        </div>
        <div className='flex flex-col gap-[2px]'>
          <p className='font-semibold text-[16px] md:text-[18px] leading-[30px] md:leading-[32px] text-[#FDFDFD] whitespace-nowrap overflow-hidden text-ellipsis'>
            {movie.title}
          </p>
          <div className='flex items-center gap-1'>
            <img
              src={iconStar}
              alt='icon-star'
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
