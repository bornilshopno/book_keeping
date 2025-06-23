import { model } from "mongoose";
import { bookSchema } from "../schemas/books.schemas";
import { Ibooks } from "../interfaces/books.interface";

export const Books=model<Ibooks>("Books", bookSchema)
