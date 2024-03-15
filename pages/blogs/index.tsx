import Link from 'next/link';
import { useMemo, useState } from 'react';
import Head from 'next/head';
import data from '@/data';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getBlogsData } from '@/services/spot-prices';
import { BlogCard } from '@/components/BlogCard';
const pageSize = 8;
export default function Blogs({
  title ,initialBlogs
}: InferGetServerSidePropsType<typeof getServerSideProps> | any) {
  const [blogs, setBlogs] = useState<any>(initialBlogs);
  const memoizedBlogs = useMemo(() => blogs, [blogs]);
  return (
    <>
      {/* <Head>
        <title>{title}</title>
        <meta property='og:url' content={data.WEBSITEUrl + '/blogs'} key={data.WEBSITEUrl + '/blogs'} />
        <link rel='canonical' href={data.WEBSITEUrl + '/blogs'} />
        {memoizedBlogs.map((blog:any)=>
          <Link key={blog.id} rel="preload" as='image' href={blog.image} />
        )}
      </Head> */}
    
        <div className='text-dark-black'>
          <h1 className='semibold container mx-auto mt-14 text-xl font-medium md:mt-16 md:text-2xl lg:mt-5'>
            Blog
          </h1>
          {/* <InfiniteScroll
            dataLength={blogs.length}
            next={loadMoreBlogs}
            hasMore={hasMore}
            loader={<SpinnerBlog />}
          > */}
          {/* ----------------- blog section ------------- */}
          <section className='container mx-auto mt-14 grid grid-cols-12 gap-4 sm:mt-20 lg:mt-24 xl:mt-24 2xl:mt-28'>
            {memoizedBlogs.map((blog:any ) => (
                <BlogCard key={blog.id} blog={blog} />
            ))}
          </section>
          {/* </InfiniteScroll> */}
         
        </div>
        {/* : <BlogSkeleton/>} */}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader( 'Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59' );
  const pageNumber = 1;
  const initialBlogs = await getBlogsData(pageSize, pageNumber);
  const blog = data.site.blog;
  const title = blog.page;
  const description = blog.description;
  return {
    props: {title, description, initialBlogs}
  }
}
