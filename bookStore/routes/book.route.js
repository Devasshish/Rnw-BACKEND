const express = require('express')
const bookRoute = express.Router()
const bookControll = require('../controllers/book.controll')
const multer = require('multer')
const bookModel = require('../models/book.model')

// multer logic
const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({ storage: storage })

// all routes
bookRoute.get('/',bookControll.showBooks)

bookRoute.get('/add',bookControll.addBookPage)

bookRoute.post('/add',upload.single('img'),bookControll.addBook)

bookRoute.get('/edit/:id',bookControll.getEditPage)

bookRoute.post('/edit/:id', upload.single('img'), bookControll.editBook)

bookRoute.get('/delete/:id',bookControll.deleteBook)


module.exports = bookRoute