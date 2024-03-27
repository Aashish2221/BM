import React from 'react';
const DealersComponent = ({toggleModalDealersRating}:any) => {
  return (
    <div className='container mx-auto grid grid-cols-4 md:grid-cols-10 md:gap-4 lg:grid-cols-12'>
      <div className='col-span-2 md:col-span-8 md:mt-3 lg:col-span-10 lg:mt-0'>
        <h1 className='text-xl font-medium md:text-2xl'>Dealers</h1>
      </div>
      <div className='col-span-2 flex justify-end md:mt-3 lg:mt-0'>
        <button
          onClick={toggleModalDealersRating}
          className='group relative overflow-hidden rounded-full bg-primary p-2 font-normal text-white md:px-6 md:py-2 md:text-sm lg:py-3'
        >
          <span className='absolute top-0 left-0 flex h-0 w-full bg-secondary duration-300  group-hover:h-full'></span>
          <span className='relative'>Add Review</span>
        </button>
      </div>
    </div>
  );
};

export default DealersComponent;
