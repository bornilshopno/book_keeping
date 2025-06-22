import app from "../../app";
import express from 'express'
import { Books } from "../models/books.model";


export const booksRouter = express.Router()

booksRouter.post("/", async (req, res) => {
    const newBook = req.body;
    const result = await Books.create(newBook)

    res.status(201).send({
        success: true,
        message: "Book created successfully",
        data: result
    })
})

booksRouter.get("/", async (req, res) => {
    const filter = req.query.filter;
    const filterByGenre = filter ? { genre: filter } : {};
    const sortBy = req.query.sortBy as string;
    const sortRaw = typeof req.query.sort === "string" ? req.query.sort.toLowerCase() : "asc";
    const sort: "asc" | "desc" = sortRaw === "desc" ? "desc" : "asc";
    const sortBySort = (sortBy && sort) ? { [sortBy]: sort.toString() as any} : {};
    const limitQuery = req.query.limit;
    const limit = limitQuery ? parseInt(limitQuery as string) : 100
    const result = await Books.find(filterByGenre).sort(sortBySort).limit(limit)
    res.status(200).send({
        success: true,
        message: "Books retrieved successfully",
        data: result
    })
})

booksRouter.get("/:bookId",async(req, res)=>{
    const bookId=req.params.bookId;
    const result = await Books.find({_id:bookId})
    res.status(200).send({
         success: true,
        message: "Books retrieved successfully",
        data: result
    })
})

booksRouter.put("/:bookId",async(req, res)=>{
    const bookId=req.params.bookId;
    const updatedBookDetails=req.body;
    const result = await Books.findOneAndUpdate({_id:bookId},updatedBookDetails,{new:true})
    res.status(200).send({
         success: true,
        message: "Book updated successfully",
        data: result
    })
})

booksRouter.delete("/:bookId",async(req, res)=>{
    const bookId=req.params.bookId;   
    const result = await Books.findOneAndDelete({_id:bookId})
    console.log(result)
    res.status(200).send({
        success: true,
        message: "Book deleted successfully",
        data: null
    })
})