import mongoose, { Schema } from "mongoose";

const bookSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true
    },
    captions: {
        type: String,
        required: true
    },
    images: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        minLength: 1,
        maxLength: 5
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

const Book = mongoose.model('Book', bookSchema);
export default Book;