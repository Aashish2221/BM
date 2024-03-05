import ShareModal from '@/components/ModalForm/ShareModal/shareModal';
import useToggle from '@/hooks/useToggle';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import data from '@/data';
import Spinner from '@/components/Spinner';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getBlogsData } from '@/services/spot-prices';
import { Blog } from '@/interfaces/typeinterfaces';
import InfiniteScroll from 'react-infinite-scroll-component';
import BlogsData from './BlogsData';
const pageSize = 8;
export default function Blogs({
  title,
  initialBlogs
}: InferGetServerSidePropsType<typeof getServerSideProps> | any) {
  const [shareModal, toggleShareModal] = useToggle();
  const [share, setShare] = useState<any>();
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setShare(window.location.href);
  }, []);

  const loadMoreBlogs = async () => {
    const nextPage = page + 1;
    const newBlogs = await getBlogsData(pageSize, nextPage);
    if (newBlogs.length === 0) {
      setHasMore(false);
    } else {
      setBlogs(prevBlogs => [...prevBlogs, ...newBlogs]);
      setPage(nextPage);
    }
  };
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property='og:url' content={data.WEBSITEUrl + '/blogs'} key={data.WEBSITEUrl + '/blogs'} />
        <link rel='canonical' href={data.WEBSITEUrl + '/blogs'} />
      </Head>
      <div className='text-dark-black'>
        <h1 className='semibold container mx-auto mt-14 text-xl font-medium md:mt-16 md:text-2xl lg:mt-5'>
          Blog
        </h1>
        <InfiniteScroll
          dataLength={blogs.length}
          next={loadMoreBlogs}
          hasMore={hasMore}
          loader={<Spinner />}
        >
         <BlogsData blogs={blogs} />
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
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  initialBlogs: Awaited<ReturnType<typeof getBlogsData>>;
}> = async ({ res }) => {
  res.setHeader(
    'Cache-control',
    'public, sa-maxage=10, state-while-revalidate=59'
  );
  const pageNumber=1;
  const initialBlogs = await getBlogsData(pageSize, pageNumber); // Fetch the first page with 8 items per page
  const blog = data.site.blog;
  const title = blog.page;
  const description = blog.description;
  return {
    props: {
      title,
      description,
      initialBlogs
    }
  };
};

