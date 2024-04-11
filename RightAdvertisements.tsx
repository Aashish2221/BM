import Image from 'next/image';
const RightAdvertisements = () => {
  return (
    <div className='md:flex-3 hidden sm:w-[0%] md:ml-4 lg:flex lg:w-[20%]'>
      <div className='hidden flex-col gap-4 pt-6 sm:sticky sm:top-32 sm:h-fit sm:pt-0 lg:flex'>
        <div className='flex w-full items-center justify-center rounded-md'>
          <Image
            src='https://res.cloudinary.com/bullionmentor/image/upload/Banners/Bullion-Mentor-motive_anp3hj.webp'
            alt=''
            height={500}
            width={500}
            className='rounded-lg'
            loading='eager'
          />
        </div>
      </div>
    </div>
  );
};
export default RightAdvertisements;
