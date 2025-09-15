import Book from "../model/Books";
import { ApiError } from "../utils/api-Error";
import { ApiResponse } from "../utils/api-Response";
import { asyncHandler } from "../utils/asyncHandler";
import cloudinary from "../config/cloudinary";

const getBooks = asyncHandler(async (req,res) => {
    const {title,captions,rating,image} = req.body
    try {
        if (!image || !title || !captions || !rating){
            return res.status(400).json({message: "Please provide all fields"})

        // uploading image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image);
        const imageUrl = uploadResponse.secure_url

        // save to db
        const newBook = await Book.create({
            title,
            captions,
            image: imageUrl,
            rating,
            user: req.user._id
        })
        res.status(201).json(newBook)
        }
    } catch (error) {
        res.status(401).json({message: error.message})
    }
})

export default getBooks