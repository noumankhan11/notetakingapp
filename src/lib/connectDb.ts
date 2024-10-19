import mongoose, { connection } from "mongoose";

const connectDb = async () => {
  let isConnected;
  connection.readyState === 2 ?? console.log("DB connecting...");
  // if (isConnected) {
  if (connection.readyState === 1) {
    console.log("already connected to the database");
    return;
  }
  try {
    const db = await mongoose.connect(
      "mongodb://127.0.0.1:27017/notetakingapp"
    );
    isConnected = db.connections[0].readyState ?? true;
    console.log("DB connected successfully!!");
  } catch (error: any) {
    console.log("DB connection failed error: ", error);
    process.exit(1);
  }
};

export default connectDb;
