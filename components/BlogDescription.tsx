export default function Description({ blogData }: any) {
    return (
      <div
        id='innerText'
        className='pt-2 text-justify text-[0.95rem] leading-[1.4rem] text-[#5c5b5b]'
        dangerouslySetInnerHTML={{ __html: blogData?.description }}
      ></div>
    );
  }

 