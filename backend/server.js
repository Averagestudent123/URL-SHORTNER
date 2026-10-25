import express from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();


const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"]
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000,()=>{
        console.log(`Server running on http://localhost:${process.env.PORT}`)
    })
})
.catch((err) => {
    console.error("Error connecting to MongoDB:",err);
})