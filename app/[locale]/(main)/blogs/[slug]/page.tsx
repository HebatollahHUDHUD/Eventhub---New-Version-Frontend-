import BlogContent from './content';

type Props = {
  params: any
};

const BlogPage = async ({ params }: Props) => {
  const { slug } = await params;

  return <BlogContent slug={slug} />;
};

export default BlogPage;
