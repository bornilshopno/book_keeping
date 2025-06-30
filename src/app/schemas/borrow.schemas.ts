import { Schema, } from "mongoose";
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
    console.log("from PRE",this.book, this.quantity)
    const isProceedable = await Books.isBorrowAble(this.book, this.quantity);
    console.log(this.book, this.quantity)
    if (!isProceedable) {
        const error = new Error("Insufficient Books to Borrow");
        return next(error);
    }
    next();
})

BorrowSchema.post("save", async function (doc, next) {
    const requestedBook = await Books.findById(doc.book);
    const existingCopies = requestedBook?.copies ?? 1
    const requested = doc.quantity;
    const updatedCopies = existingCopies - requested
    console.log(doc, "from post save", "updatedCopies", updatedCopies, "requested", requested, "existingCopies", existingCopies);
   if (updatedCopies === 0) {
  await Books.findByIdAndUpdate(doc.book, {
    copies: updatedCopies,
    available: false,
  });
} else {
  await Books.findByIdAndUpdate(doc.book, {
    copies: updatedCopies,
  });
}

    next()
})