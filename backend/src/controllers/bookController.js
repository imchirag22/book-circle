import Book from "../model/Books";

import { asyncHandler } from "../utils/asyncHandler";
import cloudinary from "../config/cloudinary";
import Users from "../model/Users";

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
const getAllBooks = asyncHandler(async(req,res)=> {
    try {
        const page = req.query.page || 1
        const limit = req.query.limit || 5
        const skip = (page - 1) * limit

        const books = await Users.find().sort({ createdAt: -1 })
         // -1 for latest post at top
         .skip(skip)
         .limit(limit)
         .populate('user', 'userName profilePicture ')

         const totalBooks = await Book.countDocuments()
         
        res.json({
            books,
            currentPage: page,
            totalBooks,
            totalPage: Math.ceil(totalBooks/limit)
        }) 
    } catch (error) {
        res.status(500).json({message: "error loading the books", error})
    }
})

export {getBooks , getAllBooks}