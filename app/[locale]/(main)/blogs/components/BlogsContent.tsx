import { getData } from '@/lib/request-server';
import BlogsCard from './BlogsCard';
import BlogsCardSkeleton from './BlogsCardSkeleton';
import { Suspense } from 'react';
import type { BlogPostsResponse } from '../../../../../schemas/types';
import Pagination from '@/components/common/Pagination';

type BlogsContentProps = {
  searchParams: Record<string, string | undefined>;
};

const BlogsContentSkeleton = () => {
  return (
    <div
      className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
      aria-label="Loading blog posts"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <BlogsCardSkeleton key={index} />
      ))}
    </div>
  );
};

const BlogsContent = ({ searchParams }: BlogsContentProps) => {
  return (
    <div className="container-sm">
      <Suspense fallback={<BlogsContentSkeleton />}>
        <BlogsList searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default BlogsContent;

const BlogsList = async ({ searchParams }: BlogsContentProps) => {
  const queryParams = {
    page: searchParams.page || "1",
    category: searchParams.category || "all",
    ...searchParams,
  };

  const data = await getData<BlogPostsResponse>({
    endpoint: "/blog-posts",
    config: {
      next: {
        tags: ["blog-posts"],
        cache: "force-cache",
      },
      queryParams
    }
  });


  const blogs = data.status === "success" ? data.result.blog_posts : null

  const blogPosts = blogs?.data || [];
  const pagination = blogs?.pagination || null;

  return (
    <div className="space-y-6">
      <div
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
        role="list"
        aria-label="Blog posts list"
      >
        {blogPosts.map((blog) => (
          <BlogsCard key={blog.id} blog={blog} />
        ))}
      </div>

      <Pagination pagination={pagination} />
    </div>
  );
};