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
exports.booksRouter = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
const mongoose_1 = __importDefault(require("mongoose"));
exports.booksRouter = express_1.default.Router();
exports.booksRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = req.body;
    try {
        const result = yield books_model_1.Books.create(newBook);
        res.status(201).send({
            success: true,
            message: "Book created successfully",
            data: result
        });
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError)
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                error: {
                    name: error.name,
                    errors: error.errors,
                },
            });
    }
    res.status(500).json({
        success: false,
        message: "Something went wrong",
    });
}));
exports.booksRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = req.query.filter;
    const filterByGenre = filter ? { genre: filter } : {};
    const sortBy = req.query.sortBy;
    const sortRaw = typeof req.query.sort === "string" ? req.query.sort.toLowerCase() : "asc";
    const sort = sortRaw === "desc" ? "desc" : "asc";
    const sortBySort = (sortBy && sort) ? { [sortBy]: sort.toString() } : {};
    const limitQuery = req.query.limit;
    const limit = limitQuery ? parseInt(limitQuery) : 100;
    const result = yield books_model_1.Books.find(filterByGenre).sort(sortBySort).limit(limit);
    res.status(200).send({
        success: true,
        message: "Books retrieved successfully",
        data: result
    });
}));
exports.booksRouter.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const result = yield books_model_1.Books.find({ _id: bookId });
    res.status(200).send({
        success: true,
        message: "Books retrieved successfully",
        data: result
    });
}));
exports.booksRouter.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const updatedBookDetails = req.body;
    const result = yield books_model_1.Books.findOneAndUpdate({ _id: bookId }, updatedBookDetails, { new: true });
    res.status(200).send({
        success: true,
        message: "Book updated successfully",
        data: result
    });
}));
exports.booksRouter.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const result = yield books_model_1.Books.findOneAndDelete({ _id: bookId });
    console.log(result);
    res.status(200).send({
        success: true,
        message: "Book deleted successfully",
        data: null
    });
}));
