"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  ChevronLeft,
  Edit2,
  Trash2,
  Save,
  X,
  Bold,
  Italic,
  List,
  ListOrdered,
  Undo,
  Redo,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { INote } from "@/models/note.model";
import axios from "axios";

import Noteloader from "@/components/Noteloader";
export default function NotePage({
  params,
}: {
  params: { id: string };
}) {
  const [isEditing, setIsEditing] = React.useState(false);

  // <INote | null>(null)
  const [note, setNote] = React.useState<INote | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const editor = useEditor({
    extensions: [StarterKit],
    content: note?.content || "Loading text...",
    editable: false,
    editorProps: {
      attributes: {
        class:
          "prose p-2 prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto border-transparent border-2 rounded-lg focus:border-gray-200 focus:outline-none",
      },
    },
  });

  const getData = async () => {
    try {
      const response = await axios.get(
        `/api/getnote?id=${params.id}`
      );
      if (response?.data.success) {
        const data = await response?.data.note;
        setNote(data);
      }
      if (!response?.data.success) {
        toast({
          title: "Error",
          description:
            "Failed to fetch note. Please refresh the page.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch note. Please refresh the page.",
        variant: "destructive",
      });
    }
  };
  React.useEffect(() => {
    getData();
  }, [isEditing, params.id]);

  React.useEffect(() => {
    if (editor && isEditing) {
      editor.setEditable(true);
    } else if (editor && !isEditing) {
      editor.setEditable(false);
    }
  }, [editor, isEditing]);
  React.useEffect(() => {
    if (editor && note) {
      editor.commands.setContent(note.content); // Set new content
    }
  }, [editor, note, isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `/api/update-note?id=${params.id}`,
        {
          title: note?.title,
          content: editor?.getHTML(),
        }
      );
      if (!response.data.success) {
        toast({
          title: "Error",
          description:
            "Failed to update your note. Please try again!",
          variant: "destructive",
        });
      }
      if (response.data.success) {
        toast({
          title: "Updated",
          description: "Note updated successfully",
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update your note. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `/api/deletenote/${note?._id}`
      );

      if (!response.data.success) {
        toast({
          title: "Error",
          description:
            "Failed to delete your note. Please try again!",
          variant: "destructive",
        });
      } else if (response.data.success) {
        toast({
          title: "Deleted",
          description: "Your note has been deleted successfully!",
        });
        router.push("/");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete your note. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="sticky top-0 z-10 border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
            <ChevronLeft className="h-5 w-5" />
            <span>Back to Notes</span>
          </Link>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handleSave}
                        variant="default"
                        size="sm">
                        <Save className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Save changes</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        size="sm">
                        <X className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Cancel editing</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            ) : (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handleEdit}
                        variant="outline"
                        size="sm">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit note</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <AlertDialog>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </AlertDialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete note</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will
                        permanently delete your note.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600">
                        Yes, delete note
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 ">
        <React.Suspense fallback={<Noteloader />}>
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="mb-6">
              {isEditing ? (
                <Input
                  type="text"
                  placeholder="Title"
                  value={note?.title || "loading..."}
                  autoFocus={isEditing}
                  onChange={(e) => {
                    const updatedNote = {
                      ...note,
                      title: e.target.value,
                    } as INote;

                    setNote(updatedNote);
                  }}
                  className="text-3xl py-[25px] shadow-md font-bold w-full bg-transparent border-none focus:ring-0  "
                />
              ) : (
                <h1 className="text-3xl font-bold border-b-2 py-2 border-gray-200 ">
                  {note?.title || (
                    <p className="text-xl">Loading text...</p>
                  )}
                </h1>
              )}
            </div>

            {isEditing && (
              <>
                <div className="mb-4 flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      editor?.chain().focus().toggleBold().run()
                    }
                    disabled={
                      !editor
                        ?.can()
                        .chain()
                        .focus()
                        .toggleBold()
                        .run()
                    }
                    className={
                      editor?.isActive("bold")
                        ? "bg-gray-200 dark:bg-gray-700"
                        : ""
                    }>
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      editor?.chain().focus().toggleItalic().run()
                    }
                    disabled={
                      !editor
                        ?.can()
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run()
                    }
                    className={
                      editor?.isActive("italic")
                        ? "bg-gray-200 dark:bg-gray-700"
                        : ""
                    }>
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      editor?.chain().focus().toggleBulletList().run()
                    }
                    disabled={
                      !editor
                        ?.can()
                        .chain()
                        .focus()
                        .toggleBulletList()
                        .run()
                    }
                    className={
                      editor?.isActive("bulletList")
                        ? "bg-gray-200 dark:bg-gray-700"
                        : ""
                    }>
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      editor
                        ?.chain()
                        .focus()
                        .toggleOrderedList()
                        .run()
                    }
                    disabled={
                      !editor
                        ?.can()
                        .chain()
                        .focus()
                        .toggleOrderedList()
                        .run()
                    }
                    className={
                      editor?.isActive("orderedList")
                        ? "bg-gray-200 dark:bg-gray-700"
                        : ""
                    }>
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      editor?.chain().focus().undo().run()
                    }
                    disabled={
                      !editor?.can().chain().focus().undo().run()
                    }>
                    <Undo className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      editor?.chain().focus().redo().run()
                    }
                    disabled={
                      !editor?.can().chain().focus().redo().run()
                    }>
                    <Redo className="h-4 w-4" />
                  </Button>
                  <div className="h-[1px] bg-gray-300 shadow-md my-3"></div>
                </div>
              </>
            )}

            <div className="min-h-64 overflow-y-auto border-b-2">
              <EditorContent
                editor={editor}
                className="prose dark:prose-invert max-w-none focus:outline-none "
              />
            </div>
            <div className="text-sm py-2">
              last Updated:{" "}
              {new Date(note?.updatedAt!).toLocaleString()}
            </div>
          </div>
        </React.Suspense>{" "}
      </main>
    </div>
  );
}
