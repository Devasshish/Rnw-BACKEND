const express = require('express')
const imgControll = require('../controller/imgControll')
const imgRoute = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({ storage: storage })

imgRoute.get('/',imgControll.showImage)

imgRoute.post('/uploads',upload.single('img'),imgControll.uploadImage)

module.exports = imgRoute