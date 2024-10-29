import * as React from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function NewNotePageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="border-b bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
            <ChevronLeft className="h-5 w-5" />
            <span>Back to Notes</span>
          </Link>
          <Skeleton className="h-9 w-20" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <Skeleton className="h-10 w-3/4 mb-6" />
            {/* <div className="space-y-2 mb-6">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-3/4" />
            </div> */}
            {/* <div className="flex flex-wrap gap-2 mb-6">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <Skeleton key={index} className="h-8 w-8" />
              ))}
            </div> */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-3 mt-10 w-1/3" />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
