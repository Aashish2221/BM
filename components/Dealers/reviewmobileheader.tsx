// DealerHeader.js
import Link from 'next/link';
import { TiStarFullOutline } from 'react-icons/ti';

const DealerHeader = ({ dealer }:any) => {
    const str: any = dealer?.detailUrl;
    // -------------------------------- Url break --------------------------
    const detailUrlSlice = str?.slice(0, 30) + '...';
    return(
    
        <div className='mx-auto flex h-24 w-auto grid-cols-8 gap-4 sm:gap-5 md:h-44 md:grid-cols-8 md:gap-6 lg:hidden lg:h-52 lg:grid-cols-8 xl:grid-cols-12 '>
        {/* --------------------- LOGO -------------------------------- */}
        <div
          className='col-span-2 grid xl:col-span-4'
          key={dealer?.id}
        >
          <img
            src={dealer?.image ?? ''}
            height={100}
            width={100}
            alt={dealer?.image ?? ''}
            className='mt-2 h-24 w-24 object-contain md:mt-0 md:h-52 md:w-auto md:pt-3 lg:h-60 lg:w-64 lg:pt-10'
            loading='eager'
          />
        </div>
        {/* --------------- DEALERS NAME, SHIPPING & URL ------------------- */}
        <div className='col-span-6 mt-4 text-xs md:col-span-6 md:mt-10 md:w-full lg:col-span-6 lg:mt-16 lg:w-full xl:col-span-8'>
          <div className='items-left items-left flex '>
            <TiStarFullOutline
              height={15}
              width={15}
              fill='#E49E2F'
              className='md:h-6 md:w-6 lg:h-6 lg:w-6'
            />
            <p className='pl-1 text-xs md:text-sm lg:text-base'>
              {dealer?.rating} out of 5
            </p>
          </div>

          <h2 className='pt-0 text-base font-medium md:pt-2 md:text-3xl lg:pt-2 lg:text-4xl'>
            {dealer?.aliasName}
          </h2>

          <h2 className='text-xs md:text-sm lg:text-base'>
            {dealer?.shippingDescription}
          </h2>
          <p className='pt-0 text-xs text-primary underline md:hidden md:pt-1 md:text-base lg:pt-2 lg:text-base '>
            <Link
              href={`${dealer?.detailUrl}`}
              target='_blank'
              prefetch={false}
            >
              {detailUrlSlice}
            </Link>
          </p>
          <p className='hidden pt-0 text-xs text-primary underline md:block md:pt-1 md:text-base lg:pt-2 lg:text-base'>
            <Link
              href={`${dealer?.detailUrl}`}
              target='_blank'
              prefetch={false}
            >
              {dealer?.detailUrl}
            </Link>
          </p>
        </div>
      </div>

    )
    };

export default DealerHeader;
