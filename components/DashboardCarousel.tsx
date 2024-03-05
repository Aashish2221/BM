import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { addProdBuyClicksLog } from '@/services/spot-prices';
import { useSelector } from 'react-redux';
import { Suspense, useEffect, useState } from 'react';
import { selectUser } from '@/features/userSlice';
import { DashboardCarouselProps } from '@/interfaces/propsinterfaces';

export default function DashboardCarousel({ images }: DashboardCarouselProps) {
  const [productName, setProductName] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [customerId, setCustomerId] = useState(0);
  const user = useSelector(selectUser);
  useEffect(() => {
    if (user.isLoggedin === false) {
      setCustomerId(0);
    } else {
      setCustomerId(user.user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const addProduct = async (imageForVenderId: any) => {
    await addProdBuyClicksLog(
      productName,
      vendorName,
      customerId,
      imageForVenderId
    );
  };
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <>
      <Head>
        {images.map((image: any, index: any) => (
          <Link
            rel='preload'
            as='image'
            key={index}
            href={image.imagePath}
            prefetch={false}
          ></Link>
        ))}
      </Head>
      <Suspense fallback={<section className='relative h-40 w-full  sm:h-44 md:mt-2 md:h-40 lg:h-60 xl:h-80 bg-gray-400'></section>}>
        <Slider {...settings}>
          {images.map((image, index) => (
            <section
              className='relative h-40 w-full  sm:h-44 md:mt-2 md:h-40 lg:h-60 xl:h-80'
              key={index}
              aria-hidden='true'>
              <div className='hidden md:block'>
                <Link
                  target='_blank'
                  href={image.eventRedirectiveUrl}
                  passHref
                  prefetch={false}
                  onClick={() => addProduct(image.imageForVenderId)}
                >
                  <Image
                    className='rounded-lg sm:h-44 sm:object-cover md:h-40 lg:h-60 lg:object-fill xl:h-80'
                    fill
                    src={image.imagePath}
                    alt={image.imageName}
                    priority={true}
                    loading='eager'
                  />
                </Link>
              </div>
              <div className='flex md:hidden'>
                <Link
                  target='_blank'
                  href={image.eventRedirectiveUrl}
                  passHref
                  prefetch={false}
                  onClick={() => addProduct(image.imageForVenderId)}
                >
                  <Image
                    className='h-40 visible w-full rounded-lg'
                    fill
                    src={image.mobileImageurl}
                    alt={image.imageName}
                    priority={true}
                    loading='eager'
                  />
                </Link>
              </div>
            </section>
          ))}
        </Slider>
      </Suspense>
    </>
  );
}
