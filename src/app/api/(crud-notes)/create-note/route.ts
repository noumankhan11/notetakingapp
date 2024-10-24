import connectDb from "@/lib/connectDb";
import Note from "@/models/note.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { title, content, userId } = await request.json();
  if (!title || !content || !userId) {
    return Response.json({
      success: false,
      status: 400,
      message: "Please provide all the required data",
    });
  }
  try {
    await connectDb();
    const isValidId = mongoose.Types.ObjectId.isValid(userId);

    if (!isValidId) {
      return Response.json({
        success: false,
        status: 400,
        message:
          "Invalid ID format. Please provide a valid MongoDB ID.",
      });
    }

    const newNote = await Note.create({
      title,
      content,
      user: userId,
    });
    return Response.json({
      success: true,
      status: 201,
      message: "Note created successfully!",
      data: newNote,
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      success: false,
      status: 500,
      message:
        "Internel server error while registering a user! error: ",
      error,
    });
  }
}
