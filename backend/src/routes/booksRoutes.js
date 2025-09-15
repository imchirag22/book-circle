import express from "express";
import getBooks from "../controllers/bookController";
import { verifyJWT } from "../middleware/authMiddleware";

const router = express.Router()

router.post('/',verifyJWT, getBooks)

export default router