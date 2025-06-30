"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booksRouter_1 = require("./app/controllers/booksRouter");
const borrowRouter_1 = require("./app/controllers/borrowRouter");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/books", booksRouter_1.booksRouter);
app.use("/api/borrow", borrowRouter_1.borrowRouter);
app.get("/", (req, res) => {
    res.send("WELCOME THE BOOKS SERVER");
});
exports.default = app;
