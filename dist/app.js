"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const booksRouter_1 = require("./app/controllers/booksRouter");
const borrowRouter_1 = require("./app/controllers/borrowRouter");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const corsOptions = {
    origin: ['https://readers-heaven.netlify.app', 'http://localhost:5173',],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use("/api/books", booksRouter_1.booksRouter);
app.use("/api/borrow", borrowRouter_1.borrowRouter);
app.get("/", (req, res) => {
    res.send("WELCOME THE BOOKS SERVER");
});
exports.default = app;
