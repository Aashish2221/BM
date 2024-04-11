import Image from 'next/image';
const LeftAdvertisements = ({ src }: any) => {
  return (

                  <div className='flex w-full items-center justify-center rounded-md'>
      <Image
        src={src}
        alt=''
        height={350}
        width={350}
        className='rounded-lg mb-4'
        loading='lazy'
      />
     </div>
  );
};
export default LeftAdvertisements;