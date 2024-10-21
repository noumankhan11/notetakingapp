import connectDb from "@/lib/connectDb";
import Note from "@/models/note.model";

export async function POST(request: Request) {
  const { title, content } = await request.json();
  if (!title || !content) {
    return Response.json({
      success: false,
      status: 400,
      message: "Please provide some content",
    });
  }
  try {
    await connectDb();
    const newNote = await Note.create({
      title,
      content,
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
