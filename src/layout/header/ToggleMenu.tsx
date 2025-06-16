import useResponsiveToggle from '../../hooks/useResponsiveToggle';
import { Link } from 'react-router-dom';
import type { HeaderProps, NavItem } from '../../types/header';
import iconMenuClosed from '../../assets/icons/icon-menu-closed.svg';
import iconMenuOpen from '../../assets/icons/icon-menu-open.svg';
import iconTV from '../../assets/icons/icon-tv.svg';

const ToggleMenu: React.FC<HeaderProps> = ({ NavItems }) => {
  const { isOpen, setIsOpen, windowWidth } = useResponsiveToggle();

  if (windowWidth < 768) {
    return (
      <div className='flex items-center justify-center'>
        <button onClick={() => setIsOpen(!isOpen)} className='cursor-pointer'>
          <img
            src={iconMenuClosed}
            alt='icon-menu-closed'
            className='h-6 w-6'
          />
        </button>

        {isOpen && (
          <div className='fixed inset-0 min-h-screen bg-black z-50 overflow-hidden'>
            <div className='w-full h-full'>
              <div className='h-16 px-4 flex items-center justify-between'>
                <Link to='/'>
                  <div className='flex flex-row items-center justify-center gap-1'>
                    <img
                      src={iconTV}
                      alt='icon-tv'
                      className='h-[28px] w-[28px] md:h-10 md:w-10'
                    />
                    <p className='font-semibold text-[20px] md:text-[29px] leading-[25px] md:leading-[35.56px] text-center text-[#FDFDFD]'>
                      Movie
                    </p>
                  </div>
                </Link>

                <button onClick={() => setIsOpen(!isOpen)}>
                  <img
                    src={iconMenuOpen}
                    alt='icon-menu-open'
                    className='h-6 w-6 cursor-pointer'
                  />
                </button>
              </div>

              <div className='flex flex-col mx-4 h-full '>
                <nav className='flex flex-col font-normal leading-[30px] text-[16px] text-white gap-4'>
                  {NavItems.map((item: NavItem) => (
                    <a key={item.label} href={item.path}>
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default ToggleMenu;
