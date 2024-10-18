import mongoose, { Document, Model } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  userId: mongoose.Types.ObjectId; // Reference to User
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new mongoose.Schema<INote>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Reference to the User model
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
  }
);

const Note: Model<INote> = mongoose.model<INote>("Note", noteSchema);

export default Note;
