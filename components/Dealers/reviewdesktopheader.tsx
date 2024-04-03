import Link from "next/link";
import { FaDotCircle } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { TiStarFullOutline } from "react-icons/ti";

const ReviewDesktopHeader = ({dealer}:any)=>{
    const str: any = dealer?.detailUrl;
    // -------------------------------- Url break --------------------------
    const detailUrlSlice = str?.slice(0, 30) + '...';
    return(
        <div className='hidden lg:block'>
        <div className='grid h-24 w-auto grid-cols-8 items-center md:h-44 lg:h-52 lg:grid-cols-8 '>
          {/* --------------------- LOGO -------------------------------- */}
          <div className='col-span-1 flex w-full' key={dealer?.id}>
            <img
              src={dealer?.image ?? ''}
              height={123}
              width={136}
              alt={dealer?.image ?? ''}
              className='mt-2 h-24 w-24 object-contain md:mt-0 md:h-52 md:w-auto md:pt-3 lg:h-48 lg:w-auto lg:pt-10'
              loading='eager'
            />
          </div>
          {/* --------------------- DEALERS NAME -------------------------------- */}
          <div className='col-span-3 mt-4 h-16 border-r-2 border-gray-300 text-xs md:mt-10 lg:mt-10 lg:ml-8'>
            <div className='items-left items-left flex md:flex lg:flex'>
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

            <h2 className='pt-0 text-base font-medium md:pt-2 lg:pt-2 lg:text-2xl'>
              {dealer?.aliasName}
            </h2>
          </div>
          {/* --------------------- SHIPPING & URL -------------------------------- */}
          <div className='col-span-3 mt-4 h-24 pl-2 text-xs md:mt-10 lg:ml-4 lg:mt-16 lg:justify-between'>
            <div className='col-span-1 flex'>
              <MdLocalShipping
                height={15}
                width={15}
                fill=''
                className='pt-0 md:h-6 md:w-6 lg:h-8 lg:w-8 lg:pt-2'
              ></MdLocalShipping>
              <h2 className='col-span-2 pt-0 text-xs md:text-sm lg:pt-2 lg:text-base'>
                {dealer?.shippingDescription}
              </h2>
            </div>

            <div className='col-span-1 flex'>
              <FaDotCircle
                height={10}
                width={10}
                fill=''
                className='pt-0 md:h-6 md:w-6 lg:h-8 lg:w-8 lg:pt-2'
              ></FaDotCircle>
              <p className='col-span-2 pt-0 text-xs text-primary underline md:hidden md:pt-1 md:text-base lg:pt-2 lg:text-base'>
                <Link
                  href={`${dealer?.detailUrl}`}
                  target='_blank'
                  passHref
                  prefetch={false}
                >
                  {detailUrlSlice}
                </Link>
              </p>
              <p className='hidden pt-0 text-xs text-primary underline hover:text-[#0F4463] md:block md:text-base lg:pt-2 lg:text-base'>
                <Link
                  href={`${dealer?.detailUrl}`}
                  target='_blank'
                  passHref
                  prefetch={false}
                >
                  {dealer?.detailUrl.replace(/\/+$/, '')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ReviewDesktopHeader;