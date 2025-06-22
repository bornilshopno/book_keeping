import dotenv from "dotenv"
dotenv.config()
import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

const port = 3000

let server: Server;

const main = async () => {
    try {
        //connection to mongodb by mongoose
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pqwog.mongodb.net/BookAPP?retryWrites=true&w=majority&appName=Cluster0`);
        
        console.log("connected to mongo db")
        
        server = app.listen(port, () => {
            console.log(`server is running at port ${port}`)
        }        
    
    )

    } catch (error) {
        console.log(error)
    }
}

main()