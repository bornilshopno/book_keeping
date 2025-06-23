import express from 'express'
import { Borrow } from '../models/borrow.model';
import mongoose from 'mongoose';

export const borrowRouter = express.Router()

borrowRouter.post("/", async (req, res) => {
    const borrowReq = req.body;
    try {
        const result = await Borrow.create(borrowReq)

        res.status(201).send({
            success: true,
            message: "Book borrowed successfully",
            data: result
        })
    } 
    catch (error) {

 if (error instanceof mongoose.Error.ValidationError) {
      // Send full mongoose validation error structure
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: {
          name: error.name,
          errors: error.errors,
        },
      });
    }


    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
}}
)

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
