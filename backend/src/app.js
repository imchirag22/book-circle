import express from "express"
import {config} from "dotenv"
import { connectDB } from "./lib/db.js"
import authRoutes from './routes/authRoutes.js'

config()

const app = express()
const PORT = process.env.PORT || 3000

app.use('/api/auth', authRoutes)


connectDB()
    .then( () => {
        console.log("Database connection established...")
        app.listen(PORT, ()=>{
            console.log(`server is running at ${PORT}`)
        })
    })
    .catch((err) => {
        console.error("Database cannot be connected!!")
    }) 



