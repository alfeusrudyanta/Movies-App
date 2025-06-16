import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useResponsiveToggle from '../../hooks/useResponsiveToggle';
import iconSearch from '../../assets/icons/icon-search.svg';
import leftArrow from '../../assets/icons/icon-left-arrow.svg';

const SearchBar: React.FC = () => {
  const { isOpen, setIsOpen, windowWidth } = useResponsiveToggle();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes('/search')) {
      setSearchQuery('');
      setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
    if (windowWidth < 768) {
      setIsOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (windowWidth < 768) {
    return (
      <div>
        <img
          src={iconSearch}
          alt='icon-search'
          className='h6 w-6 cursor-pointer'
          onClick={() => setIsOpen(!isOpen)}
        />

        {isOpen && (
          <div className='fixed inset-0 bg-black'>
            <div className='h-full w-full bg-black'>
              <div className='h-16 px-4 py-[10px] gap-[10px] flex flex-row items-center justify-between'>
                <img
                  src={leftArrow}
                  alt='left-arrow'
                  className='h-6 w-6 cursor-pointer'
                  onClick={() => setIsOpen(false)}
                />
                <div className='h-full w-full max-w-full py-2 px-4 gap-4 backdrop-blur-3xl flex items-center justify-between border border-[#252B37] rounded-[12px]'>
                  <img
                    src={iconSearch}
                    alt='icon-search'
                    className='h-6 w-6 cursor-pointer'
                    onClick={handleSearch}
                  />
                  <input
                    type='text'
                    placeholder='Search Movie'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className='h-full w-full max-w-full font-normal text-[14px] leading-[28px] text-[#717680] outline-none'
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className='h-full w-full max-w-[243px] py-2 px-4 gap-4 backdrop-blur-3xl flex items-center justify-between border bg-[#0A0D1299] border-[#252B37] rounded-[12px]'>
      <img
        src={iconSearch}
        alt='icon-search'
        className='h-6 w-6 cursor-pointer'
        onClick={handleSearch}
      />
      <input
        type='text'
        placeholder='Search Movie'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className='h-full w-full max-w-full font-normal text-[16px] leading-[30px] text-[#717680] outline-none'
      />
    </div>
  );
};

export default SearchBar;
