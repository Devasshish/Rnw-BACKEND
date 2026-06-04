const mongoose = require('mongoose')

const connectDB = async (req,res)=>{
    await mongoose.connect('mongodb+srv://creativedeveloper1309:Deny1309@rnw.e6qczap.mongodb.net/Task4')
    .then(()=>{
        console.log("Database connected successfully")
    })
    .catch((err)=>{
        console.error(err)
    })
}

module.exports = connectDB