import express from "express"
import { signup, login } from "../controllers/authController.js"

const router = express.Router()

router.post('/SignUp', signup)

router.post('/Login', login)

export default router