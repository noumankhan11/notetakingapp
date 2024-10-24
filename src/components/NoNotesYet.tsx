import React from "react";
import { Card, CardContent } from "./ui/card";
import { FileText, Plus } from "lucide-react";
import { Button } from "./ui/button";

export default function NoNotesYet() {
  return (
    <div className="min-h-[calc(100vh-110px)] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-8">
        <Card className="mt-8 max-w-md mx-auto">
          <CardContent className="pt-6 pb-8 px-6 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
              No notes yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create your first note to get started with NoteNest.
            </p>
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Create Your First Note
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
