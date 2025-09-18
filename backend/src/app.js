import express from "express"
import {config} from "dotenv"
import { connectDB } from "./config/db.js"
import authRoutes from './routes/authRoutes.js'
import booksRoutes from './routes/booksRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'  
import job from "./config/cron.js"

config()

job.start()
const app = express()
const PORT = process.env.PORT || 3000

// CORS configuration for mobile apps
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",  // Allow your frontend domain
  credentials: true,  // Allow cookies and auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json({ limit: '10mb' }))  // Increase limit for image uploads
app.use(cookieParser())

app.use('/auth', authRoutes)
app.use('/books', booksRoutes)


connectDB()
    .then( () => {
        console.log("Database connection established...")
        app.listen(PORT, ()=>{
            console.log(`server is running at ${PORT}`)
        })
    })
    .catch((err) => {
        console.error("Database cannot be connected!!")
        process.exit(1)
    }) 



