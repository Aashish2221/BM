import ShareModal from '@/components/ModalForm/ShareModal/shareModal';
import useToggle from '@/hooks/useToggle';
import Link from 'next/link';
import {useMemo, useState } from 'react';
import Head from 'next/head';
import data from '@/data';
import { SpinnerBlog } from '@/components/Spinner';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getBlogsData } from '@/services/spot-prices';
import InfiniteScroll from 'react-infinite-scroll-component';
import BlogSkeleton from '@/components/Loaders/BlogIndexSkeleton/BlogSkeleton';
import { BlogCard } from '@/components/BlogCard';
const pageSize = 8;
export default function Blogs({
  title ,initialBlogs
}: InferGetServerSidePropsType<typeof getServerSideProps> | any) {
  const [shareModal, toggleShareModal] = useToggle();
  const [share, setShare] = useState<any>(window.location.href);
  const [blogs, setBlogs] = useState<any>(initialBlogs);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  
  const loadMoreBlogs = async () => {
    const nextPage = page + 1;
    const newBlogs = await getBlogsData(pageSize, nextPage);
    if (newBlogs.length === 0) {
      setHasMore(false);
    } else {
      setBlogs((prevBlogs: any) => [...prevBlogs, ...newBlogs]);
      setPage(nextPage);
      setHydrated(true);
    }
};
  const canonicalUrl = data.WEBSITEUrl + '/blogs';
  const memoizedBlogs = useMemo(() => blogs, [blogs]);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property='og:url' content={canonicalUrl} key={canonicalUrl} />
        <link rel='canonical' href={canonicalUrl} />
        {memoizedBlogs.map((blog:any)=>
          <Link key={blog.id} rel="preload" as='image' href={blog.image} />
        )}
      </Head>
      {hydrated === true ? 
        <div className='text-dark-black'>
          <h1 className='semibold container mx-auto mt-14 text-xl font-medium md:mt-16 md:text-2xl lg:mt-5'>
            Blog
          </h1>
          <InfiniteScroll
            dataLength={blogs.length}
            next={loadMoreBlogs}
            hasMore={hasMore}
            loader={<SpinnerBlog />}
          >
          {/* ----------------- blog section ------------- */}
          <section className='container mx-auto mt-14 grid grid-cols-12 gap-4 sm:mt-20 lg:mt-24 xl:mt-24 2xl:mt-28'>
            {memoizedBlogs.map((blog:any ) => (
                <BlogCard key={blog.id} blog={blog} />
            ))}
          </section>
          </InfiniteScroll>
          {shareModal && (
            <ShareModal
              closeModal={toggleShareModal}
              shareUrl={share}
              p1={''}
              p2={''}
            />
          )}
        </div>
        : <BlogSkeleton/>}
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
