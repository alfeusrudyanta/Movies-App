import React, { useState, useEffect } from 'react';
import iconHeartEmpty from '../../assets/icons/icon-heart-empty.svg';
import iconHeartRed from '../../assets/icons/icon-heart-red.svg';
import iconCheck from '../../assets/icons/icon-check.svg';

interface HeartIconProps {
  movieId: number;
  initialLiked?: boolean;
}

const HeartIcon: React.FC<HeartIconProps> = ({
  movieId,
  initialLiked = false,
}) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(
      localStorage.getItem('favoriteMovies') || '[]'
    );
    setIsLiked(favorites.includes(movieId));
  }, [movieId]);

  const toggleLike = () => {
    const newLikeState = !isLiked;
    setIsLiked(newLikeState);

    const currentFavorites = JSON.parse(
      localStorage.getItem('favoriteMovies') || '[]'
    );

    if (newLikeState) {
      if (!currentFavorites.includes(movieId)) {
        const updatedFavorites = [...currentFavorites, movieId];
        localStorage.setItem(
          'favoriteMovies',
          JSON.stringify(updatedFavorites)
        );
      }
    } else {
      const updatedFavorites = currentFavorites.filter(
        (id: number) => id !== movieId
      );
      localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
    }

    if (newLikeState) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 1200);
      return () => clearTimeout(timer);
    }
  };

  return (
    <div className='relative'>
      <div className='cursor-pointer'>
        <img
          src={isLiked ? iconHeartRed : iconHeartEmpty}
          alt={isLiked ? 'Remove from favorites' : 'Add to favorites'}
          onClick={toggleLike}
          className='h-11 w-11 md:w-[52px] md:h-[52px]'
        />
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className='fixed bottom-[80%] left-1/2 transform -translate-x-1/2 z-50 pointer-events-none w-full max-w-[531px] px-4'>
          <div className='w-full bg-[#00000040] backdrop-blur-[40px] rounded-[16px] px-4 py-2'>
            <div className='flex gap-3 items-center justify-center animate-fade-in'>
              <img src={iconCheck} alt='icon-check' className='h-5 w-5' />
              <p className='font-medium text-white text-sm md:text-base'>
                Successfully added to favorites
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeartIcon;
