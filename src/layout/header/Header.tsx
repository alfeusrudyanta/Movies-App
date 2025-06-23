import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { HeaderProps, NavItem } from '../../types/header';
import ToggleMenu from '../header/ToggleMenu';
import SearchBar from './SearchBar';
import iconTv from '../../assets/icons/icon-tv.svg';

const Header: React.FC<HeaderProps> = ({ NavItems }) => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollCheck = window.scrollY > 0;
      if (scrollCheck !== isScrolling) {
        setIsScrolling(scrollCheck);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolling]);

  return (
    <header
      className={`fixed top-0 w-full z-100 h-16 md:h-[90px] px-4 md:px-[140px] flex items-center justify-between transition-all duration-300
 ${isScrolling ? 'bg-[#0A0D1299] backdrop-blur-2xl' : 'bg-transparent'}`}
    >
      <div className='flex flex-row items-center justify-center gap-[80px]'>
        <Link to='/'>
          <div className='flex flex-row items-center justify-center gap-1'>
            <img
              src={iconTv}
              alt='icon-tv'
              className='h-[28px] w-[28px] md:h-10 md:w-10'
            />
            <p className='font-semibold text-[20px] md:text-[29px] leading-[25px] md:leading-[35.56px] text-center text-[#FDFDFD] text-shadow-[0_0_4px_black]'>
              Movie
            </p>
          </div>
        </Link>

        <nav className='font-normal leading-[30px] text-[#FFFFFF] text-shadow-[0_0_4px_black] text-[16px] gap-12 mr-12 hidden md:flex'>
          {NavItems.map((item: NavItem) => (
            <a key={item.label} href={item.path}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className='flex flex-row items-center justify-center gap-6'>
        <SearchBar />
        <ToggleMenu NavItems={NavItems} />
      </div>
    </header>
  );
};

export default Header;
