import { Schema, Types } from "mongoose";
import { IBookBorrow, Ibooks } from "../interfaces/books.interface";


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


bookSchema.static("isBorrowAble", async function ( bookId: Types.ObjectId | string,quantity: number):Promise<boolean> {
    console.log("from Static")
    const book = await this.findById(bookId);
    console.log("book static", book)
    if (!book) return false;
    return quantity <= (book.copies ?? 0);
})