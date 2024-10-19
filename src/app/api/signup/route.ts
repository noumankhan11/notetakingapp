import connectDb from "@/lib/connectDb";
import User from "@/models/user.model";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const { username, email, password } = await request.json();
  // console.log(await request.json());
  if (!username || !email || !password) {
    return Response.json({
      success: false,
      status: 400,
      message: "Please provide all the fields",
    });
  }
  try {
    await connectDb();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({
        success: false,
        status: 400,
        message: "Email is already taken",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return Response.json({
      success: true,
      status: 201,
      message: "User registerd successfully!",
      data: { username: newUser.username, email: newUser.email },
    });
  } catch (error: any) {
    console.log("Error registering user: ", error);
    return Response.json({
      success: false,
      status: 500,
      message:
        "Internel server error while registering a user! error: ",
      error,
    });
  }
}
