import express from "express";
import cors from "cors";
import dotenv from "dotenv"; 
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config({ path: './config.env' });

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

console.log("Loaded Stripe Key:", process.env.STRIPE_SECRET_KEY); 

connectDB();

app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
