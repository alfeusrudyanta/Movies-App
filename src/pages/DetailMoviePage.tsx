import React, { useEffect, useState, useMemo } from 'react';
import { api } from '../services/api';
import { getImageUrl } from '../utils/getImgUrl';
import type { MovieDetails, MovieCredits } from '../types/movie';
import Button from '../components/ui/Button';
import { useParams } from 'react-router-dom';
import iconStar from '../assets/icons/icon-star.svg';
import iconVidCamera from '../assets/icons/icon-vidcamera.svg';
import iconEmojiHappy from '../assets/icons/icon-emoji-happy.svg';
import iconCalendar from '../assets/icons/icon-calendar.svg';
import HeartIcon from '../components/ui/HeartIcon';

const DetailMoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<MovieCredits | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const [details, creditData] = await Promise.all([
        api.getMovieDetails(parseInt(id)),
        api.getMovieCredit(parseInt(id)),
      ]);
      setMovieDetails(details);
      setCredits(creditData);
    };

    fetchData();
  }, [id]);

  const movieProps = useMemo(
    () => [
      {
        path: iconStar,
        label: 'Rating',
        desc: `${movieDetails?.vote_average?.toFixed(1) || '0'}/10`,
      },
      {
        path: iconVidCamera,
        label: 'Genre',
        desc: movieDetails?.genres?.[0]?.name || 'Unknown',
      },
      {
        path: iconEmojiHappy,
        label: 'Age\u00A0limit',
        desc: movieDetails?.adult ? '18+' : '13',
      },
    ],
    [movieDetails]
  );

  const topCast = useMemo(() => credits?.cast.slice(0, 5) || [], [credits]);

  if (!movieDetails) {
    return (
      <div className='absolute text-white text-[16px] text-center top-1/2 left-1/2'>
        Loading...
      </div>
    );
  }

  return (
    <div className='mb-10 md:mb-[150px]'>
      {/* Hero Section */}
      <div className='max-h-[810px] overflow-hidden min-h-[450px] md:min-h-[790px]'>
        <img
          src={getImageUrl(movieDetails.backdrop_path)}
          alt={movieDetails.title}
          className='w-full h-full object-cover min-h-[400px] md:min-h-[790px]'
          loading='lazy'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-black/0 to-black to-[103.21%] overflow-hidden' />
      </div>

      {/* Movie Info Section */}
      <div className='absolute px-4 top-[200px] md:top-[400px] md:left-[125px] md:mr-[160px] w-full md:max-w-[calc(100vw-260px)] gap-6 md:gap-0'>
        <div className='flex flex-row gap-8'>
          <img
            src={getImageUrl(movieDetails.poster_path)}
            alt={movieDetails.title}
            className='rounded-[12px] max-h-[171px] md:max-h-[384px] h-fit w-fit'
            loading='lazy'
          />
          <div className='flex flex-col gap-1 md:gap-6 w-full'>
            <h1 className='font-bold text-[20px] md:text-[40px] leading-[34px] md:leading-[56px] text-[#FDFDFD]'>
              {movieDetails.title}
            </h1>
            <div className='flex flex-row gap-1 md:gap-2 items-center'>
              <img
                src={iconCalendar}
                alt='icon-calender'
                className='h-5 w-5 md:h-6 md:w-6'
                loading='lazy'
              />
              <p className='font-normal text-[14px] md:text-[16px] leading-[28px] md:leading-[30px] text-[#A4A7AE]'>
                {movieDetails.release_date}
              </p>
            </div>

            {/* Desktop Only Elements */}
            <div className='hidden md:flex flex-col gap-4'>
              <div className='flex flex-col md:flex-row gap-4 items-center'>
                <Button variant='WatchTrailer' />
                <HeartIcon movieId={movieDetails.id} />
              </div>
              <div className='flex flex-row w-full gap-4'>
                {movieProps.map((item, index) => (
                  <div
                    key={`desktop-${index}`}
                    className='my-5 flex flex-col gap-2 items-center justify-center rounded-[16px] bg-black border border-[#252B37] p-5 w-full'
                  >
                    <img
                      src={item.path}
                      alt={item.label}
                      className='h-[15px] w-[15px] md:h-6 md:w-6'
                      loading='lazy'
                    />
                    <div className='flex flex-col gap-[2px] text-center'>
                      <p className='font-normal text-[16px] leading-[30px] text-[#D5D7DA]'>
                        {item.label}
                      </p>
                      <p className='font-semibold text-[20px] leading-[24px] text-[#FDFDFD]'>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Only Elements */}
        <div className='md:hidden flex flex-col gap-6 mt-6'>
          <div className='flex gap-4'>
            <Button variant='WatchTrailer' />
            <HeartIcon movieId={movieDetails.id} />
          </div>
          <div className='grid grid-cols-3 gap-4'>
            {movieProps.map((item, index) => (
              <div
                key={`mobile-${index}`}
                className='flex flex-col gap-2 items-center justify-center rounded-[16px] bg-black border border-[#252B37] p-4'
              >
                <img
                  src={item.path}
                  alt={item.label}
                  className='h-6 w-6'
                  loading='lazy'
                />
                <div className='flex flex-col gap-[2px] text-center'>
                  <p className='font-normal text-[12px] leading-[20px] text-[#D5D7DA]'>
                    {item.label}
                  </p>
                  <p className='font-semibold text-[14px] leading-[18px] text-[#FDFDFD]'>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className='flex flex-col mx-4 md:mx-[140px] mt-44 md:mt-5 gap-6 md:gap-10'>
        <div className='flex flex-col gap-2 z-10'>
          <h2 className='font-bold text-[#FDFDFD] text-[20px] md:text-[32px] leading-[34px] md:leading-[46px]'>
            {movieDetails.title}
          </h2>
          <p className='font-normal text-[#A4A7AE] text-[14px] md:text-[16px] leading-[28px] md:leading-[30px]'>
            {movieDetails.overview}
          </p>
        </div>

        <div className='flex flex-col gap-4 z-10'>
          <h3 className='font-bold text-[#FDFDFD] text-[20px] md:text-[32px] leading-[34px] md:leading-[46px]'>
            Cast & Crew
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {topCast.map((person) => (
              <div key={person.id} className='flex gap-3 md:gap-4'>
                <img
                  src={getImageUrl(person.profile_path)}
                  alt={person.name}
                  className='rounded-[8px] max-h-[84px] md:max-h-[104px] w-fit'
                  loading='lazy'
                />
                <div>
                  <p className='font-semibold text-[14px] md:text-[16px] leading-[28px] md:leading-[30px] text-[#FDFDFD]'>
                    {person.name}
                  </p>
                  <p className='font-normal text-[14px] md:text-[16px] leading-[28px] md:leading-[30px] text-[#A4A7AE]'>
                    {person.character}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailMoviePage;
