import express from "express";
import { connectMongoose } from "./config/mongoose";
import { booksRouters } from "./controllers/book.controller";
import { borrowRouters } from "./controllers/borrow.controller";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());

app.use("/api/books", booksRouters);
app.use("/api/borrow", borrowRouters);

app.use(errorHandler);

(async () => {
  await connectMongoose();
  const PORT = 5050;
  app.listen(PORT, () => console.log("🚀 Server on http://localhost:5050"));
})();
