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

const DealerReaviewList = dynamic(()=>import('@/components/Dealers/dealerreaviewlist'));
const ReviewModal = dynamic(
  () => import('@/components/ModalForm/ReviewModal/ReviewModal')
);
const VendorReviewModal = dynamic(
  () => import('@/components/ModalForm/VendorReviewModals/VendorReviewModal')
);
const DealerHeader = dynamic(
  () => import('@/components/Dealers/reviewmobileheader')
);
const ReviewDesktopHeader = dynamic(
  () => import('@/components/Dealers/reviewdesktopheader')
);

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
                <div className='mx-auto mt-4 grid grid-cols-6 gap-2 md:mt-8 md:grid-cols-10 md:gap-4 lg:mt-2 lg:grid-cols-12 lg:gap-4'>
                  <h1 className='col-span-4 text-lg font-semibold text-dark-black md:col-span-8 md:text-xl lg:col-span-10'>
                    Review List
                  </h1>
                  <button
                    className='col-span-2 rounded-full bg-primary px-2 py-2 text-xs font-normal text-white lg:hidden'
                    onClick={toggleModalDealersRating}
                  >
                    Add Review
                  </button>
                </div>
                {/* ******************** Review list ******************** */}
                 <DealerReaviewList dealer ={dealers} />
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
