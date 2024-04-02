const ReviewHeader = ({dealers}:any)=>{
    const wordCount = (str: string) => {
        return str.split(' ').length;
      };
    return(
      <>
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
      </>
    )
}

export default ReviewHeader;