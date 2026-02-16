import Image from "@/components/common/image";
import { CalendarIcon } from "lucide-react";
import moment from "moment";
import type { BlogPost } from "../../../../../schemas/types";
import Link from "next/link";

type BlogsCardProps = {
  blog: BlogPost;
};

const BlogsCard = ({ blog }: BlogsCardProps) => {
  const formattedDate = moment(blog.created_at).format("DD MM, YYYY");

  return (
    <Link key={blog.id} href={`/blogs/${blog.slug}`} className="h-full" role="listitem">
      <article
        className="relative h-full bg-background shadow-sm border rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300"
        role="listitem"
      >
        <div className="relative w-full aspect-3/2 overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title || "Blog post image"}
            width={400}
            height={267}
            hasPreview
            className="w-full h-full object-cover rounded-t-2xl"
          />
          <span className="absolute bottom-3 left-3 bg-accentPink text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md capitalize z-10">
            {blog?.category?.name}
          </span>

        </div>

        <div className="flex flex-col gap-2 px-4 pt-6 pb-4">
          <h2 className="title-4 line-clamp-2">{blog.title}</h2>

          <div
            className="flex items-center gap-1 mt-auto"
            aria-label={`Published on ${formattedDate}`}
          >
            <CalendarIcon
              className="w-4 h-4 text-muted-foreground"
              aria-hidden="true"
            />
            <time
              dateTime={blog.created_at}
              className="text-sm text-muted-foreground"
            >
              {formattedDate}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogsCard;
