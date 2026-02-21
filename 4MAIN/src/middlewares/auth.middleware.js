import { User } from "../models/user.models.js";
import { ApiError } from "../utiles/ApiError.js";
import { asyncHandler } from "../utiles/asyncHandler.js";
import jwt from "jsonwebtoken"



export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const Token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer " , "")
    
        if(!Token){
            new ApiError(401,"Unauthorized Request")
        }
    
        const decodedToken = jwt.verify(Token,process.env.ACCESS_TOKEN_SECRET)
    
        // if(!decodedToken){
        //     new ApiError(401,"Unauthorized Token")
        // }
    
        const user = User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user){
            new ApiError(401,"Invalid Token Access")
        }
        req.user=user;
        next()
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid Access Token")
    }
    
})