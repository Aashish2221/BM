import { getDealers} from '@/services/spot-prices';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import useToggle from '@/hooks/useToggle';
import data from '@/data';
import Head from 'next/head';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
import SearchSpinner from '@/components/Loaders/SearchSpinner';
import dynamic from 'next/dynamic';

const DealerCard = dynamic(()=>import('@/components/Dealers/DealerCard'))
const SkeletonDealerReview = dynamic(()=>import('@/components/Dealers/dealerSkeleton'))
const ReviewModal = dynamic(()=>import('@/components/ModalForm/ReviewModal/ReviewModal'))

export default function DealerReview({
  title,
  description,
  initialDealers
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isOpenModalRegister, toggleModalDealersRating] = useToggle();
  const [dealers, setDealers] = useState(initialDealers);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(2);
  const size = 5;
  const fetchMoreDealers = async () => {
    try {
      if (dealers.length < initialDealers[0].dealerCount) {
        const newDealers = await getDealers(size, pageNumber);
        if (newDealers.length === 0) {
          setHasMore(false);
        } else {
          setDealers((prevDealers: any) => [...prevDealers, ...newDealers]);
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching more dealers:', error);
    }
  };

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
        {dealers.map((dealers: any) => (
          <link
            key={dealers.id}
            rel='preload'
            as='image'
            href={dealers.image}
          />
        ))}
      </Head>
      
      {/* ******************** GRADIENT ******************** */}
      {dealers[0].length === 0 ? <SkeletonDealerReview /> :
      <>
      <div className='h-40 bg-gradient-to-b md:from-secondary md:via-white md:to-white'></div>
      <div className='-mt-28 flex flex-col gap-4 text-dark-black'>
        {/* ******************** HEADING ******************** */}
        <div className='container lg:mb-5 mx-auto grid grid-cols-4 md:grid-cols-10 md:gap-4 lg:grid-cols-12 '>
          {/* ******************** HEADING ******************** */}
          <div className='col-span-2 md:col-span-8 md:mt-3 lg:col-span-10 lg:mt-0'>
            <h1 className='text-xl font-medium md:text-2xl'>Dealers</h1>
          </div>
          {/* ******************** ADD REVIEW BUTTON ******************** */}
          <div className='col-span-2 flex justify-end md:col-span-2 md:mt-3 lg:col-span-2 lg:mt-0'>
            <button
              onClick={toggleModalDealersRating}
              className='group relative inline-block overflow-hidden rounded-full bg-primary px-2 py-2 font-normal text-white md:px-6 md:py-2 md:text-sm lg:px-6 lg:py-3 lg:text-sm'
            >
              <span className='absolute top-0 left-0  mb-0 flex h-0 w-full translate-y-0 transform bg-secondary opacity-90 transition-all duration-300 ease-out group-hover:h-full '></span>
              <span className='relative '>Add Review</span>
            </button>
          </div>
        </div>
        <div className='grid-col-4 container mx-auto -mt-1 flex flex-col gap-4 lg:grid  lg:grid-cols-10 lg:flex-col'>
          {/* ******************** DEALERS LIST ******************** */}
          <div className='col-span-4 -mt-1 md:col-span-5 md:mt-2 lg:col-span-8 lg:mt-0'>
            <InfiniteScroll
              dataLength={dealers.length}  
              next={fetchMoreDealers}
              hasMore={hasMore}
              loader={<SearchSpinner />}
              scrollThreshold={0.7}
              className='overflow-visible'
            >
              <div className='grid grid-cols-2 flex-col gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {dealers.map((dealers:any) => (
                  <div key={dealers.id}>
                  <DealerCard dealers={dealers} />
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          </div>
          {/* ******************** RIGHT ADVERTISEMENTS ******************** */}
          <div className=' col-span-4 hidden md:col-span-3 md:ml-4 lg:col-span-2 lg:ml-4 lg:flex'>
            <div className='mt-0 w-full  rounded-2xl md:mt-4 md:h-full lg:mt-1 '>
              <img
                src='https://res.cloudinary.com/bullionmentor/image/upload/v1689160172/Infographics/Bullion-Investment-Benefits_ghwffm.webp'
                alt=''
                height={1000}
                width={500}
                className='rounded-lg'
                loading='lazy'
              />
            </div>
          </div>
        </div>
      </div>
      {isOpenModalRegister && (
        <ReviewModal closeModal={toggleModalDealersRating} />
      )}
      </>
      }
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  res.setHeader(
    'Cache-control',
    'public, sa-maxage=10, state-while-revalidate=59'
  );
  const isMobileDevice =
    req.headers['user-agent'] &&
    /Mobi|Android/i.test(req.headers['user-agent']);
  const size = isMobileDevice ? 5 : 15;
  const PageNumber = 1;
  const initialDealers = await getDealers(size, PageNumber);
  const title = data.site.dealerslist.page;
  const description = data.site.dealerslist.description;
  return { props: {title, description, initialDealers}};
};
