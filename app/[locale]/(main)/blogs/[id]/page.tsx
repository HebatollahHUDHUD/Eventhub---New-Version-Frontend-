import BlogContent from './content';

type Props = {
  params: { slug: string , id: string };
};

const BlogPage = ({ params }: Props) => {
  return <BlogContent params={params} />;
};

export default BlogPage;
