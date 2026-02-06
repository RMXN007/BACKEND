import { asyncHandler } from "../utiles/asyncHandler.js"
import { ApiError } from "../utiles/ApiError.js"
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utiles/Cloudinary.js"
import { ApiResponse } from "../utiles/ApiResponse.js"

const userRegister = asyncHandler(async (req, res) => {
    //get user data from frontend
    //Validate condition for data that its not empty
    //check if user already exist
    //check whether unique fields are already available
    //check for avatar and coverImage
    //upload them to cloudinary
    //create user object - create entry in db
    //remove password and refresh token
    //check for user creation 
    //return res

    const{fullName,username,email,password}=req.body
    console.log("email :",email)

    if(
        [fullName,username,email,password].some((field)=>(field.trim()===""))
    ){
        throw new ApiError(400,"All fields are required!")
    }

    const existedUser= await User.findOne({
        $or : [{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User with email or username already exist")
    }

    console.log(req.files);
    console.log(req.body);

    const avatarLocalpath =req.files?.avatar[0]?.path
    const coverImageLocalpath =req.files?.coverImage[0]?.path

    if(!avatarLocalpath){
        throw new ApiError(400,"avatar file is required")
    }
    
    const avatar= await uploadOnCloudinary(avatarLocalpath)
    const coverImage= await uploadOnCloudinary(coverImageLocalpathLocalpath)
    
    if(!avatar){
        throw new ApiError(400,"avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase(),
    })

    const createdUser = await user.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500,"User creation failed")
    }
    return res.status(201).json(
        new ApiResponse(201,createdUser,"User created successfully")
    )
})

export { userRegister } 