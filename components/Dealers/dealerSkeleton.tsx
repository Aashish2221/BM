import React from 'react';

const SkeletonDealerReview = () => {
  return (
    <>
      {/* Skeleton for Gradient */}
      <div className='h-40 bg-gradient-to-b from-secondary via-white to-white'></div>
      
      {/* Skeleton for Heading and Add Review Button */}
      <div className='container mx-auto grid grid-cols-4 md:grid-cols-10 md:gap-4 lg:grid-cols-12 -mt-28'>
        {/* Skeleton for Heading */}
        <div className='col-span-2 md:col-span-8 md:mt-3 lg:col-span-10 lg:mt-0'>
          <div className='w-48 h-6 bg-gray-300'></div>
        </div>
        {/* Skeleton for Add Review Button */}
        <div className='col-span-2 flex justify-end md:col-span-2 md:mt-3 lg:col-span-2 lg:mt-0'>
          <div className='w-36 h-10 bg-gray-300'></div>
        </div>
      </div>

      {/* Skeleton for Dealers List and Right Advertisements */}
      <div className='grid-col-4 container mx-auto mt-2 flex flex-col gap-4 lg:grid lg:grid-cols-10 lg:flex-col'>
        {/* Skeleton for Dealers List */}
        <div className='col-span-4 mt-0 md:col-span-5 md:mt-2 lg:col-span-8 lg:mt-0'>
          <div className='grid grid-cols-2 flex-col gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {/* Skeleton for Dealer Card */}
            {[...Array(12)].map((_, index) => (
              <div key={index} className='w-full bg-white rounded-lg shadow-sm p-4'>
                {/* Skeleton for Dealer Image */}
                <div className='w-36 h-36 bg-gray-300 rounded-full mb-4'></div>
                {/* Skeleton for Dealer Info */}
                <div className='flex flex-col'>
                  {/* Skeleton for Dealer Name */}
                  <div className='w-20 h-4 bg-gray-300 mb-2'></div>
                  {/* Skeleton for Dealer Details */}
                  <div className='w-32 h-4 bg-gray-300'></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Skeleton for Right Advertisements */}
        <div className='col-span-4 hidden md:col-span-3 md:ml-4 lg:col-span-2 lg:ml-4 lg:flex'>
          <div className='w-full h-96 bg-gray-300 rounded-lg'></div>
        </div>
      </div>
    </>
  );
};

export default SkeletonDealerReview;
