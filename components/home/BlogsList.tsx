import BlogsCard from "@/app/[locale]/(main)/blogs/components/BlogsCard";
import type { HomeBlogPost } from "@/schemas/home";
import type { BlogPost } from "@/schemas/types";

interface BlogsListProps {
  blogPosts: HomeBlogPost[];
}

const BlogsList = ({ blogPosts }: BlogsListProps) => {
  // Show only first 3 blogs
  const blogsToShow = blogPosts.slice(0, 3);

  if (blogsToShow.length === 0) return null;

  // Transform HomeBlogPost to BlogPost format for the card
  const transformedBlogs: BlogPost[] = blogsToShow.map((blog) => ({
    id: blog.id,
    slug: blog.slug,
    image: blog.image,
    title: blog.title,
    content: blog.content,
    category: blog.category,
    writer: {
      id: 0,
      name: "",
      photo: null,
      email: "",
      user_type: "",
      mobile: null,
      gender: null,
      address: null,
      bio: null,
      role: null,
      other_position: null,
      experience_years: null,
      available_for_work: false,
      price_per_project: false,
      facebook_url: null,
      instagram_url: null,
      youtube_url: null,
      linkedin_url: null,
      last_login_at: null,
    },
    created_at: blog.created_at,
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {transformedBlogs.map((blog) => (
        <BlogsCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogsList;
