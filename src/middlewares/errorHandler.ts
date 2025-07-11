import { NextFunction, Request, Response } from "express";
import { error } from "../utils/apiRes";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(400).json(error(err.message || "Something went wrong", err));
};
