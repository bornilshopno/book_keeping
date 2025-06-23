import { Schema } from "mongoose";
import { Ibooks } from "../interfaces/books.interface";


export const bookSchema = new Schema<Ibooks>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
        type: String, required: true,
        enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: [0, "Copies must be a positive number"] },
    available: { type: Boolean, required: true, default: true },
    
}, {
    versionKey: false,
    timestamps: true
})

// ook Model Fields & Validation
// title (string) — Mandatory. The book’s title.
// author (string) — Mandatory. The book’s author.
// genre (string) — Mandatory. Must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY.
// isbn (string) — Mandatory and unique. The book’s International Standard Book Number.
// description (string) — Optional. A brief summary or description of the book.
// copies (number) — Mandatory. Non-negative integer representing total copies available.
// available (boolean) — Defaults to true. Indicates if the book is currently available for borrowing.

bookSchema.static("isBorrowAble", async function (bookId, quantity) {
    const book = await this.findById(bookId);
    if (!book) return false;
    return quantity <= (book.copies ?? 0);
})