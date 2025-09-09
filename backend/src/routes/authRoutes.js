import express from "express"

const router = express.Router()
 router.post('/SignUp', (req,res) => {
    res.send('Sign Up Page')
 })
 router.post('/Login', (req,res) => {
    res.send('Login Page')
 })
// router.get('/SignUp', (req,res) => {
//     res.send('Sign Up Page')
//  })
//  router.get('/Login', (req,res) => {
//     res.send('Login Page')
//  })

 export default router