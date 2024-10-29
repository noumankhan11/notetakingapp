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
      return Response.json(
        {
          success: false,

          message:
            "Invalid ID format. Please provide a valid MongoDB ID.",
        },
        { status: 400 }
      );
    }
    await Note.findByIdAndDelete(id);
    return Response.json(
      {
        success: true,

        message: "Note deleted successfully!",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,

        message: "Failed to delted a Note!",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
