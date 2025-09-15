import express from "express";
import  {  getBooks , getAllBooks } from "../controllers/bookController";
import { verifyJWT } from "../middleware/authMiddleware";

const router = express.Router()

router.post('/',verifyJWT, getBooks)
router.get('/',verifyJWT, getAllBooks)

export default router