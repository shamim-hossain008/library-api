import express, { NextFunction, Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { success } from "../utils/apiRes";

export const borrowRouters = express.Router();

// borrow a book
borrowRouters.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const borrow = await Borrow.create(req.body);

      res.status(201).json(success("Book borrowed successfully", borrow));
    } catch (error) {
      next(error);
    }
  }
);

// aggregation  summary
borrowRouters.get(
  "/summary",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const summary = await Borrow.aggregate([
        {
          $group: {
            _id: "$book",
            totalQuantity: { $sum: "$quantity" },
          },
        },

        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "_id",
            as: "bookInfo",
          },
        },
        { $unwind: "$bookInfo" },
        {
          $project: {
            _id: 0,
            book: {
              title: "$bookInfo.title",
              isbn: "$bookInfo.isbn",
              totalQuantity: "$totalQuantity",
            },
          },
        },
      ]);

      res
        .status(201)
        .json(
          success("Borrowed books summary retrieved successfully", summary)
        );
    } catch (error) {
      next(error);
    }
  }
);
