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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowSchema = void 0;
const mongoose_1 = require("mongoose");
const books_model_1 = require("../models/books.model");
exports.BorrowSchema = new mongoose_1.Schema({
    book: { type: mongoose_1.Schema.Types.ObjectId, ref: "Books", required: true },
    quantity: { type: Number, required: true },
    dueDate: {
        type: Date, required: true,
        validate: {
            validator: function (value) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return value >= today;
            },
            message: "Date must be of Today or a Future date"
        }
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.BorrowSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("from PRE", this.book, this.quantity);
        const isProceedable = yield books_model_1.Books.isBorrowAble(this.book, this.quantity);
        console.log(this.book, this.quantity);
        if (!isProceedable) {
            const error = new Error("Insufficient Books to Borrow");
            return next(error);
        }
        next();
    });
});
exports.BorrowSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const requestedBook = yield books_model_1.Books.findById(doc.book);
        const existingCopies = (_a = requestedBook === null || requestedBook === void 0 ? void 0 : requestedBook.copies) !== null && _a !== void 0 ? _a : 1;
        const requested = doc.quantity;
        const updatedCopies = existingCopies - requested;
        console.log(doc, "from post save", "updatedCopies", updatedCopies, "requested", requested, "existingCopies", existingCopies);
        if (updatedCopies === 0) {
            yield books_model_1.Books.findByIdAndUpdate(doc.book, {
                copies: updatedCopies,
                available: false,
            });
        }
        else {
            yield books_model_1.Books.findByIdAndUpdate(doc.book, {
                copies: updatedCopies,
            });
        }
        next();
    });
});
