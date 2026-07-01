const mongoose = require('mongoose');
const Movie = require('./models/movie.model');

mongoose.connect('mongodb+srv://creativedeveloper1309:Deny1309@rnw.e6qczap.mongodb.net/MovieSite');

const movies = [
    {
        movieName: "Interstellar",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        posterURI: "interstellar-poster.webp",
        bannerURI: "interstellar-banner.webp",
        trailerURI: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
        rating: 8.7,
        genre: ["Sci-Fi", "Adventure", "Drama"],
        releaseYear: 2014,
        duration: "2h 49m",
        language: "English",
        cast: [
            {
                actorName: "Matthew McConaughey",
                actorPhoto: "matthew.webp"
            },
            {
                actorName: "Anne Hathaway",
                actorPhoto: "anne.webp"
            }
        ],
        director: "Christopher Nolan",
        featured: true
    },

    {
        movieName: "Oppenheimer",
        description: "The story of J. Robert Oppenheimer and the creation of the atomic bomb.",
        posterURI: "oppenheimer-poster.webp",
        bannerURI: "oppenheimer-banner.webp",
        trailerURI: "https://www.youtube.com/watch?v=uYPbbksJxIg",
        rating: 8.5,
        genre: ["Biography", "Drama", "History"],
        releaseYear: 2023,
        duration: "3h",
        language: "English",
        cast: [
            {
                actorName: "Cillian Murphy",
                actorPhoto: "cillian.webp"
            }
        ],
        director: "Christopher Nolan",
        featured: true
    },

    {
        movieName: "The Dark Knight",
        description: "Batman faces the Joker, a criminal mastermind spreading chaos across Gotham City.",
        posterURI: "dark-knight-poster.webp",
        bannerURI: "dark-knight-banner.webp",
        trailerURI: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
        rating: 9.0,
        genre: ["Action", "Crime", "Drama"],
        releaseYear: 2008,
        duration: "2h 32m",
        language: "English",
        cast: [
            {
                actorName: "Christian Bale",
                actorPhoto: "bale.webp"
            },
            {
                actorName: "Heath Ledger",
                actorPhoto: "ledger.webp"
            },
            {
                actorName: "Tom Hardy",
                actorPhoto: "hardy.webp"
            }
        ],
        director: "Christopher Nolan",
        featured: true
    },

    {
        movieName: "Avatar",
        description: "A paraplegic Marine is dispatched to the moon Pandora on a unique mission.",
        posterURI: "avatar-poster.webp",
        bannerURI: "avatar-banner.webp",
        trailerURI: "https://www.youtube.com/watch?v=5PSNL1qE6VY",
        rating: 7.9,
        genre: ["Sci-Fi", "Adventure"],
        releaseYear: 2009,
        duration: "2h 42m",
        language: "English",
        cast: [
            {
                actorName: "Sam Worthington",
                actorPhoto: "sam.webp"
            },
            {
                actorName: "Zoe Saldaña",
                actorPhoto: "zoe.webp"
            }
        ],
        director: "James Cameron",
        featured: true
    },

    {
        movieName: "Leo",
        description: "A mild-mannered man becomes a feared vigilante while protecting his family.",
        posterURI: "leo.webp",
        bannerURI: "leo.webp",
        trailerURI: "https://www.youtube.com/watch?v=Po3jStA673E",
        rating: 7.4,
        genre: ["Action", "Thriller"],
        releaseYear: 2023,
        duration: "2h 44m",
        language: "Tamil",
        cast: [
            {
                actorName: "Thalapathy Vijay",
                actorPhoto: "leo.webp"
            },
            {
                actorName: "Nayanthara",
                actorPhoto: "nayanthara.webp"
            }
        ],
        director: "Lokesh Kanagaraj",
        featured: false
    },

    {
        movieName: "Jawan",
        description: "A man seeks justice while fighting corruption and social injustice.",
        posterURI: "jawan-poster.webp",
        bannerURI: "jawan-banner.webp",
        trailerURI: "https://www.youtube.com/watch?v=MWOlnZSnXJo",
        rating: 7.0,
        genre: ["Action", "Thriller"],
        releaseYear: 2023,
        duration: "2h 49m",
        language: "Hindi",
        cast: [
            {
                actorName: "Shah Rukh Khan",
                actorPhoto: "srk.webp"
            },
            {
                actorName: "Nayanthara",
                actorPhoto: "nayanthara.webp"
            }
        ],
        director: "Atlee",
        featured: true
    },

    {
        movieName: "RRR",
        description: "Two legendary revolutionaries fight against British rule.",
        posterURI: "rrr-poster.webp",
        bannerURI: "rrr-banner.webp",
        trailerURI: "https://www.youtube.com/watch?v=f_vbAtFSEc0",
        rating: 7.8,
        genre: ["Action", "Drama"],
        releaseYear: 2022,
        duration: "3h 7m",
        language: "Telugu",
        cast: [
            {
                actorName: "Jr. NTR",
                actorPhoto: "ntr.webp"
            },
            {
                actorName: "Ram Charan",
                actorPhoto: "ramcharan.webp"
            }
        ],
        director: "S. S. Rajamouli",
        featured: true
    }
];

const seedDB = async () => {
    try {
        await Movie.deleteMany();
        await Movie.insertMany(movies);

        console.log('Movies Seeded Successfully ✅');
        mongoose.connection.close();
    } catch (error) {
        console.log(error);
    }
};

seedDB();