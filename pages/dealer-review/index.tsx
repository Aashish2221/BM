import { getDealers } from '@/services/spot-prices';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import useToggle from '@/hooks/useToggle';
import ReviewModal from '@/components/ModalForm/ReviewModal/ReviewModal';
import data from '@/data';
import Head from 'next/head';
import DealersComponent from '@/components/Dealers/heading';
import DealerCard from '@/components/Dealers/dealercard';
export default function DealerReview({title , description ,
  dealers
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isOpenModalRegister, toggleModalDealersRating] = useToggle();
  
  return (
    <>
      {/* ******************** SEO CONTENT ******************** */}
      <Head>
        <title>{title}</title>
        <meta property='og:type' content={data.OGTags.home.type} />
        <meta
          property='og:url'
          content={`${process.env.WEBSITE_URL}/dealer-review`}
          key={`${process.env.WEBSITE_URL}/dealer-review`}
        />
        <link
          rel='canonical'
          href={`${process.env.WEBSITE_URL}/dealer-review`}
        />
      </Head>
      {/* ******************** GRADIENT ******************** */}
      <div className='h-40 bg-gradient-to-b from-secondary via-white to-white'></div>
      <div className='-mt-28 flex flex-col gap-4 text-dark-black'>
        {/* ******************** HEADING ******************** */}
        {<DealersComponent toggleModalDealersRating={toggleModalDealersRating}/>}
        <div className='grid-col-4 container mx-auto mt-4 flex flex-col gap-4 md:grid md:grid-cols-8 lg:grid-cols-10 lg:flex-col'>
          {/* ******************** DEALERS LIST ******************** */}
          <div className='col-span-4 mt-0 md:col-span-5 md:mt-2 lg:col-span-8 lg:mt-0'>
            <div className='grid grid-cols-2 flex-col gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'>
              {dealers.map((dealers:any) => (
                <div key={dealers.id}>
                  <DealerCard dealers={dealers} />
                </div>
              ))}
            </div>
          </div>
          {/* ******************** RIGHT ADVERTISEMENTS ******************** */}
          <div className='hidden sm:block col-span-4 md:col-span-3 md:ml-4 md:flex lg:col-span-2 lg:ml-4'>
            <div className='mt-0 w-full  rounded-2xl md:mt-4 md:h-full lg:mt-1 '>
              <Image
                src='https://res.cloudinary.com/bullionmentor/image/upload/v1689160172/Infographics/Bullion-Investment-Benefits_ghwffm.webp'
                alt=''
                height={1000}
                width={500}
                className='rounded-lg'
                loading='eager'
                priority
              />
            </div>
          </div>
        </div>
      </div>
      {isOpenModalRegister && (
        <ReviewModal closeModal={toggleModalDealersRating} />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Cache-control', 'public, sa-maxage=10, state-while-revalidate=59');
  const dealers = await getDealers();
  const title = data.site.dealerslist.page
  const description = data.site.dealerslist.description
  return { props: {title , description , dealers}
  };
};
