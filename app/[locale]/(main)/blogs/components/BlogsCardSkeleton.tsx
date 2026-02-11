import { Skeleton } from "@/components/ui/skeleton";

const BlogsCardSkeleton = () => {
  return (
    <div className="relative bg-background shadow-sm border rounded-2xl overflow-hidden">
      <Skeleton className="w-full aspect-[3/2] rounded-t-2xl" />
      <div className="space-y-2 px-4 pt-6 pb-4">
        <Skeleton className="h-6 w-full rounded-md" />
        <Skeleton className="h-6 w-3/4 rounded-md" />
        
        <div className="flex items-center gap-1 mt-4">
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="h-4 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default BlogsCardSkeleton;
