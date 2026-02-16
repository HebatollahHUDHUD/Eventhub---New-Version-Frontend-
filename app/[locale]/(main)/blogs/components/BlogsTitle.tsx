"use client";

import { useGetData } from "@/hooks/useFetch";

interface BlogsPageResponse {
  blog_page_title: string;
  blog_page_subtitle: string;
}

export default function BlogsTitle() {
  const { data, isLoading } = useGetData<BlogsPageResponse>({
    endpoint: "/blog-page",
  });

  const blog =
    data?.status === "success" ? data.result : null;

  if (isLoading) {
    return (
      <div className="space-y-4 mx-auto text-center">
        <div className="h-8 w-48 bg-gray-200 animate-pulse mx-auto rounded" />
        <div className="h-4 w-72 bg-gray-200 animate-pulse mx-auto rounded" />
      </div>
    );
  }

  return (
    <div className="space-y-4 mx-auto text-center max-w-md">
      <h2 className="title-2">
        {blog?.blog_page_title ?? ""}
      </h2>
      <div className="description">
        {blog?.blog_page_subtitle ?? ""}
      </div>
    </div>
  );
}
