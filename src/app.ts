import express, { Application, Request, Response } from 'express'
import { booksRouter } from './app/controllers/booksRouter'
import { borrowRouter } from './app/controllers/borrowRouter'

const app: Application = express()
app.use(express.json())


app.use("/api/books", booksRouter)
app.use("/api/borrow", borrowRouter)

app.get("/", (req:Request, res:Response)=>{
    res.send("WELCOME THE BOOKS SERVER")
})

export default app;