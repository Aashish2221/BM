import { Suspense, useEffect, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import {getBlogsData } from '@/services/spot-prices';
import InfiniteScroll from 'react-infinite-scroll-component';
import BlogIndexSkeleton from '@/components/Loaders/Blogs/BlogIndexSkeleton';
import { SpinnerBlog } from '@/components/Spinner';
import data from '@/data';
import { BlogCard } from '@/components/BlogCard';
const pageSize = 8;
export default function Blogs({
  title,

}: InferGetServerSidePropsType<typeof getServerSideProps> | any) {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  
  const loadMoreBlogs = async () => {
      const nextPage = page + 1;
      const newBlogs = await getBlogsData(pageSize, nextPage);
      if (newBlogs.length === 0) {
        setHasMore(false);
      } else {
        setBlogs((prevBlogs: any) => [...prevBlogs, ...newBlogs]);
        setPage(nextPage);
      }
  };
  useEffect(()=>{
    loadMoreBlogs();
  },[])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property='og:url' content={data.WEBSITEUrl + '/blogs'} key={data.WEBSITEUrl + '/blogs'} />
        <link rel='canonical' href={data.WEBSITEUrl + '/blogs'} />
        {blogs.map((blog: any) => (
          <link key={blog.id} rel='preload' as='image' href={blog.image} />
        ))}
      </Head>
      <Suspense fallback={<BlogIndexSkeleton/>}>
      {blogs.length > 0 ? (
        <div className="text-dark-black">
          <h1 className="container mx-auto mt-14 text-xl font-semibold md:mt-16 md:text-2xl lg:mt-5">Blog</h1>
          <InfiniteScroll
            dataLength={blogs.length}
            next={loadMoreBlogs}
            hasMore={hasMore}
            loader={<SpinnerBlog />}
          >
            <section className="container mx-auto mt-14 grid grid-cols-12 gap-4 sm:mt-20 lg:mt-24 xl:mt-24 2xl:mt-28">
              {blogs.map((blog: any) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </section>
          </InfiniteScroll>
        </div>
      ) : (
        <BlogIndexSkeleton />
      )}
      </Suspense>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
   
    const blog = data.site.blog;
    const title = blog.page;
    const description = blog.description;
    return { props: { title, description} };
};

