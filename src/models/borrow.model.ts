import { Document, model, Schema } from "mongoose";
import { IBorrow } from "../interface/borrow.interface";
import { Book } from "./book.model";

// extend with mongoose Document
interface IBorrowDocument extends IBorrow, Document {}

const borrowSchema = new Schema<IBorrowDocument>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Pre-save middleware
borrowSchema.pre("save", async function (next) {
  const borrow = this;
  const book = await Book.findById(borrow.book);

  if (!book) {
    throw new Error("Book not found");
  }

  if (book.copies < borrow.quantity) {
    throw new Error("Not enough copies available to borrow");
  }

  //   bookDoc.copies = bookDoc.copies - borrow.quantity;
  book.copies -= borrow.quantity;
  await book.save();
  //   use static method to update availability
  await Book.updateAvailability(book.id.toString());
  next();
});

export const Borrow = model<IBorrowDocument>("Borrow", borrowSchema);
