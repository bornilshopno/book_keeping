import { model } from "mongoose";
import { BorrowSchema } from "../schemas/borrow.schemas";


export const Borrow=model("Borrow", BorrowSchema)