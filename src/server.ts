import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import { connectMongoose } from "./config/mongoose";
import { booksRouters } from "./controllers/book.controller";
import { borrowRouters } from "./controllers/borrow.controller";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

app.use("/api/books", booksRouters);
app.use("/api/borrow", borrowRouters);

app.use(errorHandler);

(async () => {
  await connectMongoose();

  app.listen(port, () => {
    console.log(`🚀 Server is listening on port ${port}`);
  });
})();
