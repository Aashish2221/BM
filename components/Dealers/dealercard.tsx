import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography
} from '@material-tailwind/react';
import Link from 'next/link';
import Image from 'next/image';
import { TiStarFullOutline } from 'react-icons/ti';

const DealerCard = ({ dealers }: any) => {
  return (
    <>
      
        <Card
          className='md:h-66 mx-auto mt-6 h-52 sm:h-72 md:mt-4 lg:mb-4 lg:mt-2 
                   lg:h-64'
        >
          <CardHeader
            floated={true}
            className='h-26 mx-2 -mt-2 shadow-none sm:-mt-4 sm:h-36 md:-mt-3 md:h-40 lg:-mt-7 lg:h-40'
          >
            <Link
              target={'_blank'}
              href={dealers.detailUrl}
              passHref
              prefetch={false}
            >
              <Image
                src={dealers.image}
                alt=''
                className='mx-auto h-24 w-24 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40'
                height={400}
                width={400}
                loading='eager'
              />
            </Link>
          </CardHeader>
          <CardBody className='mt-1 text-center sm:mt-1'>
            <Typography variant='h6' color='blue-gray'>
              <p className='text-xs underline line-clamp-1 hover:text-primary md:text-base lg:text-sm'>
                <Link
                  target={'_blank'}
                  href={dealers.detailUrl}
                  passHref
                  prefetch={false}
                >
                  {dealers.aliasName}
                </Link>
              </p>

              <div className='mt-1 flex items-center justify-center md:mt-0 lg:mt-0'>
                {Array.from({ length: 5 }, (value, index) => {
                  let numbers = index + 0.5;
                  return (
                    <span key={index}>
                      {dealers.rating >= index + 1 ||
                      dealers.rating >= numbers ? (
                        <TiStarFullOutline
                          fill='#E49E2F'
                          className='h-4 w-4 text-yellow-500 md:h-6 md:w-6 lg:h-6 lg:w-6'
                        />
                      ) : (
                        <TiStarFullOutline
                          fill='#C0C0C0'
                          className='h-4 w-4 text-yellow-500 md:h-6 md:w-6 lg:h-6 lg:w-6'
                        />
                      )}
                    </span>
                  );
                })}
              </div>

              <p className='mt-2 h-4 text-xs font-extralight md:h-3 lg:mt-1 lg:h-6 xl:mt-2 xl:h-5 2xl:h-4'>
                {dealers.shippingDescription}
              </p>
            </Typography>
          </CardBody>
          <CardFooter className='-mt-3 flex justify-center gap-7'>
            <Link
              href={`/dealer-review/${dealers.code}`}
              as={`/dealer-review/${dealers.code}`}
              className='group relative mt-6 inline-flex items-center overflow-hidden rounded-md  font-normal text-blue-500'
              passHref
              prefetch={false}
            >
              <div className='mt-2 w-20 rounded border-t-2 border-gray-300 md:w-24  lg:w-32'>
                <div className='flex justify-center'></div>
                <p className='mt-2 h-6 text-center text-xs font-semibold underline decoration-blue-500 hover:text-black hover:decoration-black sm:mt-2 md:mt-1 md:text-sm lg:mt-1 lg:text-sm'>
                  {dealers.reviewCnt} Reviews
                </p>
              </div>
            </Link>
          </CardFooter>
        </Card>
    </>
  );
};

export default DealerCard;
