import { model } from "mongoose";
import { bookSchema } from "../schemas/books.schemas";
import { IBookBorrow, Ibooks } from "../interfaces/books.interface";

export const Books=model<Ibooks,IBookBorrow>("Books", bookSchema)
