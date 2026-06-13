# MovieSite

A full-stack web application for managing and displaying movies with details, trailers, ratings, and cast information. Built with Node.js, Express, MongoDB, and Tailwind CSS.

## 📹 Tutorial Video

**Watch the explanation video here:** [Click here](#https://drive.google.com/file/d/1fotXId16pn4zinJaPD0JaxSVCLAuNVRf/view?usp=drive_link)

---

## Features

- 🎬 **Movie Management**: Add, edit, and delete movies
- 🎥 **Movie Details**: Display comprehensive movie information including cast, trailers, ratings, and more
- 🏷️ **Movie Filtering**: Filter movies by genre, language, and release year
- 📸 **Image Upload**: Upload poster and banner images with automatic optimization
- ⭐ **Rating System**: View and manage movie ratings
- 🎭 **Cast Information**: Add actor details with photos
- 🎞️ **Trailer Links**: Store and display movie trailer URLs
- 📱 **Responsive Design**: Beautiful UI built with Tailwind CSS
- 👨‍💻 **Admin Panel**: Dedicated admin interface for movie management

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Templating**: EJS
- **Styling**: Tailwind CSS
- **File Handling**: Multer (file uploads), Sharp (image optimization)
- **Development**: Nodemon
- **Environment**: dotenv

## Installation

1. **Clone or navigate to the project directory**
```bash
cd MovieSite
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file** in the root directory with your MongoDB connection string:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

4. **Start the development server**
```bash
npm start
```

The application will run on `http://localhost:3000`

## Available Scripts

- `npm start` - Start the development server with Nodemon
- `npm run tailwind` - Watch and compile Tailwind CSS changes

## Project Structure

```
MovieSite/
├── app.js                 # Main application file
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── config/
│   └── db.js             # MongoDB connection setup
├── controllers/
│   └── movie.controller.js # Movie business logic
├── models/
│   └── movie.model.js     # Movie schema and model
├── routes/
│   └── movie.route.js     # API routes
├── views/                 # EJS templates
│   ├── index.ejs         # Movie listing page
│   ├── add.ejs           # Add movie form
│   ├── edit.ejs          # Edit movie form
│   ├── detailed.ejs      # Movie details page
│   ├── admin.ejs         # Admin dashboard
│   └── trailer.ejs       # Trailer viewing page
├── public/               # Static files (CSS, JS, images)
├── uploads/              # User-uploaded files (posters, banners)
└── README.md            # Project documentation
```

## Database Schema

### Movie Model

```javascript
{
  movieName: String,
  description: String,
  posterURI: String,
  bannerURI: String,
  trailerURI: String,
  rating: Number,
  genre: [String],
  releaseYear: Number,
  duration: String,
  language: String,
  cast: [{
    actorName: String,
    actorPhoto: String
  }],
  director: String,
  featured: Boolean
}
```

## API Routes

The application provides routes for:
- **GET** `/` - View all movies
- **GET** `/add` - Show add movie form
- **POST** `/add` - Create a new movie
- **GET** `/edit/:id` - Show edit movie form
- **POST** `/edit/:id` - Update a movie
- **GET** `/delete/:id` - Delete a movie
- **GET** `/movie/:id` - View movie details
- **GET** `/admin` - Access admin panel

## Getting Started

1. Ensure MongoDB is running on your local machine or provide a valid MongoDB URI
2. Install dependencies with `npm install`
3. Start the Tailwind CSS watcher: `npm run tailwind`
4. In another terminal, start the server: `npm start`
5. Open your browser and navigate to `http://localhost:3000`

## File Upload

The application supports uploading movie posters and banner images. Files are:
- Stored in the `uploads/` directory
- Optimized using Sharp for better performance
- Automatically managed through the Multer middleware

## Styling

The project uses Tailwind CSS for styling. To make changes:

1. Edit CSS files in `src/` or `public/css/`
2. Run `npm run tailwind` to compile changes
3. The compiled CSS will be generated in `public/css/output.css`

## Development

This project uses:
- **Nodemon** for automatic server restart during development
- **Tailwind CSS CLI** for style compilation

## Future Enhancements

- User authentication and reviews
- Search and advanced filtering
- Movie recommendations
- User watchlist/favorites
- Email notifications
- API rate limiting
- Database indexing for better performance

## License

ISC

## Contact

For questions or support, please reach out to the project maintainer.

---

**Happy movie managing! 🎬**
