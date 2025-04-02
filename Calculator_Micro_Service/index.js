import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import numberRoutes from "./routes/numberRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/numbers", numberRoutes);

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port :${process.env.PORT}`)
    })
})
.catch((err)=>[
    console.log("MongoDB connection failed",err)
])