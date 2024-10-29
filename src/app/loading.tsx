// import * as React from "react";
// import { Notebook } from "lucide-react";

// import { Skeleton } from "@/components/ui/skeleton";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from "@/components/ui/card";

// export default function HomePageSkeleton() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
//       <main className="container mx-auto px-4 py-8">
//         <div className="mb-8 flex items-center justify-between">
//           <Skeleton className="h-10 w-40" />
//           <Skeleton className="h-10 w-32" />
//         </div>

//         <div className="mb-8">
//           <Skeleton className="h-10 w-full" />
//         </div>

//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {Array.from({ length: 6 }).map((_, index) => (
//             <Card key={index}>
//               <CardHeader>
//                 <Skeleton className="h-6 w-3/4 mb-2" />
//                 <Skeleton className="h-4 w-full" />
//               </CardHeader>
//               <CardContent>
//                 <Skeleton className="h-4 w-1/2" />
//               </CardContent>
//               <CardFooter>
//                 <Skeleton className="h-10 w-full" />
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </main>

//       <footer className="border-t bg-white dark:bg-gray-800 mt-12 py-6 text-center">
//         <Skeleton className="h-4 w-48 mx-auto" />
//       </footer>
//     </div>
//   );
// }
"use client";

import React from "react";
import { motion } from "framer-motion";

const LoadingDot = ({ delay }: { delay: number }) => (
  <motion.div
    className="w-4 h-4 bg-primary rounded-full"
    initial={{ scale: 0 }}
    animate={{ scale: [0.2, 1, 0.2] }}
    transition={{
      duration: 0.5,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
);

export default function AppLoading() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <motion.div
        className="relative w-24 h-24"
        animate={{ rotate: 360 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <motion.div
            key={i}
            className="absolute w-full h-full"
            initial={{ rotate: i * 60 }}
            animate={{ rotate: [i * 60, i * 60 + 360] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}>
            <LoadingDot delay={i * 0.2} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
