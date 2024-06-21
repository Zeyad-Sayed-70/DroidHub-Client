import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ListItemSkeleton = () => {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div>
        <Skeleton className="h-2 w-28 rounded-md mb-1" />
        <Skeleton className="h-2 w-12 rounded-md" />
      </div>
      <Skeleton className="h-8 w-20 rounded-md" />
    </div>
  );
};

export default ListItemSkeleton;
