import { CardFooter } from '@material-tailwind/react';
import Link from 'next/link';

const DealerCardFooter = ({ dealers }: any) => {
  return (
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
  );
};

export default DealerCardFooter;
