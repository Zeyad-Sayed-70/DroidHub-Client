import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LoadingCard = () => {
  return (
    <div className="flex flex-col justify-between p-4 rounded-md bg-background min-w-[220px] max-w-[250px] w-[30%]">
      <Skeleton className="h-[188px] rounded-md object-cover mb-3" />
      <div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-full mt-2" />
      </div>
      <Skeleton className="h-8 w-full mt-3" />
    </div>
  );
};

export default LoadingCard;
