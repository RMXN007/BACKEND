// require('dotenv').config({path:'./.env'})
console.log("ENV:", process.env.MONGODB_URI);

import dotenv from 'dotenv';
import connectDB from "./db/index.js"

dotenv.config()




connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})






/*
import mongoose from 'mongoose';
import { DB_NAME } from './constant.js';


import express from "express"
const app = express()
( async() => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERROR",error);
            throw error;
            
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening at port ${process.env.PORT}`);
            
        })

    }catch(error){
        console.error("ERROR",error);
        throw error;
    }
} )()
*/
