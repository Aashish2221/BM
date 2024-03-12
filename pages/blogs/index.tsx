import ShareModal from '@/components/ModalForm/ShareModal/shareModal';
import useToggle from '@/hooks/useToggle';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import Head from 'next/head';
import data from '@/data';
import { SpinnerBlog } from '@/components/Spinner';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getBlogData } from '@/services/spot-prices';
import InfiniteScroll from 'react-infinite-scroll-component';
import BlogIndexSkeleton from '@/components/Loaders/Blogs/BlogIndexSkeleton';
import { Blog } from '@/interfaces/typeinterfaces';
const pageSize = 8;
export default function Blogs({
  title ,initialBlogs
}: InferGetServerSidePropsType<typeof getServerSideProps> | any) {
  const [shareModal, toggleShareModal] = useToggle();
  const [share, setShare] = useState<any>();
  const [blogs, setBlogs] = useState<any>();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(()=>{
    const pageNumber = 1;
    const initialData = async()=>{
      const initialBlogs = await getBlogData(pageSize, pageNumber);
      setBlogs(initialBlogs)
      setHydrated(true) 
    }
    initialData(); 
    setShare(window.location.href);
  },[])
  const loadMoreBlogs = async () => {
    const nextPage = page + 1;
    const newBlogs = await getBlogData(pageSize, nextPage);
    if (newBlogs.length === 0) {
      setHasMore(false);
    } else {
      setBlogs((prevBlogs: any) => [...prevBlogs, ...newBlogs]);
      setPage(nextPage);
    }
  };
  const canonicalUrl = data.WEBSITEUrl + '/blogs';
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property='og:url' content={canonicalUrl} key={canonicalUrl} />
        <link rel='canonical' href={canonicalUrl} />
        {blogs?.map((blog:any)=>
          <link key={blog.id} rel="preload" as="image" href={blog.image} />
          )}
      </Head>
      {hydrated === true ? (
        <div className='text-dark-black'>
          <h1 className='semibold container mx-auto mt-14 text-xl font-medium md:mt-16 md:text-2xl lg:mt-5'>
            Blog
          </h1>
          <InfiniteScroll
          dataLength={blogs.length}
          next={loadMoreBlogs}
          hasMore={hasMore}
          loader={<SpinnerBlog />} >
          {/* ----------------- blog section ------------- */}
          <section className='container mx-auto mt-14 grid grid-cols-12 gap-4 sm:mt-20 lg:mt-24 xl:mt-24 2xl:mt-28'>
            {blogs.map((blogs:any ) => (
              <Card
                key={blogs.id}
                className='col-span-12 mx-auto mt-6 mb-10 h-[22rem] w-full duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-md sm:col-span-6 sm:mb-20 sm:mt-6 sm:h-[23rem]
                   lg:col-span-4 lg:mb-20 lg:mt-2 lg:h-96 2xl:col-span-3 2xl:h-[22rem]'
              >
                <Link
                  href={`/blogs/${blogs.code}`}
                  as={`/blogs/${blogs.code}`}
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
                      src={blogs.image}
                      alt={blogs.title}
                      className='rounded-[17px] px-1  lg:h-48 xl:h-52'
                      priority
                      loading='eager'
                    />
                  </CardHeader>
                  <CardBody className='px-4 pt-2 sm:pt-3 md:mt-3 md:pt-2 lg:-mt-2 xl:mt-1'>
                    <h3 className='h-10 text-[1.125rem] font-semibold leading-5 md:h-9'>
                      {blogs.title}
                    </h3>
                    <p
                      className='h-10 pt-6 text-[0.95rem] leading-[1.4rem] text-gray-500'
                      dangerouslySetInnerHTML={{
                        __html:
                          blogs.shortDescription.length <= 29
                            ? blogs.shortDescription
                            : blogs.shortDescription
                            .slice(0, 100) + '...'
                      }}
                    ></p>
                    <h4 className='pt-24 text-xs font-normal italic text-[#5c5b5b] md:pt-20 lg:pt-24 2xl:pt-[4.5rem]'>
                      By BullionMentor on{' '}
                      {new Intl.DateTimeFormat('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      }).format(new Date(blogs.publishdate))}
                    </h4>
                  </CardBody>
                  <CardFooter className='flex sm:mt-1 2xl:mt-2'>
                    <Link
                      href={`/blogs/${blogs.code}`}
                      as={`/blogs/${blogs.code}`}
                      className='flex px-4 py-2 font-semibold text-primary shadow-none hover:underline hover:underline-offset-2 md:px-6 md:text-sm lg:px-4 lg:py-1 lg:text-sm'
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
          <ShareModal closeModal={toggleShareModal} shareUrl={share} p1={''} p2={''}
          />
        )}
      </div>
       ): <BlogIndexSkeleton/>}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  const blog = data.site.blog;
  const title = blog.page;
  const description = blog.description;
  return {props: { title, description}};
};