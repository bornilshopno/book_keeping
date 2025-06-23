import { Schema } from "mongoose";
import { Iborrow } from "../interfaces/borrow.interface";


export const BorrowSchema = new Schema<Iborrow>({
    book: {type:Schema.Types.ObjectId, ref: "Books" , required:true},
    quantity: {type: Number, required:true },
    dueDate: {type: Date, required:true,
        validate:{
            validator: function(value:Date){
                const today= new Date();
                today.setHours(0,0,0,0)
                return value >=today
            },
            message: "Date must be of Today or a Future date"
        }
     }
},{
    versionKey:false,
    timestamps:true
})

// Borrow Model Fields & Validation
// book (objectId) — Mandatory. References the borrowed book’s ID.
// quantity (number) — Mandatory. Positive integer representing the number of copies borrowed.
// dueDate (date) — Mandatory. The date by which the book must be returned.