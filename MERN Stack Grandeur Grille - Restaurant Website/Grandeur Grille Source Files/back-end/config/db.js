import mongoose from "mongoose"

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://moizimran:shopping12@cluster0.kkzorgj.mongodb.net/RestaurantWebsite').then(()=>console.log("DB Connected"));
}