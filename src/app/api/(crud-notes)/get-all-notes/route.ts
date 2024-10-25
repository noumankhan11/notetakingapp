import connectDb from "@/lib/connectDb";
import Note from "@/models/note.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id") as string;
  const isValidId = mongoose.Types.ObjectId.isValid(id);

  if (!isValidId) {
    return Response.json(
      {
        success: false,
        message:
          "Invalid query parameters id, id is not a valid monogodb id ",
      },
      { status: 400 }
    );
  }
  try {
    await connectDb();
    const notes = await Note.find({ user: id });
    return Response.json(
      {
        success: true,

        message: "fetched all notes from the DB!",
        data: notes,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return Response.json(
      {
        success: false,

        message:
          "internal server error while fetching all the notes from the db",
        error,
      },
      { status: 500 }
    );
  }
}
