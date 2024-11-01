import mongoose, { connection } from "mongoose";

const connectDb = async () => {
  let isConnected;

  if (connection.readyState === 1 || isConnected) {
    console.log("already connected to the database");
    return;
  }
  try {
    const db = await mongoose.connect(
      process.env.MONGODDB_URI as string
    );
    isConnected = db.connections[0].readyState ?? true;
    console.log("DB connected successfully!!");
  } catch (error) {
    console.log("DB connection failed error: ", error);
    process.exit(1);
  }
};

export default connectDb;
