import { useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { getBlogData } from '@/services/spot-prices';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BlogCard } from '@/components/BlogCard';
import BlogIndexSkeleton from '@/components/Loaders/Blogs/BlogIndexSkeleton';
import { SpinnerBlog } from '@/components/Spinner';
import data from '@/data';

const pageSize = 8;

export default function Blogs({
  title,
  initialBlogs,
}: InferGetServerSidePropsType<typeof getServerSideProps> | any) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreBlogs = async () => {
    try {
      const nextPage = page + 1;
      const newBlogs = await getBlogData(pageSize, nextPage);
      if (newBlogs.length === 0) {
        setHasMore(false);
      } else {
        setBlogs((prevBlogs: any) => [...prevBlogs, ...newBlogs]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
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
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  try {
    const initialBlogs = await getBlogData(pageSize, 1);
    const blog = data.site.blog;
    const title = blog.page;
    const description = blog.description;
    return { props: { title, description, initialBlogs } };
  } catch (error) {
    console.error('Error fetching initial data:', error);
    return { props: { title: '', description: '', initialBlogs: [] } };
  }
};
