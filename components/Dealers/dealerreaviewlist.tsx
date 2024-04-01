
import { useState } from "react";
import { TiStarFullOutline } from "react-icons/ti";

const DealerReaviewList = ({dealer}:any) => {
    const wordCount = (str: string) => {
        return str.split(' ').length;
      };

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
  }
    return(
        <div
        className='mx-auto -mt-2 grid gap-2 overflow-y-scroll py-4 md:grid-cols-6 lg:h-auto lg:grid-cols-4'
        id='noscroll'
      >
        {dealer &&
          dealer.dealerReview.slice(0).map((dealers:any, index:any) => (
            <div
              className={`mt-6 rounded-2xl border-gray-200 bg-white shadow-md shadow-slate-300 md:col-span-6 md:mt-8 md:w-full md:px-6 md:py-4 lg:col-span-2 lg:mt-8
               ${
                 dealer.dealerReview.length < 2
                   ? 'max-h-[25rem] min-h-[15rem] lg:h-min'
                   : 'max-h-[50rem] lg:h-auto'
               } lg:px-3 lg:py-4`}
              key={dealers.id}
            >
              <div className='-mt-1 ml-4 flex items-center -sm:mt-5 md:ml-7 md:flex lg:ml-10 lg:flex'>
                {Array.from({ length: 5 }, (value, index) => {
                  let numbers = index + 0.5;
                  return (
                    <span key={index}>
                      {dealers.rating >= index + 1 ||
                      dealers.rating >= numbers ? (
                        <TiStarFullOutline
                          fill='#E49E2F'
                          className='h-8 w-8 text-yellow-500 md:h-10 md:w-10 lg:h-10 lg:w-10'
                        />
                      ) : (
                        <TiStarFullOutline
                          fill='#C0C0C0'
                          className='h-8 w-8 text-yellow-500 md:h-10 md:w-10 lg:h-10 lg:w-10'
                        />
                      )}
                    </span>
                  );
                })}
              </div>
              <div className='py-2 px-4 text-sm md:px-6 md:py-4 md:text-base lg:px-6 lg:py-2 lg:text-base'>
                <p className='block font-semibold xl:hidden'>
                  {wordCount(
                    dealers.reviewHeader ? dealers.reviewHeader : ''
                  ) <= 6
                    ? dealers.reviewHeader
                    : dealers.reviewHeader?.slice(0, 33) + '...'}
                </p>
                <p className='hidden font-semibold md:hidden md:text-lg lg:text-lg xl:block'>
                  {dealers.reviewHeader}
                </p>

                <p className='hidden h-24 py-2 md:hidden lg:h-28 xl:h-24'>
                  {wordCount(
                    dealers.reviewText ? dealers.reviewText : ''
                  ) <= 29
                    ? dealers.reviewText
                    : dealers.reviewText?.slice(0, 120) + '...'}
                </p>
                {/* ******************** REVIEW TEXT ******************** */}
                <div className='h-auto py-2 text-base text-gray-500'>
                  {showMore === false && selected === 0
                    ? dealers.reviewText.slice(0, 120)
                    : showMore === true && selected === index
                    ? dealers.reviewText
                    : dealers.reviewText.slice(0, 120)}
                  {dealers.reviewText.length > 120 && (
                    <button
                      className='text-base font-normal text-primary ml-1'
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

                <p className=' text-base -mb-1 sm:-mb-4  font-light italic text-slate-600 md:text-base lg:text-base'>
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
    )
};

export default DealerReaviewList;