// models/Note.ts

import mongoose, { Document, Schema } from "mongoose";

// Define the interface for a note
export interface INote extends Document {
  title: string;
  content: string;
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
