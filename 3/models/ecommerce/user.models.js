import mongoose from "mongoose"

const UserSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required,
    },
    password:{
        type:String,
        required,
    },
    
},{timestamps:true})

export const User = mongoose.model("User", UserSchema)