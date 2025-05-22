import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config.js'

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json()) // handles all the request from the front end side and passes it to the backend
app.use(cors()) // we can access the backend from any front end


// db connection
connectDB();

// api endpoints

app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)



app.get("/", (req, res)=>{
    res.send("API Working")
})

app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`);
})

