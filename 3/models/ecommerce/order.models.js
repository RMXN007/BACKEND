import mongoose from 'mongoose';
import { Product } from './product.models';

const orderItemSchema=mongoose.Schema({
    Product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    qauntity:{
        type:Number,
        required,
    }
})

const orderSchema=mongoose.Schema({
    orderPrice:{
        type:Number,
        required:true,
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    orderItem:{
        type:[orderItemSchema]
    },
    address:{
        type:String,
        required,
    },
    status:{
        type:String,
        enum:["PENDING","CANCELLED","DELIVERED"],
        default:"PENDING",
    }
},{timestamps:true})

export const Order=mongoose.model("Order",orderSchema);