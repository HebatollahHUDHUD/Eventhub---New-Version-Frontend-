import { Skeleton } from "@/components/ui/skeleton";

const OpportunitiesCardSkeleton = () => {
  return (
    <div className="relative bg-background shadow-sm border rounded-2xl overflow-hidden p-6 flex flex-col items-center gap-4">
      <Skeleton className="w-32 h-32 rounded-full" />
      <div className="space-y-2 w-full flex flex-col items-center">
        <Skeleton className="h-5 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-1/2 rounded-md" />
      </div>
      <Skeleton className="w-8 h-8 rounded-full self-end" />
    </div>
  );
};

export default OpportunitiesCardSkeleton;
