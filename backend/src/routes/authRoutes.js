import express from "express"
import { signup, login, logout, refreshAccessToken, getUser } from "../controllers/authController.js"
import { verifyJWT } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/refresh-token', refreshAccessToken)
router.post('/logout', verifyJWT, logout)

// Replace the single problematic route with two explicit routes
router.get('/user/:id', getUser)
router.get('/user', getUser)

export default router