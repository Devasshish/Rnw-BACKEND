const mongoose = require('mongoose')

const imgSchema = new mongoose.Schema({
    img : String
})

const imgModel = mongoose.model('Img',imgSchema)

module.exports = imgModel