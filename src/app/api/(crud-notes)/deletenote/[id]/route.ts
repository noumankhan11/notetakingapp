import connectDb from "@/lib/connectDb";
import Note from "@/models/note.model";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
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
    await Note.findByIdAndDelete(id);
    return Response.json({
      success: true,
      status: 200,
      message: "Note deleted successfully!",
    });
  } catch (error: any) {
    return Response.json({
      success: false,
      status: 500,
      message: "Failed to delted a Note!",
      error: error.message,
    });
  }
}
