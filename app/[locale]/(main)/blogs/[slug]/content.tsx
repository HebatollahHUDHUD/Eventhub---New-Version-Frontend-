import { getData } from "@/lib/request-server";
import type { BlogPostDetailsResponse } from "@/schemas/types";
import Image from "@/components/common/image";
import Link from "next/link";
import { CalendarIcon } from "lucide-react";
import moment from "moment";
import { getTranslations } from "next-intl/server";
import BlogsContent from "../components/BlogsContent";

type BlogContentProps = {
  slug: string;
};

const BlogContent = async ({ slug }: BlogContentProps) => {
  const data = await getData<BlogPostDetailsResponse>({ endpoint: `/blog-posts/${slug}` });
  const blog = data?.result?.blog_post;

  const formattedDate = moment(blog?.created_at).format("DD MMM, YYYY");
  const t = await getTranslations("blogs");

  return (
    <div className="flex flex-col space-y-10 py-10">
      <section className="container px-6 xl:px-20">
        <div className="relative">
          <Image
            src={blog?.image}
            alt={blog?.title}
            hasPreview
            width={800}
            height={450}
            className="
              w-full 
              md:max-w-[600px] 
              aspect-[16/9] 
              rounded-t-4xl 
              object-cover 
              mb-6 
              md:float-right md:ml-6 md:mb-1
            "
          />

          <div className="space-y-4 leading-7">
            <Link href="/blogs" className="text-accentBlue underline title-5 block">
              {t("back_to_blog_list")}
            </Link>

            <h2 className="title-2 max-w-full md:max-w-[550px]">{blog?.title}</h2>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="bg-accentPink text-white title-5 px-3 py-0.5 rounded-lg capitalize">
                {blog?.category?.name}
              </span>
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" aria-hidden="true" />
                <time dateTime={blog?.created_at}>{formattedDate}</time>
              </div>
            </div>

            <div className="description">
              <p>{blog?.content}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-sm space-y-6">
        <div className="space-y-4 max-w-3xl mx-auto text-center">
          <h2 className="title-1">{t("title-details")}</h2>
          <p className="description">{t("description")}</p>
        </div>

        <BlogsContent />
      </section>
    </div>
  );
};


export default BlogContent; 