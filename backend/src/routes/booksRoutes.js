import express from "express";
import  {  getBooks , getAllBooks, deleteBook, userRecommendation } from "../controllers/bookController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/',verifyJWT, getBooks)
router.get('/',verifyJWT, getAllBooks)
router.delete('/:id',verifyJWT, deleteBook)
router.get("/user", verifyJWT, userRecommendation);

export default router