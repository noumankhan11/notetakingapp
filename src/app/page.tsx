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
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { INote } from "@/models/note.model";

export default function Home() {
  const { data: session, status } = useSession();
  const [noteData, setNoteData] = React.useState<INote[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const { toast } = useToast();

  const id = session?.user._id;

  React.useEffect(() => {
    id &&
      (async () => {
        try {
          const response = await axios.get(
            `/api/get-all-notes?id=${id}`
          );
          if (!response?.data.success) {
            toast({
              title: "Error",
              description: response?.data.message,
              variant: "destructive",
            });
          }
          const sortedNotes = response.data.data.sort(
            (a: INote, b: INote) => {
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            }
          );

          setNoteData(sortedNotes);
        } catch (error) {
          toast({
            title: "Error",
            description:
              "Faild to show notes, please refresh the page",
            variant: "destructive",
          });
        }
      })();
  }, [session]);

  const filteredNotes = noteData.filter(
    (note) =>
      note.title
        .toLowerCase()
        .trim()
        .includes(searchTerm.toLowerCase()) ||
      note.content
        .toLowerCase()
        .trim()
        .includes(searchTerm.toLowerCase())
  );

  if (status === "authenticated")
    if (noteData?.length <= 0) {
      return <NoNotesYet _id={id!} />;
    }

  if (status === "unauthenticated") {
    return <Welcome />;
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredNotes.length > 0
            ? filteredNotes.map((note, index) => {
                const displayContent =
                  note.content.length > 220
                    ? note.content.slice(0, 220) + "..."
                    : note.content;
                return (
                  <Card
                    key={index}
                    className="overflow-hidden h-[275px]  p-4 relative">
                    <CardHeader className="p-3">
                      <CardTitle>{note.title}</CardTitle>
                      <CardDescription className="overflow-hidden">
                        <div
                          className="h-32 py-2"
                          dangerouslySetInnerHTML={{
                            __html: displayContent,
                          }}>
                          {/* {note.content} */}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="overflow-hidden pb-2">
                      <p className="text-sm  text-gray-500 dark:text-gray-400">
                        Last edited:
                        {new Date(note?.updatedAt).toLocaleString()}
                      </p>
                    </CardContent>
                    <CardFooter className="absolute left-5 right-5 bottom-0 py-3 px-2 z-10 bg-white">
                      <Link
                        href={`/note/${note._id}`}
                        className="w-full ">
                        {" "}
                        <Button
                          variant="ghost"
                          className="w-full bg-gray-100 hover:bg-gray-200">
                          {" "}
                          View Note{" "}
                        </Button>{" "}
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })
            : noteData.length > 0
            ? "No data matched"
            : "add some note"}
        </div>
      </main>
    </div>
  );
}
