import jwt from "jsonwebtoken";
import { ApiError } from "./api-Error.js";

// Generate access token
const generateAccessToken = (userId) => {
    return jwt.sign(
        {_id: userId},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d'}
    );
};

// Generate refresh token 
const generateRefreshToken = (userId) => {
    return jwt.sign(
        {_id: userId},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d'}
    );

};

// Verify Token
const verifyToken = (token,secret) => {
    try {
        return jwt.verify(token, secret)
    } catch (error) {
        throw new ApiError (401, error?.message || "Invalid Token")
    };
};

export { generateAccessToken, generateRefreshToken, verifyToken };