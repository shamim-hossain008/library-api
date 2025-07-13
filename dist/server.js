"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("./config/mongoose");
const book_controller_1 = require("./controllers/book.controller");
const borrow_controller_1 = require("./controllers/borrow.controller");
const errorHandler_1 = require("./middlewares/errorHandler");
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/books", book_controller_1.booksRouters);
app.use("/api/borrow", borrow_controller_1.borrowRouters);
app.use(errorHandler_1.errorHandler);
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoose_1.connectMongoose)();
    app.listen(config_1.default.port, () => {
        console.log(`🚀 Server is listening on port ${config_1.default.port}`);
    });
}))();
