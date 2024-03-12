import { Card, CardBody, CardFooter } from "@material-tailwind/react";
import { useState } from "react";

const BlogIndexSkeleton = () => {
 
  return (
    <>
    
      <Card className='col-span-12 mx-auto mt-2 mb-10 h-[22rem] w-full duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-md sm:col-span-6 sm:mb-20 sm:mt-6 sm:h-[23rem] lg:col-span-4 lg:mb-20 lg:mt-2 lg:h-96 2xl:col-span-3 2xl:h-[22rem]'>
        <div className='animate-pulse'>
          <div className='h-40 rounded-t-lg bg-gray-200'></div>
          <CardBody className='px-4 pt-2 sm:pt-3 md:mt-3 md:pt-2 lg:-mt-2 xl:mt-1'>
            <h3 className='mb-2 h-10 w-3/4 bg-gray-200'></h3>
            <p className='mb-4 h-10 w-full bg-gray-200'></p>
            <p className='h-6 w-1/2 bg-gray-200'></p>
          </CardBody>
          <CardFooter className='flex sm:mt-1 2xl:mt-2'>
            <div className='flex w-full justify-center bg-gray-200 px-4 py-2 font-semibold text-primary'>
              <div className='w-4/5'></div>
            </div>
          </CardFooter>
        </div>
      </Card>
    </>
  );
};

export default BlogIndexSkeleton;
