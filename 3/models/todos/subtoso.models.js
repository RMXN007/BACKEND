import mongoose, { mongo } from "mongoose";

const SubTodoSchema=mongoose.Schema(
{
    content:{
        type:String,
        requiered:true,
    },
    complete:{
        type:Boolean,
        default:false,
    },
    CreatedBy:{
        type:mongoose.Schema.Types,ObjectId,
        ref:"User",
    }
},{timestamps:true})

export const SubTodo=mongoose.model("SubTodo",SubTodoSchema)