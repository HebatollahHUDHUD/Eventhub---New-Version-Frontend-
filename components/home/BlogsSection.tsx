import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import BlogsList from "./BlogsList";
import type { HomeBlogPost } from "@/schemas/home";

interface BlogsSectionProps {
  title: string;
  subtitle: string;
  description: string;
  blogPosts: HomeBlogPost[];
}

const BlogsSection = ({ title, subtitle, description, blogPosts }: BlogsSectionProps) => {
  const t = useTranslations("home.blogs");

  return (
    <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden bg-white">
      <div className="container relative z-10">
        <div className="space-y-8 md:space-y-12">
          {/* Blog Post Tag */}

          <div className="flex justify-center">
            <Button
              asChild
              size={"sm"}
              variant={"secondary"}
              className="rounded-full"
            >
              <Link href="/blogs">
                {t("tag")}
              </Link>
            </Button>
          </div>

          {/* Heading and Description */}
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground">
              {title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {subtitle}
            </p>
          </div>

          {/* Blog Cards */}
          <BlogsList blogPosts={blogPosts} />

          {/* View More Button */}
          <div className="flex justify-center">
            <Button
              asChild
              variant={"pink"}
            >
              <Link href="/blogs" className="flex items-center gap-2">
                {t("viewMore")}
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
