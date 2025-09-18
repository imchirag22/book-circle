import Book from "../model/Books.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import cloudinary from "../config/cloudinary.js";
import Users from "../model/Users.js";

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
            images: imageUrl,
            ratings: rating,
            user: req.user._id
        })
        res.status(201).json(newBook)
        }
    } catch (error) {
        res.status(401).json({message: error.message})
    }
})
const getAllBooks = asyncHandler(async(req,res) => {
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
const deleteBook = asyncHandler(async ( req,res ) => {
   try {
    const book = await Book.findById(req.params.id)
    if (!book) {
        return res.status(401).json({message: "Book not found"})
    }

    //checking if the one deleting is the creator of the post
    if (book.user.toString() !== req.user._id.toString())
        return res.status(401).json({message: "Unauthorized"})

    // deleting image from cloudinary 
    if (book.images && book.images.includes("cloudinary")) {
        try {
          const publicId = book.images.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId)
        } catch (deleteError) {
          console.log("Error deleting image from cloudinary", deleteError);
        }
      }
  
      await book.deleteOne()
      res.status(200).json({message: "Book deleted successfully"})
      
   } catch (error) {
       res.status(500).json({message: "Error deleting book", error: error.message})
   }
})
const userRecommendation = asyncHandler( async (req, res) => {
    try {
      const books = await Book.find({ user: req.user._id }).sort({ createdAt: -1 });
      res.json(books);
    } catch (error) {
      console.error("Get user books error:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  })

export {getBooks , getAllBooks, deleteBook, userRecommendation}