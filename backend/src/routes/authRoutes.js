import express from "express"
import { signup, login, logout, refreshAccessToken } from "../controllers/authController.js"
import { verifyJWT } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/refresh-token', refreshAccessToken)
router.post('/logout', verifyJWT, logout)

export default router