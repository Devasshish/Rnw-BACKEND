const express = require('express')
const app = express()
const connectDB = require('./config/db')
const movieRouter = require('./routes/movie.route')

// database connetion
connectDB()

// set for ejs
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))

// making static
app.use("/uploads", express.static("uploads"))
app.use(express.static('public'))

// main route
app.use('/',movieRouter)

// server creation
app.listen(3000,()=>{
    console.log("Server is running ")
})