import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minLength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true })

export default mongoose.model("Users", UserSchema)