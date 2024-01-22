import mongoose from "mongoose";

const {Schema} = mongoose


const productSchema = new Schema({
    image: String,
    name: String,
    desc: String,
    price: Number
})

export const tastySchema = mongoose.model("mahir", productSchema)