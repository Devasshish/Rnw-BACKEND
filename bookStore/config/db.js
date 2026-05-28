const mongoose = require('mongoose')
const dotenv = require('dotenv')
// connecting t mongoDB
const connectDB = ()=> {
    console.log(process.env.MONGO_URI)

    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database connected successfully")
    })
    .catch((err)=>{
        console.error("Error : ",err)
    })
}

module.exports = connectDB