import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Welcome to NoteNest
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Your personal space for capturing ideas, organizing
            thoughts, and boosting productivity.
          </p>
        </div>

        <Card className="mt-8 max-w-md mx-auto">
          <CardContent className="pt-6 pb-8 px-6">
            <h3 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-white">
              Get Started
            </h3>
            <div className="space-y-4">
              {/* <Link href={"/login"}> </Link>{" "} */}
              <div>
                <Link href={"/login"}>
                  <Button className="w-full" variant="outline">
                    {" "}
                    <LogIn className="mr-2 h-4 w-4" /> Log In to Your
                    Account
                  </Button>{" "}
                </Link>{" "}
              </div>
              <div>
                {" "}
                <Link href={"/login"}>
                  <Button className="w-full">
                    <UserPlus className="mr-2 h-4 w-4" /> Create a New
                    Account
                  </Button>{" "}
                </Link>{" "}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              title: "Capture Ideas",
              icon: "💡",
              description:
                "Quickly jot down thoughts and inspirations.",
            },
            {
              title: "Organize Notes",
              icon: "📚",
              description:
                "Categorize and tag your notes for easy retrieval.",
            },
            {
              title: "Sync Across Devices",
              icon: "🔄",
              description:
                "Access your notes from anywhere, anytime.",
            },
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
