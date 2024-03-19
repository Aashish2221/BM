import { useRouter } from 'next/router';
import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getBlogDetails } from '@/services/spot-prices';
import data from '@/data';
import React, { useEffect, useState } from 'react';
import { BlogSideCard } from '@/components/BlogDescription';
import BlogSlugSkeleton from '@/components/Loaders/BlogIndexSkeleton/BlogSlugSkeleton';
const Description = React.lazy(() => import('@/components/BlogDescription'));
const Blog = ({
  title,
  description,
  blogData
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { code } = router.query;

  const formattedPath = router.asPath.replace(`/blogs?.Title = ${code}`, '');
  const canonicalUrl = data.WEBSITEUrl + formattedPath;
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
     setTimeout(()=>{
       setLoading(false)
     },1000)
  },[])
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property='og:url' content={canonicalUrl} key={canonicalUrl} />
        <link rel='canonical' href={canonicalUrl} />
      </Head>
      {/* {loading ? <BlogSlugSkeleton /> : */}
        <div className='grid-col container mx-auto'>
          <div className='mx-auto mt-16 grid max-w-[1400px] grid-cols-12 gap-0 text-dark-black sm:container sm:gap-4 md:mt-10'>
            <div className='col-span-12 md:col-span-8'>
              <span className='lg:grid-col gap-1 lg:grid'>
                <Images blogData={blogData} />
                {/* ------ heading ------- */}
                <header className='pt-5 text-lg font-semibold text-primary md:text-2xl md:font-medium'>
                  <h1>{blogData?.title}</h1>
                </header>
                <section className='pt-4 text-xs font-bold italic text-[#5c5b5b]'>
                  <h6>
                    By BullionMentor on{' '}
                    {new Intl.DateTimeFormat('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    }).format(new Date(blogData.publishdate))}
                  </h6>
                </section>
                {/* ----- sub-heading and paragraph ----- */}
                {loading ? <BlogSlugSkeleton /> :
                <Description blogData={blogData} />}

                {/*-------------------------- Blog Content End --------------------- */}
              </span>
            </div>
            {/* --------------------- Blog Side Card------------------- */}
            <div className='col-span-12 mt-4 md:col-span-4 md:mt-0'>
              <div className='container rounded-md pb-4 shadow-md shadow-slate-300'>
                <img
                  src={blogData.image}
                  alt={blogData.title}
                  className='rounded-md p-4 lg:w-full'
                  loading='lazy'
                />
                <BlogSideCard blogData={blogData} />
              </div>
            </div>
          </div>
        </div>
        {/* } */}
    </>
  );
};
export default Blog;

export const getServerSideProps: GetServerSideProps = async (res) => {
  const code = res.params?.code as string;
  const blogData = await getBlogDetails(code as string);
  const title = blogData.metatitle;
  const description = blogData.metaDescription;
  return {
    props: { title, description, blogData: blogData }
  };
};

const Images = ({ blogData }: any) => {
  return (
    <img
      src={blogData.image}
      alt={blogData.title}
      className='rounded-md lg:w-full'
      loading='lazy'
    />
  );
};
