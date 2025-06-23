import { Schema, Types } from "mongoose";
import { Iborrow } from "../interfaces/borrow.interface";
import { Books } from "../models/books.model";


export const BorrowSchema = new Schema<Iborrow>({
    book: { type: Schema.Types.ObjectId, ref: "Books", required: true },
    quantity: { type: Number, required: true },
    dueDate: {
        type: Date, required: true,
        validate: {
            validator: function (value: Date) {
                const today = new Date();
                today.setHours(0, 0, 0, 0)
                return value >= today
            },
            message: "Date must be of Today or a Future date"
        }
    }
}, {
    versionKey: false,
    timestamps: true
})

BorrowSchema.pre("save", async function (next) {
    const isBorrowable = await Books.isBorrowable(this.book, this.quantity);
    if (!isBorrowable) {
        const error = new Error("Insufficient Books to Borrow");
        error.name = "BorrowValidationError";
        return next(error);
    }
    next();

    //     const requestedCopy = this.quantity;
    //     const id = this.book;
    //     const result = await Books.findById(id);
    // console.log("from PRE")
    //     const isBorrowAble = requestedCopy <= (result?.copies ?? 0);
    //     if (!isBorrowAble) {
    //         const error = new Error("Insufficient Books to Borrow");
    //         error.name = "BorrowValidationError"; // custom error type
    //         return next(error);
    //     }
    //     next()


})

BorrowSchema.post("save", async function (doc, next) {
    const requestedBook = await Books.findById(doc.book);
    const existingCopies = requestedBook?.copies ?? 1
    const requested = doc.quantity;
    const updatedCopies = existingCopies - requested
    console.log(doc, "from post save", "updatedCopies", updatedCopies, "requested", requested, "existingCopies", existingCopies);
    (updatedCopies === 0) ?
        await Books.findByIdAndUpdate(doc.book, { copies: updatedCopies, available: false }) : await Books.findByIdAndUpdate(doc.book, { copies: updatedCopies })

    next()
})