import { Document, Model, model, Schema } from "mongoose";
import { IBook } from "../interface/book.interface";

// Extend with mongoose document
export interface IBookDocument extends IBook, Document {}

interface IBookModel extends Model<IBookDocument> {
  updateAvailability: (bookId: string) => Promise<void>;
}

const bookSchema = new Schema<IBookDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      required: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive number"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Static method to update availability based on copise

bookSchema.statics.updateAvailability = async function (bookId: string) {
  const book = await this.findById(bookId);
  if (book) {
    book.available = book.copies > 0;
    await book.save();
  }
};

export const Book = model<IBookDocument, IBookModel>("Book", bookSchema);
