import React from 'react';
import iconClapperboard from '../assets/icons/icon-clapperboard.svg';

const NotFountPage: React.FC = () => {
  return (
    <div className='w-full min-h-[calc(100vh-120px)] md:min-h-[calc(100vh-140px)] my-auto flex flex-col justify-center items-center text-center gap-4'>
      <img
        src={iconClapperboard}
        alt='clapperboard_icon'
        className='max-w-[200px] max-h-[200px] w-full h-full'
      />
      <div className='gap-2'>
        <p className='font-semibold text-[16px] text-[#FFFFFF] leading-[30px]'>
          Data Not Found
        </p>
        <p className='font-normal text-[14px] text-[#A4A7AE] leading-[28px]'>
          Try other keywords
        </p>
      </div>
    </div>
  );
};

export default NotFountPage;
