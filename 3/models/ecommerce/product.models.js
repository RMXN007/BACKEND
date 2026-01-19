import mongoose, { mongo } from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required,
    },
    description: {
        type: String,
        required,
    },
    productImage: {
        type: String,
        required,
    },
    price: {
        type: Number,
        required,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required,
    },
    stoke:{
        type:Number,
        default:0,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }

}, { timestamps: true })

export const Product = mongoose.model("Product", productSchema);