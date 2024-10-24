// models/Note.ts

import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./user.model";

// Define the interface for a note
export interface INote extends Document {
  title: string;
  content: string;
  user: IUser["_id"];
}

// Create a schema for the Note model
const NoteSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

// Create the Note model
const Note =
  (mongoose.models.Note as mongoose.Model<INote>) ||
  mongoose.model<INote>("Note", NoteSchema);

export default Note;
