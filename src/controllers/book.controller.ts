import express, { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.model";
import { success } from "../utils/apiRes";

export const booksRouters = express.Router();

//  Create Book
booksRouters.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await Book.create(req.body);
      res.status(201).json(success("Book created successfully", book));
    } catch (error) {
      next(error);
    }
  }
);
// get all books (filter, sort and limit)

booksRouters.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        filter,
        sortBy = "createAt",
        sort = "asc",
        limit = "10",
      } = req.query;

      const query = filter ? { genre: filter } : {};

      const books = await Book.find(query)
        .sort({ [sortBy as string]: sort === "asc" ? 1 : 1 })
        .limit(parseInt(limit as string));

      res.status(201).json(success("Books retrieved successfully", books));
    } catch (error) {
      next(error);
    }
  }
);

// get single
booksRouters.get(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await Book.findById(req.params.bookId);
      if (!book) {
        throw new Error("Book not found");
      }

      res.status(201).json(success("Book retrieved successfully", book));
    } catch (error) {
      next(error);
    }
  }
);

// updated books
booksRouters.put(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!book) {
        throw new Error("Book not found");
      }
      await Book.updateAvailability(book.id.toString());

      res.status(201).json(success("Book updated successfully", book));
    } catch (error) {
      next(error);
    }
  }
);

booksRouters.delete(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId = req.params.bookId;
      const book = await Book.findByIdAndDelete(bookId);

      res.status(201).json(success("Book deleted successfully", book));
    } catch (error) {
      next(error);
    }
  }
);
