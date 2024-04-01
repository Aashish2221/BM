import { useState } from 'react';
import { TiStarFullOutline } from 'react-icons/ti';

const DealersReating = ({ dealers}: any) => {
  
  return (
    <div className='-mt-1 ml-4 flex items-center -sm:mt-5 md:ml-7 md:flex lg:ml-10 lg:flex'>
    {Array.from({ length: 5 }, (value, index) => {
      let numbers = index + 0.5;
      return (
        <span key={index}>
          {dealers.rating >= index + 1 ||
          dealers.rating >= numbers ? (
            <TiStarFullOutline
              fill='#E49E2F'
              className='h-8 w-8 text-yellow-500 md:h-10 md:w-10 lg:h-10 lg:w-10'
            />
          ) : (
            <TiStarFullOutline
              fill='#C0C0C0'
              className='h-8 w-8 text-yellow-500 md:h-10 md:w-10 lg:h-10 lg:w-10'
            />
          )}
        </span>
      );
    })}
  </div>
  );
};

export default DealersReating;
