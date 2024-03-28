// Import necessary modules and components
import { getDealers } from '@/services/spot-prices';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import useToggle from '@/hooks/useToggle';
import data from '@/data';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Dynamic imports for better code splitting
const ReviewModal = dynamic(() => import('@/components/ModalForm/ReviewModal/ReviewModal'));
const DealerCard = dynamic(() => import('@/components/Dealers/dealercard'));

export default function DealerReview({ title, description, dealers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isOpenModalRegister, toggleModalDealersRating] = useToggle();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property='og:type' content={data.OGTags.home.type} />
        <meta property='og:url' content={`${process.env.WEBSITE_URL}/dealer-review`} key={`${process.env.WEBSITE_URL}/dealer-review`} />
        <link rel='canonical' href={`${process.env.WEBSITE_URL}/dealer-review`} />
        <link rel='preload' as='image' href='https://res.cloudinary.com/bullionmentor/image/upload/v1689160172/Infographics/Bullion-Investment-Benefits_ghwffm.webp' />
      </Head>
      <div className='h-40 bg-gradient-to-b from-secondary via-white to-white'></div>
      <div className='-mt-28 flex flex-col gap-4 text-dark-black'>
        <div className='container mx-auto grid grid-cols-4 md:grid-cols-10 md:gap-4 lg:grid-cols-12 '>
          <div className='col-span-2 md:col-span-8 md:mt-3 lg:col-span-10 lg:mt-0'>
            <h1 className='text-xl font-medium md:text-2xl'>Dealers</h1>
          </div>
          <div className='col-span-2 flex justify-end md:col-span-2 md:mt-3 lg:col-span-2 lg:mt-0'>
            <button
              onClick={toggleModalDealersRating}
              className='group relative inline-block overflow-hidden rounded-full bg-primary p-2 font-normal text-white md:px-6 md:py-2 md:text-sm lg:px-6 lg:py-3'
            >
              <span className='absolute top-0 left-0  mb-0 flex h-0 w-full bg-secondary duration-300 group-hover:h-full '></span>
              <span className='relative '>Add Review</span>
            </button>
          </div>
        </div>
        <div className='grid-col-4 container mx-auto mt-4 flex flex-col gap-4 md:grid md:grid-cols-8 lg:grid-cols-10 lg:flex-col'>
          <div className='col-span-4 mt-0 md:col-span-5 md:mt-2 lg:col-span-8 lg:mt-0'>
            <div className='grid grid-cols-2 flex-col gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'>
              {dealers.map((dealer:any) => (
                <div key={dealer.id}>
                  <DealerCard dealers={dealer} />
                </div>
              ))}
            </div>
          </div>
          <div className=' col-span-4 hidden md:block md:col-span-3 md:ml-4 lg:col-span-2 lg:ml-4'>
            <div className='mt-0 w-full  rounded-2xl md:mt-4 md:h-full lg:mt-1 '>
              <Image
                src='https://res.cloudinary.com/bullionmentor/image/upload/v1689160172/Infographics/Bullion-Investment-Benefits_ghwffm.webp'
                alt=''
                height={1000}
                width={500}
                className='rounded-lg'
                loading='lazy' // Lazy loading
              />
            </div>
          </div>
        </div>
      </div>
      {isOpenModalRegister && <ReviewModal closeModal={toggleModalDealersRating} />}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Cache-control', 'public, sa-maxage=10, state-while-revalidate=59');
  const dealers = await getDealers();
  const title = data.site.dealerslist.page;
  const description = data.site.dealerslist.description;
  return { props: { title, description, dealers } };
};
