const express = require('express')
const connectDB = require('./config/db')
const imgRoute = require('./routes/imgRoute')

connectDB()
const app = express()
app.set('view engine','ejs')
app.use('/uploads',express.static('uploads'))


app.use('/',imgRoute)

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})

