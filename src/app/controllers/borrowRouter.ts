import express from 'express'
import { Borrow } from '../models/borrow.model';

export const borrowRouter = express.Router()

borrowRouter.post("/", async (req, res) => {
    const borrowReq = req.body;
    console.log(borrowReq)
    const result = await Borrow.create(borrowReq)

    res.status(201).send({
        success: true,
        message: "Book borrowed successfully",
        data: result
    })
})

borrowRouter.get("/", async (req, res) => {
    const result = await Borrow.aggregate([
        {
            $group: {
                _id: "$book",
                totalQuantity: { $sum: "$quantity" }
            }
        },
        {
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "_id",
                as: "book"
            }
        },
        {
            $unwind: "$book"
        },
        {
            $project: { book: { title: 1, isbn: 1 }, totalQuantity: 1, _id: 0 }
        }
    ])

    res.status(201).send({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: result
    })
})
