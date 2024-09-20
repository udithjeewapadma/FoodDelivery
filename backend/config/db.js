import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://udithjswanasingha:11223344@cluster0.yi74e.mongodb.net/food-del')
    .then(()=>console.log("DB connected"))
}