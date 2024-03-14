
import { Card, CardHeader, CardBody, CardFooter } from '@material-tailwind/react';
import Link from 'next/link';
import {useState, useMemo } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import Head from 'next/head';
import data from '@/data';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getBlogData } from '@/services/spot-prices';
import InfiniteScroll from 'react-infinite-scroll-component';
import dynamic from 'next/dynamic';
const BlogIndexSkeleton= dynamic(()=>import('@/components/Loaders/Blogs/BlogIndexSkeleton'));
const SpinnerBlog = dynamic(()=>import('@/components/Spinner'))
const pageSize = 8;

export default function Blogs({
  title,
  initialBlogs,
}: InferGetServerSidePropsType<typeof getServerSideProps> | any) {
  const [blogs, setBlogs] = useState<any>(initialBlogs);
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

  const canonicalUrl = data.WEBSITEUrl + '/blogs';
  const memoizedBlogs = useMemo(() => blogs, [blogs]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:url" content={canonicalUrl} key={canonicalUrl} />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      {memoizedBlogs.length > 0 ? (
        <div className="text-dark-black">
          <h1 className="container mx-auto mt-14 text-xl font-semibold md:mt-16 md:text-2xl lg:mt-5">
            Blog
          </h1>
          <InfiniteScroll
            dataLength={memoizedBlogs.length}
            next={loadMoreBlogs}
            hasMore={hasMore}
            loader={<SpinnerBlog />}
          >
            <section className="container mx-auto mt-14 grid grid-cols-12 gap-4 sm:mt-20 lg:mt-24 xl:mt-24 2xl:mt-28">
              {memoizedBlogs.map((blog: any) => (
                <Card
                  key={blog.id}
                  className="col-span-12 mx-auto mt-6 mb-10 h-[22rem] w-full duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-md sm:col-span-6 sm:mb-20 sm:mt-6 sm:h-[23rem] lg:col-span-4 lg:mb-20 lg:mt-2 lg:h-96 2xl:col-span-3 2xl:h-[22rem]"
                >
                  <Link
                    href={`/blogs/${blog.code}`}
                    as={`/blogs/${blog.code}`}
                    passHref
                    prefetch={false}
                  >
                    <CardBody className="px-4 pt-2 sm:pt-3 md:mt-3 md:pt-2 lg:-mt-2 xl:mt-1">
                      <h3 className="h-10 text-[1.125rem] font-semibold leading-5 md:h-9">
                        {(blog.title.length >= 48) ? blog.title.slice(0, 42)+ '...' : blog.title}
                      </h3>
                      <p
                        className="h-15 mt-2 text-[0.95rem] leading-[1.4rem] text-gray-500"
                        dangerouslySetInnerHTML={{
                          __html:
                            blog.shortDescription.length <= 29
                              ? blog.shortDescription
                              : blog.shortDescription.slice(0, 100) + '...',
                        }}
                      ></p>
                      <h4 className="pt-24 text-xs font-normal italic text-[#5c5b5b] md:pt-20 lg:pt-24 2xl:pt-[4.5rem]">
                        By BullionMentor on{' '}
                        {new Intl.DateTimeFormat('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        }).format(new Date(blog.publishdate))}
                      </h4>
                    </CardBody>
                    <CardFooter className="flex sm:mt-1 2xl:mt-2">
                      <Link
                        href={`/blogs/${blog.code}`}
                        as={`/blogs/${blog.code}`}
                        className="flex px-4 py-2 font-semibold text-primary shadow-none hover:underline hover:underline-offset-2 md:px-6 md:text-sm lg:px-4 lg:py-1 lg:text-sm"
                        passHref
                        prefetch={false}
                      >
                        Read More
                        <BsArrowRight
                          className="ml-1 text-primary"
                          size={20}
                        ></BsArrowRight>
                      </Link>
                    </CardFooter>
                  </Link>
                </Card>
              ))}
            </section>
          </InfiniteScroll>
          {/* ShareModal goes here */}
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
