const express = require('express')
const movieModel = require('../models/movie.model')
const multer = require('multer')
const sharp = require('sharp')
const movieController = require('../controllers/movie.controller')

const movieRouter = express.Router()

// code for stroting the images
const storage = multer.memoryStorage()

const upload = multer({ storage })

// routes
movieRouter.get('/', movieController.mainPage)

movieRouter.get('/admin',movieController.adminPage)

movieRouter.get('/add',movieController.addMoviePage)

movieRouter.post('/add',upload.fields([
    { name: 'poster', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
    { name: 'actorPhoto[]', maxCount: 20 }
  ]),
movieController.addMovie)

movieRouter.get('/edit/:id',movieController.editMoviePage)

movieRouter.post(
    '/edit/:id',
    upload.fields([
        { name: 'poster', maxCount: 1 },
        { name: 'banner', maxCount: 1 },
        { name: 'actorPhoto[]', maxCount: 20 }
    ]),
    movieController.editMovie
);

movieRouter.get('/detailed/:id',movieController.detailedMoviePage)

movieRouter.get('/trailer/:id',movieController.trailerPage)

movieRouter.post('/delete/:id',movieController.deleteMovie)

module.exports=movieRouter