import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { booksRouter } from './app/controllers/booksRouter'
import { borrowRouter } from './app/controllers/borrowRouter'

const app: Application = express()
app.use(express.json())

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


// app.use("/api/books", booksRouter)
// app.use("/api/borrow", borrowRouter)

app.get("/", (req:Request, res:Response)=>{
    res.send("WELCOME THE BOOKS SERVER")
})

export default app;