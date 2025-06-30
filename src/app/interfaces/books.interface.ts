import { Model, Types } from "mongoose";

export interface Ibooks {
    title: string,
    author: string,
    genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY",
    isbn: string,
    description?: string;
    copies: number,
    available: boolean;
}

// Interface for the static methods on the model
export interface IBookBorrow extends Model<Ibooks> {
  isBorrowAble(bookId: Types.ObjectId | string, quantity: number): Promise<boolean>;
}

