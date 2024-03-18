export default function Description({ blogData }: any) {
    return (
      <div
        id='innerText'
        className='pt-2 text-justify text-[0.95rem] leading-[1.4rem] text-[#5c5b5b]'
        dangerouslySetInnerHTML={{ __html: blogData?.description }}
      ></div>
    );
  }

 export const BlogSideCard = ({blogData}:any)=>{
    return(
      <div className='px-2'>
        <header className='text-md pt-2 font-semibold text-primary'>
          <h5>{blogData?.title}</h5>
        </header>
        <section className='font-muted pt-4 text-xs font-bold italic text-[#5c5b5b]'>
          <h6>
            By BullionMentor on{' '}
            {new Intl.DateTimeFormat('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            }).format(new Date(blogData.publishdate))}
          </h6>
        </section>
        <p
          className='pt-2 text-justify text-sm leading-[1.4rem] text-[#5c5b5b]'
          dangerouslySetInnerHTML={{
            __html:
              blogData.shortDescription <= 29
                ? blogData.shortDescription
                : blogData.shortDescription.slice(0, 500) + '...'
          }}
        ></p>
      </div>
    )
  }