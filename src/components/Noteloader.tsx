import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Noteloader() {
  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <Skeleton className="h-10 w-3/4" />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {[1, 2, 3, 4].map((_, index) => (
          <Skeleton key={index} className="h-8 w-8" />
        ))}
      </div>

      <div className="min-h-64 space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="mt-4">
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  );
}
