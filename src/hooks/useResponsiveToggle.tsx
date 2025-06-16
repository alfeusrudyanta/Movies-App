import { useState, useEffect } from 'react';

const useResponsiveToggle = (breakpoint = 768) => {
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      if (width >= breakpoint) setIsOpen(false);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  return {
    isOpen,
    setIsOpen,
    isMobile: windowWidth < breakpoint,
    windowWidth,
  };
};

export default useResponsiveToggle;
