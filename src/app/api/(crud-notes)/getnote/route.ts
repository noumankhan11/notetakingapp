import connectDb from "@/lib/connectDb";
import Note from "@/models/note.model";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id") as string;
  console.log(id);

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
    const note = await Note.findById(id);
    return Response.json(
      {
        success: true,
        message: "note retrieve successfully",
        note,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json({
      success: false,
      status: 500,
      message: "Failed to delted a Note!",
      error: error.message,
    });
  }
}
