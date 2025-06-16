import React from 'react';
import { Link } from 'react-router-dom';
import iconTv from '../assets/icons/icon-tv.svg';

const Footer: React.FC = () => {
  return (
    <div className='mt-auto py-6 md:py-10 px-4 md:px-[140px] h-[120px] gap-2 border-t-[1px] border-[#252B37] md:flex md:justify-between md:items-center'>
      <Link to='/'>
        <div className='flex flex-row gap-1 items-center text-center'>
          <img
            src={iconTv}
            alt='tv_icon'
            className='h-[28px] w-[28px] md:h-10 md:w-10'
          />

          <p className='font-semibold text-[20px] md:text-[29px] text-[#FDFDFD] leading-6 md:leading-[36px]'>
            Movie
          </p>
        </div>
      </Link>

      <p className='font-normal text-[12px] md:text-[16px] leading-6 md:leading-[30px] text-[#535862]'>
        Copyright ©2025 Movie Explorer
      </p>
    </div>
  );
};
export default Footer;
