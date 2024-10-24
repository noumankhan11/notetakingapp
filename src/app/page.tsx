"use client";
import * as React from "react";
import Link from "next/link";
import {
  Notebook,
  PenLine,
  Search,
  Plus,
  Settings,
  UserPlus,
  LogIn,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import NoNotesYet from "@/components/NoNotesYet";
import Welcome from "@/components/Welcome";

export default function Home() {
  const { data: session, status } = useSession();
  const data = true;

  if (!session?.user) {
    return <Welcome />;
  }

  if (session?.user)
    if (!data) {
      return <NoNotesYet />;
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Notes
          </h2>
          <Link href={`/createnote/${session?.user._id}`}>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Note
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Search your notes..."
              type="search"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Project Ideas",
              description:
                "Brainstorming session for new app concepts",
              date: "2023-06-15",
            },
            {
              title: "Meeting Notes",
              description: "Team sync-up discussion points",
              date: "2023-06-14",
            },
            {
              title: "Book Summary",
              description: "Key takeaways from 'Atomic Habits'",
              date: "2023-06-13",
            },
            {
              title: "Travel Plans",
              description: "Itinerary for upcoming vacation",
              date: "2023-06-12",
            },
            {
              title: "Recipe Collection",
              description: "Favorite recipes and cooking tips",
              date: "2023-06-11",
            },
            {
              title: "Workout Routine",
              description:
                "Weekly exercise plan and progress tracking",
              date: "2023-06-10",
            },
          ].map((note, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{note.title}</CardTitle>
                <CardDescription>{note.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last edited: {note.date}
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  <Link href={`/notes/${index}`}>View Note</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
