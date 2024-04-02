import { useState } from "react";
import dynamic from "next/dynamic";

const ReviewHeader = dynamic(()=>import("./ReviewHeader"))
const ReviewRating = dynamic(()=>import("./ReaviewRwating"))
const ReviewList = ({dealer}:any)=>{
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
    return(
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
    )
}
export default ReviewList;