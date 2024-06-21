import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const PostSkeleton = () => {
  return (
    <div className="max-w-[600px] w-full bg-white p-4 rounded-md shadow-sm border-2 border-border flex flex-col gap-4">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div>
            <Skeleton className="h-2 w-28 rounded-md mb-1" />
            <Skeleton className="h-2 w-12 rounded-md" />
          </div>
        </div>
        <div>
          <Skeleton className="h-1 w-1 rounded-full mb-[3px]" />
          <Skeleton className="h-1 w-1 rounded-full mb-[3px]" />
          <Skeleton className="h-1 w-1 rounded-full mb-[3px]" />
        </div>
      </header>

      <div>
        <Skeleton className="h-3 w-full rounded-md mb-1" />
        <Skeleton className="h-3 w-full rounded-md mb-1" />
        <Skeleton className="h-3 w-full rounded-md mb-1" />
        <Skeleton className="h-3 w-full rounded-md mb-1" />
        <Skeleton className="h-3 w-full rounded-md mb-1" />
        <Skeleton className="h-3 w-60 rounded-md mb-1" />
      </div>

      <Skeleton className="h-64 w-full rounded-md" />

      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[49%] rounded-md" />
        <Skeleton className="h-10 w-[49%] rounded-md" />
      </div>
    </div>
  );
};

export default PostSkeleton;
