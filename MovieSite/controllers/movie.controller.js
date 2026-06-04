const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const movieModel = require('../models/movie.model')
// all controllers
const mainPage = async(req,res)=>{
    // all movies
    const movies = await movieModel.find()
    // for banner
    const featuredMovies = movies.filter((movie)=>movie.featured)
    res.render('index', {featuredMovies , movies })
}

const adminPage = async(req,res)=>{
    const movies = await movieModel.find()
    res.render('admin',{movies})
}

const addMoviePage = async(req,res)=>{
    res.render('add')
}

const addMovie = async (req, res) => {
    try {
        // create uplod folder
        if (!fs.existsSync('./uploads')) {
            fs.mkdirSync('./uploads')
        }

        // poster
        let posterName = ''

        if (req.files.poster) {
            posterName = Date.now() + '-poster.webp'
            await sharp(req.files.poster[0].buffer)
                .resize(500)
                .webp({ quality: 70 })
                .toFile(
                    path.join(__dirname, '../uploads', posterName)
                )
        }

        // banneer
        let bannerName = ''
        if (req.files.banner) {
            bannerName = Date.now() + '-banner.webp'
            await sharp(req.files.banner[0].buffer)
                .resize(1200)
                .webp({ quality: 70 })
                .toFile(
                    path.join(__dirname, '../uploads', bannerName)
                )
        }

        // ACTOR PHOTOS

        let actorPhotos = []

        //  OLD CODE 
        //         for (const file of req.files['actorPhoto[]']) {

        //     const fileName =
        //         Date.now() + Math.random() + '.webp'

        //     await sharp(file.buffer)

        //         .resize(300)

        //         .webp({ quality: 70 })

        //         .toFile(
        //             path.join(__dirname, '../uploads', fileName)
        //         )

        //     actorPhotos.push(fileName)
        // }

        // new code optimized for speedy upload
        // multiple actors photos uploads at a time 
        const promises = req.files['actorPhoto[]'].map(async (file) => {
        const fileName = Date.now() + Math.random() + '.webp'
        await sharp(file.buffer)
            .resize(300)
            .webp({ quality: 70 })
            .toFile(
                path.join(__dirname, '../uploads', fileName)
            )
            return fileName
        })
        actorPhotos = await Promise.all(promises)

        // CAST ARRAY
        const cast = req.body.actorName.map((name, index) => {
            return {
                actorName: name,
                actorPhoto: actorPhotos[index]
            }
        })

        // SAVE MOVIE

        await movieModel.create({
            movieName: req.body.movieName,
            description: req.body.description,
            posterURI: posterName,
            bannerURI: bannerName,
            trailerURI: req.body.trailerURI,
            rating: req.body.rating,
            genre: req.body.genre,
            releaseYear: req.body.releaseYear,
            duration: req.body.duration,
            language: req.body.language,
            cast: cast,
            director: req.body.director,
            featured: req.body.featured === 'on'
        })

        res.redirect('/')
    }

    catch (err) {
        console.log(err)
    }
}

const editMoviePage = async(req,res)=>{
    const movie = await movieModel.findById(req.params.id)

    res.render('edit',{movie})
}

const editMovie = async (req, res) => {
    try {

        const movie = await movieModel.findById(req.params.id);

        if (!movie) {
            return res.send('Movie not found');
        }
        // POSTER

        let posterName = movie.posterURI;

        if (req.files?.poster) {
            // Delete old poster
            if (movie.posterURI) {
                const oldPosterPath = path.join(__dirname, '../uploads', movie.posterURI);
                if (fs.existsSync(oldPosterPath)) {
                    try {
                        fs.unlinkSync(oldPosterPath);
                        console.log('Old poster deleted:', movie.posterURI);
                    } catch (err) {
                        console.error('Error deleting old poster:', err.message);
                    }
                }
            }
            posterName = Date.now() + '-poster.webp';
            await sharp(req.files.poster[0].buffer)
                .resize(500)
                .webp({ quality: 70 })
                .toFile(
                    path.join(__dirname, '../uploads', posterName)
                );
        }

        // banner
        let bannerName = movie.bannerURI;

        if (req.files?.banner) {
            // Delete old banner
            if (movie.bannerURI) {
                const oldBannerPath = path.join(__dirname, '../uploads', movie.bannerURI);
                if (fs.existsSync(oldBannerPath)) {
                    try {
                        fs.unlinkSync(oldBannerPath);
                        console.log('Old banner deleted:', movie.bannerURI);
                    } catch (err) {
                        console.error('Error deleting old banner:', err.message);
                    }
                }
            }

            bannerName = Date.now() + '-banner.webp';

            await sharp(req.files.banner[0].buffer)
                .resize(1200)
                .webp({ quality: 70 })
                .toFile(
                    path.join(__dirname, '../uploads', bannerName)
                );
        }

        // cast
        let cast = movie.cast;
        if (req.body.castName) {
            const castNames = Array.isArray(req.body.castName)
                ? req.body.castName
                : [req.body.castName];
            const actorPhotos = [];

            if (req.files?.['castPhoto[]']) {
                // Delete old cast photos if new ones are being uploaded
                if (Array.isArray(movie.cast)) {
                    movie.cast.forEach((actor) => {
                        if (actor.actorPhoto) {
                            const oldPhotPath = path.join(__dirname, '../uploads', actor.actorPhoto);
                            if (fs.existsSync(oldPhotPath)) {
                                try {
                                    fs.unlinkSync(oldPhotPath);
                                    console.log('Old cast photo deleted:', actor.actorPhoto);
                                } catch (err) {
                                    console.error('Error deleting old cast photo:', err.message);
                                }
                            }
                        }
                    });
                }

                const promises = req.files['castPhoto[]'].map(async (file) => {
                    const fileName =
                        Date.now() + Math.random() + '.webp';
                    await sharp(file.buffer)
                        .resize(300)
                        .webp({ quality: 70 })
                        .toFile(
                            path.join(__dirname, '../uploads', fileName)
                        );
                    return fileName;
                });
                actorPhotos.push(...await Promise.all(promises));
            }

            cast = castNames.map((name, index) => ({
                actorName: name,
                actorPhoto:
                    actorPhotos[index] ||
                    movie.cast[index]?.actorPhoto ||
                    ''
            }));
        }

        // update movie
        await movieModel.findByIdAndUpdate(req.params.id, {
            movieName: req.body.movieName,
            description: req.body.description,
            posterURI: posterName,
            bannerURI: bannerName,
            trailerURI: req.body.trailerURI,
            rating: req.body.rating,
            genre: req.body.genre,
            releaseYear: req.body.releaseYear,
            duration: req.body.duration,
            language: req.body.language,
            cast: cast,
            director: req.body.director,
            featured: req.body.featured === 'on'
        });

        res.redirect('/admin');
    } 
    catch (err) {
        console.log(err);
    }
};

const detailedMoviePage = async(req,res)=>{
    const movie  = await movieModel.findById(req.params.id)

    res.render('detailed',{movie})
}

const trailerPage = async(req,res)=>{
    const movie  = await movieModel.findById(req.params.id)

    res.render('trailer',{movie})
}

const deleteMovie = async(req,res)=>{
    try {
        const movie = await movieModel.findById(req.params.id)
        if (!movie) {
            return res.status(404).send('Movie not found')
        }

        // delete poster
        if (movie.posterURI) {
            const posterPath = path.join(__dirname, '../uploads', movie.posterURI)
            if (fs.existsSync(posterPath)) {
                try {
                    fs.unlinkSync(posterPath)
                    console.log('Poster deleted:', movie.posterURI)
                } catch (err) {
                    console.error('Error deleting poster:', err.message)
                }
            }
        }

        // delete baneer
        if (movie.bannerURI) {
            const bannerPath = path.join(__dirname, '../uploads', movie.bannerURI)
            if (fs.existsSync(bannerPath)) {
                try {
                    fs.unlinkSync(bannerPath)
                    console.log('Banner deleted:', movie.bannerURI)
                } catch (err) {
                    console.error('Error deleting banner:', err.message)
                }
            }
        }

        // delete casts
        if (Array.isArray(movie.cast)) {
            movie.cast.forEach((actor) => {
                if (actor.actorPhoto) {
                    const actorPhotoPath = path.join(__dirname, '../uploads', actor.actorPhoto)
                    if (fs.existsSync(actorPhotoPath)) {
                        try {
                            fs.unlinkSync(actorPhotoPath)
                            console.log('Cast photo deleted:', actor.actorPhoto)
                        } catch (err) {
                            console.error('Error deleting cast photo:', err.message)
                        }
                    }
                }
            })
        }

        await movieModel.findByIdAndDelete(req.params.id)
        res.redirect('/')
    } 
    catch (err) {
        console.error('Error deleting movie:', err.message)
    }
}

module.exports = {
    mainPage,
    adminPage,
    addMoviePage,
    addMovie,
    editMoviePage,
    editMovie,
    detailedMoviePage,
    trailerPage,
    deleteMovie
}