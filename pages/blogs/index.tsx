import ShareModal from '@/components/ModalForm/ShareModal/shareModal';
import useToggle from '@/hooks/useToggle';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import data from '@/data';
import Spinner from '@/components/Spinner';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getBlogData } from '@/services/spot-prices';
import { Blog } from '@/interfaces/typeinterfaces';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader
} from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
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
    const newBlogs = await getBlogData(pageSize, nextPage);
    if (newBlogs.length === 0) {
      setHasMore(false);
    } else {
      setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
      setPage(nextPage);
    }
  };
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          property='og:url'
          content={data.WEBSITEUrl + '/blogs'}
          key={data.WEBSITEUrl + '/blogs'}
        />
        <link rel='canonical' href={data.WEBSITEUrl + '/blogs'} />
        {blogs.map((blog) => (
          <link key={blog.id} rel='preload' as='image' href={blog.image} />
        ))}
      </Head>
      <div className='text-dark-black'>
        <h1 className='container mx-auto mt-14 text-xl font-semibold md:mt-16 md:text-2xl lg:mt-5'>
          Blog
        </h1>
        <InfiniteScroll
          dataLength={blogs.length}
          next={loadMoreBlogs}
          hasMore={hasMore}
          loader={<Spinner />}
        >
          <section className='container mx-auto mt-14 grid grid-cols-12 gap-4 sm:mt-20 lg:mt-24 2xl:mt-28'>
            {blogs.map((blog: any) => (
              <Card
                key={blog.id}
                className='col-span-12 mx-auto mt-6 mb-10 h-[22rem] w-full duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-md sm:col-span-6 sm:mb-20 sm:h-[23rem]
                         lg:col-span-4 lg:mb-20 lg:mt-2 lg:h-96 2xl:col-span-3 2xl:h-[22rem]'
              >
                <Link
                  href={`/blogs/${blog.code}`}
                  as={`/blogs/${blog.code}`}
                  passHref
                  prefetch={false}
                >
                  <CardHeader
                    floated={true}
                    className='mx-1 -mt-16 h-40 shadow-none sm:mt-[-4rem] sm:h-44 md:-mt-20 md:h-48 lg:-mt-[65px] lg:h-52 xl:mx-2 xl:-mt-20'
                  >
                    {' '}
                    <Image
                      fill
                      src={blog.image}
                      alt={blog.title}
                      className='h-40 w-full rounded-[17px] px-1 sm:h-44 md:h-48 lg:h-48 xl:h-52'
                      loading='eager'
                    />
                  </CardHeader>
                  <CardBody className='mt-0 px-4 pt-2 sm:pt-3 md:mt-3 lg:-mt-2 xl:mt-1'>
                    <h3 className='text-[1.125rem] font-semibold leading-5 md:h-9'>
                      {blog.title}
                    </h3>
                    <p
                      className='h-10 pt-6 text-[0.95rem] leading-[1.4rem] text-gray-500'
                      dangerouslySetInnerHTML={{
                        __html:
                          blog.description.length <= 29
                            ? blog.description
                            : blog.description.slice(0, 100) + '...'
                      }}
                    ></p>
                    <h4 className='pt-24 md:pt-20 lg:pt-24 2xl:pt-[4.5rem] text-xs font-normal italic text-[#5c5b5b]'>
                      By BullionMentor on{' '}
                      {new Intl.DateTimeFormat('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      }).format(new Date(blog.publishdate))}
                    </h4>
                  </CardBody>
                  <CardFooter className=' flex sm:mt-1 2xl:mt-2'>
                    <Link
                      href={`/blogs/${blog.code}`}
                      as={`/blogs/${blog.code}`}
                      className='flex px-4 py-2 font-semibold text-primary hover:underline md:px-6 md:text-sm lg:px-4 lg:py-1'
                      passHref
                      prefetch={false}
                    >
                      Read More
                      <BsArrowRight
                        className='ml-1 text-primary'
                        size={20}
                      ></BsArrowRight>
                    </Link>
                  </CardFooter>
                </Link>
              </Card>
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
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    res.setHeader( 'Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59' );
    const pageNumber = 1;
    const initialBlogs = await getBlogData(pageSize, pageNumber);
    const blog = data.site.blog;
    const title = blog.page;
    const description = blog.description;
    return {
      props: {
        title,
        description,
        initialBlogs
      },
    }
  }
  
