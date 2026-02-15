import { getData } from "@/lib/request-server";
import BlogsCard from "@/app/[locale]/(main)/blogs/components/BlogsCard";
import type { BlogPostsResponse } from "@/schemas/types";

const BlogsList = async () => {
  const data = await getData<BlogPostsResponse>({
    endpoint: "/blog-posts",
    config: {
      queryParams: {
        page: "1",
      },
      next: {
        tags: ["blog-posts"],
      },
    },
  });

  // Response structure: data.result.blog_posts.data
  const blogPosts = data.status === "success" ? data?.result?.blog_posts?.data : [];

  // Show only first 3 blogs
  const blogsToShow = blogPosts.slice(0, 3);

  if (blogsToShow.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {blogsToShow.map((blog) => (
        <BlogsCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogsList;
