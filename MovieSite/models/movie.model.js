const mongoose  = require('mongoose')

// movie schema
const movieSchema = new mongoose.Schema({
    movieName : String,
    description : String,
    posterURI : String,
    bannerURI : String,
    trailerURI : String,
    rating : Number,
    genre : [String],
    releaseYear : Number,
    duration : String,
    language : String,
    cast : [{
        actorName: String,
        actorPhoto : String
    }],
    director : String,
    featured : Boolean
})

// movie model
const movieModel = mongoose.model('Movie',movieSchema)

module.exports=movieModel