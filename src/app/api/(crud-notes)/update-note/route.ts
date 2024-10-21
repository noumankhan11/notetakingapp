import connectDb from "@/lib/connectDb";
import Note from "@/models/note.model";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id") as string;
  const { title, content } = await request.json();

  try {
    await connectDb();
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      return Response.json({
        success: false,
        status: 400,
        message:
          "Invalid ID format. Please provide a valid MongoDB ID.",
      });
    }

    const updatedNote = await Note.findOneAndUpdate(
      { _id: id },
      {
        title,
        content,
      },
      { new: true, revalidators: true }
    );
    return Response.json({
      success: true,
      status: 200,
      message: "Note updated successfully!",
      updatedNote,
    });
  } catch (error: any) {
    return Response.json({
      success: false,
      status: 500,
      message: "Failed to update note",
      error: error.message,
    });
  }
}
