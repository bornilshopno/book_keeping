"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
const mongoose_1 = require("mongoose");
const books_schemas_1 = require("../schemas/books.schemas");
exports.Books = (0, mongoose_1.model)("Books", books_schemas_1.bookSchema);
