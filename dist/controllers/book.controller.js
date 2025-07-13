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
exports.booksRouters = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
const apiRes_1 = require("../utils/apiRes");
exports.booksRouters = express_1.default.Router();
//  Create Book
exports.booksRouters.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.create(req.body);
        res.status(201).json((0, apiRes_1.success)("Book created successfully", book));
    }
    catch (error) {
        next(error);
    }
}));
// get all books (filter, sort and limit)
exports.booksRouters.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createAt", sort = "asc", limit = "10", } = req.query;
        const query = filter ? { genre: filter } : {};
        const books = yield book_model_1.Book.find(query)
            .sort({ [sortBy]: sort === "asc" ? 1 : 1 })
            .limit(parseInt(limit));
        res.status(201).json((0, apiRes_1.success)("Books retrieved successfully", books));
    }
    catch (error) {
        next(error);
    }
}));
// get single
exports.booksRouters.get("/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findById(req.params.bookId);
        if (!book) {
            throw new Error("Book not found");
        }
        res.status(201).json((0, apiRes_1.success)("Book retrieved successfully", book));
    }
    catch (error) {
        next(error);
    }
}));
// updated books
exports.booksRouters.put("/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findByIdAndUpdate(req.params.bookId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!book) {
            throw new Error("Book not found");
        }
        yield book_model_1.Book.updateAvailability(book.id.toString());
        res.status(201).json((0, apiRes_1.success)("Book updated successfully", book));
    }
    catch (error) {
        next(error);
    }
}));
exports.booksRouters.delete("/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield book_model_1.Book.findByIdAndDelete(bookId);
        res.status(201).json((0, apiRes_1.success)("Book deleted successfully", book));
    }
    catch (error) {
        next(error);
    }
}));
