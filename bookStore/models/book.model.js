const mongoose = require('mongoose')

// book Schema
const bookSchema = new mongoose.Schema({
    name : String ,
    img : String ,
    author : String ,
    category : String ,
    price : Number
})

// book model
const bookModel = mongoose.model("book",bookSchema)

module.exports= bookModel
