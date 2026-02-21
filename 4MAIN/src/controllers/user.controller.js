import { asyncHandler } from "../utiles/asyncHandler.js"
import { ApiError } from "../utiles/ApiError.js"
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utiles/Cloudinary.js"
import { ApiResponse } from "../utiles/Api Response.js"
import { upload } from "../middlewares/multer.middleware.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken = asyncHandler(async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch {
        throw new ApiError(500, "Something went wrong while generating access and refresh token")
    }
})

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

    const { fullName, username, email, password } = req.body
    console.log("email :", email)

    if (
        [fullName, username, email, password].some((field) => (!field || field.trim() === ""))
    ) {
        throw new ApiError(400, "All fields are required!")
    }


    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exist")
    }


    console.log(req.files);
    // console.log(req.body);

    const avatarLocalpath = req.files?.avatar[0]?.path
    // const coverImageLocalpath = req.files?.coverImage[0]?.path

    let coverImageLocalpath = null
    if (req.files && req.files?.coverImage && req.files.coverImage.length > 0) {
        coverImageLocalpath = req.files.coverImage[0].path
    }

    if (!avatarLocalpath) {
        throw new ApiError(400, "avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalpath)
    const coverImage = await uploadOnCloudinary(coverImageLocalpath)
    

    if (!avatar?.url) {
        throw new ApiError(500, "Avatar upload failed")
    }

    const user = await User.create({
        fullName,
        avatar: avatar?.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "User creation failed")
    }
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User created successfully")
    )
})

const loginUser = asyncHandler(async (req, res) => {
    //get data from frontend by req body
    //validate username and password
    //check user existance by username
    //compare password
    //generate access token and refresh token
    //save refresh token in db
    //send cookie with refresh token and access token in response
    //return response with access token and user details except password and refresh token

    const { username, email, password } = req.body


    //if(!(username || email)){}
    if (!username && !email) {
        throw new ApiError(400, "Username or email are required")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findOne(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged in successfully"
            )
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .clearcookie("accessToken",options)
    .clearcookie("refreshToken",options)
    .json(
        new ApiResponse(200,{},"User Logged out")
    )
})

const refreshAccessToken = asyncHandler(async(req,res)=> {
    const IncomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken

    if(!IncomingRefreshToken){
        throw new ApiError(401,"Unauthorized Request")
    }

    try {
        const decodedToken = await jwt.verify(IncomingRefreshToken,process.env.REFREESH_TOKEN_SECRET)

        const user = User.findById(decodedToken?._id)

        if(!user){
            throw new ApiError(401,"Invalid refreshToken")
        }

        if(IncomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401,"Refresh token is expired or used")
        }

        const { accessToken,newRefreshToken }=await generateAccessAndRefreshToken(user?._id)

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",newRefreshToken ,options)


    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

export { userRegister, loginUser, logoutUser ,refreshAccessToken } 