import cors from "cors";

import express, { Application } from "express";
import { connectMongoose } from "./config/mongoose";
import { booksRouters } from "./controllers/book.controller";
import { borrowRouters } from "./controllers/borrow.controller";
import { errorHandler } from "./middlewares/errorHandler";
import config from "./config";



const app: Application = express();


app.use(cors());
app.use(express.json());

app.use("/api/books", booksRouters);
app.use("/api/borrow", borrowRouters);

app.use(errorHandler);

(async () => {
  await connectMongoose();

  app.listen(config.port, () => {
    console.log(`🚀 Server is listening on port ${config.port}`);
  });
})();
