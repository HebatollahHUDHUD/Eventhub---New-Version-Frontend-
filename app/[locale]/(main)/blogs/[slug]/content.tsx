import { getData } from "@/lib/request-server";
import type { BlogPostDetailsResponse } from "@/schemas/types";
import Image from "@/components/common/image";
import Link from "next/link";
import { CalendarIcon } from "lucide-react";
import moment from "moment";
import { getTranslations } from "next-intl/server";

type BlogContentProps = {
  slug: string;
};

const BlogContent = async ({ slug }: BlogContentProps) => {
  const data = await getData<BlogPostDetailsResponse>({
    endpoint: `/blog-posts/${slug}`,
  });

  const blog = data?.status === "success" ? data.result.blog_post : null;
  const similarBlogs =
    data?.status === "success" ? data?.result?.similar_blog_posts : [];

  const formattedDate = moment(blog?.created_at).format("DD MMM, YYYY");
  const t = await getTranslations("blogs");

  return (
    <div className="flex flex-col space-y-10 py-10">
      <section className="container px-6 xl:px-20">
        <div className="relative">
          <Image
            src={blog?.image || ""}
            alt={blog?.title}
            hasPreview
            width={800}
            height={450}
            className="
              w-full 
              md:max-w-[500px] 
              lg:max-w-[600px] 
              aspect-[16/9] 
              rounded-t-4xl 
              object-cover 
              mb-6 
              md:float-end md:ms-6 md:mb-1
            "
          />

          <div className="space-y-4 leading-7">
            <Link
              href="/blogs"
              className="text-accentBlue underline title-5 block"
            >
              {t("back_to_blog_list")}
            </Link>

            <h2 className="title-2 max-w-full md:max-w-[550px]">
              {blog?.title}
            </h2>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="bg-accentPink text-white title-5 px-3 py-0.5 rounded-lg capitalize">
                {blog?.category?.name}
              </span>
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" aria-hidden="true" />
                <time dateTime={blog?.created_at}>{formattedDate}</time>
              </div>
            </div>

            <div className="description text-justify">
              <p>{blog?.content}</p>
            </div>
          </div>
        </div>
      </section>

      {similarBlogs?.length > 0 && (
        <section className="container-sm space-y-6">
          <div className="space-y-4 max-w-2xl mx-auto text-center">
            <h2 className="title-2">{t("title-details")}</h2>
            <p className="description">{t("description")}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {similarBlogs?.map((item: any) => {
              const itemDate = moment(item?.created_at).format("DD MMM, YYYY");

              return (
                <Link
                  key={item.id}
                  href={`/blogs/${item.slug}`}
                  className="h-full"
                  role="listitem"
                >
                  <article className="relative h-full bg-background shadow-sm border rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300">
                    <div className="relative w-full aspect-3/2 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title || "Blog post image"}
                        width={400}
                        height={267}
                        className="w-full h-full object-cover rounded-t-2xl"
                      />

                      <span className="absolute bottom-3 left-3 bg-accentPink text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md capitalize z-10">
                        {item.category?.name}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2 px-4 pt-6 pb-4 h-full">
                      <h2 className="title-4 line-clamp-2">{item?.title}</h2>
                      <div className="flex items-center gap-1">
                        <CalendarIcon
                          className="w-4 h-4 text-muted-foreground"
                          aria-hidden="true"
                        />
                        <time
                          dateTime={item?.created_at}
                          className="text-sm text-muted-foreground"
                        >
                          {itemDate}
                        </time>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogContent;
