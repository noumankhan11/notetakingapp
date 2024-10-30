"use client";

import * as React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Undo,
  Redo,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import Placeholder from "@tiptap/extension-placeholder";

export default function NewNotePage({
  params,
}: {
  params: { id: string };
}) {
  const [title, setTitle] = React.useState("");
  const [isSaving, setIsSaving] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something …",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
    immediatelyRender: false,
  });

  const handleSave = async () => {
    if (!title || !editor?.getHTML()) {
      toast({
        title: "Error",
        description:
          "Please provide both a title and content for your note.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      const response = await axios.post("/api/create-note", {
        title,
        content: editor?.getHTML(),
        userId: params.id, // Replace with actual user ID from your auth system
      });

      if (!response?.data.success) {
        return toast({
          title: "Error",
          description: response?.data.message,
          variant: "destructive",
        });
      }

      toast({
        title: "Success",
        description: "Your note has been saved successfully.",
      });

      router.push("/"); // Redirect to the home page or notes list
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save your note. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

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
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Note"}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <Input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-bold py-[25px] mb-4 w-full"
          />
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  editor?.chain().focus().toggleBold().run()
                }
                disabled={
                  !editor?.can().chain().focus().toggleBold().run()
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
                  !editor?.can().chain().focus().toggleItalic().run()
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
                  editor?.chain().focus().toggleOrderedList().run()
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
                onClick={() => editor?.chain().focus().undo().run()}
                disabled={
                  !editor?.can().chain().focus().undo().run()
                }>
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => editor?.chain().focus().redo().run()}
                disabled={
                  !editor?.can().chain().focus().redo().run()
                }>
                <Redo className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <EditorContent
            editor={editor}
            className="min-h-[300px] focus:outline-none"
          />
        </div>
      </main>
    </div>
  );
}
