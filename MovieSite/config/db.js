const mongoose = require('mongoose')

const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://creativedeveloper1309:Deny1309@rnw.e6qczap.mongodb.net/MovieSite')
    .then(()=>{
        console.log("Connected Successfully")
    })
    .catch((err)=>{
        console.error(err)
    })
}

module.exports = connectDB

