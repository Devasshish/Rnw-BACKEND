const express = require('express')
const connectDB = require('./config/db')
const bookRoute = require('./routes/book.route')
const dotenv = require('dotenv').config()
// database connection
connectDB()

const app = express()
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.static('src'))
app.use(express.urlencoded({extended:true}))
app.use('/uploads',express.static('uploads'))
app.use(express.urlencoded({ extended: true }))

// main route
app.use('/',bookRoute)

// server creating
app.listen(5000,()=>{
    console.log("Server is running on port 5000")
})