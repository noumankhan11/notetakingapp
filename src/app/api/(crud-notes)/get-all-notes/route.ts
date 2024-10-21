import connectDb from "@/lib/connectDb";
import Note from "@/models/note.model";

export async function GET(request: Request) {
  try {
    await connectDb();
    const notes = await Note.find();
    return Response.json({
      success: true,
      status: 200,
      message: "fetched all notes from the DB!",
      data: notes,
    });
  } catch (error: any) {
    console.error(error);
    return Response.json({
      success: false,
      status: 500,
      message:
        "internal server error while fetching all the notes from the db",
      error,
    });
  }
}
