import Image from 'next/image';
import useToggle from '@/hooks/useToggle';
import { getDealersReviews } from '@/services/spot-prices';
import { useState } from 'react';
import { useRouter } from 'next/router';
import data from '@/data';
import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Advertisement from './advertisement';
import dynamic from 'next/dynamic';

const ReviewModal = dynamic(() => import('@/components/ModalForm/ReviewModal/ReviewModal'));
const VendorReviewModal = dynamic(() => import('@/components/ModalForm/VendorReviewModals/VendorReviewModal'));
const DealerHeader = dynamic(() => import('@/components/Dealers/reviewmobileheader'));
const ReviewDesktopHeader = dynamic(() => import('@/components/Dealers/reviewdesktopheader'));
const ReviewHeader = dynamic(()=>import('@/components/Dealers/ReviewHeader'))
const ReviewRating =dynamic(()=>import('@/components/Dealers/ReaviewRwating'))

export default function VendorReview({
  title,
  description,
  dealers
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { code } = router.query;
  const vendorReviewData = data.site.vendorReview;
  const ogTag = data.OGTags.home;
  const formattedPath = router.asPath.replace(
    '/dealers-review?DealerCode=${code}',
    ''
  );
  const canonicalUrl = data.WEBSITEUrl + formattedPath;
  const [isOpenModalRegister, toggleModalDealersRating] = useToggle();
  const [isSuccessModal, toggleSuccessModal] = useToggle();
  const [dealer, setDealer] = useState(dealers);

  

  const [showMore, setShowMore] = useState(false);
  const [selected, setSelected] = useState(0);
  const handleSelect = (i: number) => {
    if (showMore && selected === i) {
      setShowMore(false);
      setSelected(-1);
    } else {
      setShowMore(true);
      setSelected(i);
    }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property='og:type' content={ogTag.type} />
        <meta property='og:url' content={canonicalUrl} key={canonicalUrl} />
        <link rel='canonical' href={canonicalUrl} />
        <link
          rel='preload'
          as='image'
          href='https://res.cloudinary.com/bullionmentor/image/upload/Banners/Symbol-of-Strength-and-Liberty_nc5oki.webp'
        />
        <link rel='preload' as='image' href={dealer?.image} />
      </Head>
      <div className='w-auto'>
        <div className='mx-auto text-dark-black'>
          <div className='h-40 bg-gradient-to-b from-secondary via-white to-white'></div>
          <div className='container mx-auto -mt-40'>
            <div className='grid gap-2 text-dark-black md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8 '>
              <div className='col-span-6 mt-10 md:col-span-6 lg:col-span-6 lg:mt-0'>
                {/********************* Header for Desktop ******************** */}
                <ReviewDesktopHeader dealer={dealer} />
                {/* ******************** Header for MV ******************** */}
                <DealerHeader dealer={dealer} />
                {/* ******************** Review list title ******************** */}
                <div className='mx-auto mt-4 grid grid-cols-6 gap-2 md:mt-5 md:grid-cols-10 md:gap-4 lg:mt-2 lg:grid-cols-12 lg:gap-4'>
                  <h1 className='col-span-4 mt-1 lg:-mt-6 text-lg font-semibold text-dark-black md:col-span-8 md:text-xl lg:col-span-10'>
                    Review List
                  </h1>
                  <button
                    className='col-span-2  rounded-full bg-primary px-2 py-2 text-xs font-normal text-white lg:hidden'
                    onClick={toggleModalDealersRating}
                  >
                    Add Review
                  </button>
                </div>
                {/* ******************** Review list ******************** */}
                <div
                  className='mx-auto -mt-5 grid gap-2 overflow-y-scroll py-4 md:grid-cols-6 lg:h-auto lg:grid-cols-4'
                  id='noscroll'
                >
                  {dealer &&
                    dealer.dealerReview
                      .slice(0)
                      .map((dealers: any, index: any) => (
                        <div
                          className={`mt-6 md:-mb-2 rounded-2xl border-gray-200 bg-white shadow-md shadow-slate-300 md:col-span-6 md:mt-4 md:w-full md:px-6 md:py-4 lg:col-span-2 
                            ${dealer.dealerReview.length < 2
                              ? 'max-h-[25rem] min-h-[15rem] lg:h-min'
                              : 'max-h-[50rem] lg:h-auto'
                            } lg:px-3 lg:py-4`}
                            key={dealers.id}
                        >
                          <ReviewRating dealers={dealers} />
                          <div className='py-2 px-4 text-sm md:px-6 md:py-4 md:text-base lg:px-6 lg:py-2 lg:text-base'>
                           <ReviewHeader dealers={dealer} />
                            {/* ******************** REVIEW TEXT ******************** */}
                            <div className='h-auto py-2 text-base text-gray-500'>
                              {showMore === false && selected === 0
                                ? dealers.reviewText.slice(0, 120)
                                : showMore === true && selected === index
                                  ? dealers.reviewText
                                  : dealers.reviewText.slice(0, 120)}
                              {dealers.reviewText.length > 120 && (
                                <button
                                  className='ml-1 text-base font-normal text-primary'
                                  onClick={() => handleSelect(index)}
                                >
                                  {showMore === false && selected === 0
                                    ? 'Read more'
                                    : showMore === true && selected === index
                                      ? 'Read less'
                                      : 'Read more'}
                                </button>
                              )}
                            </div>

                            <p className=' -mb-1 text-base font-light  italic text-slate-600  md:-mb-4 md:text-base lg:text-base'>
                              - {dealers.fullName}
                              ,&nbsp;
                              {new Intl.DateTimeFormat('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              }).format(new Date(dealers.createTS))}
                            </p>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
              {/* ******************** Advertisement ******************** */}
              <div className='col-span-6  md:col-span-6 lg:col-span-2 xl:col-span-2'>
                <div className='top-6'>
                  {/********************* RATE A DEALER FORM ********************  */}
                  <Advertisement dealer={dealer} code={code as string} />
                  {/********************* INFOGRAPHICS ********************  */}
                  <div className='item-center mt-6 w-full  justify-center rounded-2xl  md:mt-10 lg:mt-10'>
                    <Image
                      src='https://res.cloudinary.com/bullionmentor/image/upload/Banners/Symbol-of-Strength-and-Liberty_nc5oki.webp'
                      alt=''
                      height={500}
                      width={500}
                      className='rounded-lg'
                      loading='lazy'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isOpenModalRegister && (
          <ReviewModal closeModal={toggleModalDealersRating} />
        )}
        {isSuccessModal && (
          <VendorReviewModal closeModal={toggleSuccessModal} />
        )}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { code } = context.params as any;
  const dealers = await getDealersReviews(code);
  const title = dealers.metatitle;
  const description = dealers.metaDesc;
  return {
    props: { title, description, dealers: dealers }
  };
};
