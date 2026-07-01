# 📚 Book Store - CRUD Application

A full-stack web application for managing a book store with Create, Read, Update, and Delete (CRUD) operations. Built with Node.js, Express, MongoDB, and styled with Tailwind CSS.

---

## 📹 Tutorial Video

**Watch the explanation video here:** [Add your video link here](#)

---

## 🎯 Project Overview

This is a complete Book Store management system where users can:
- ✅ View all books with details (name, author, category, price, image)
- ✅ Add new books with image uploads
- ✅ Edit existing book information
- ✅ Delete books from the store
- ✅ Manage book images (upload, update, delete)

---

## 🏗️ Project Flow & Architecture

### Request-Response Cycle

```
Client (Browser)
    ↓
Routes (book.route.js)
    ↓
Controllers (book.controll.js)
    ↓
Models (book.model.js)
    ↓
Database (MongoDB)
    ↓
Response back to Views (EJS Templates)
```

### Data Flow Diagram

1. **User makes request** → Express Router receives it
2. **Router identifies route** → Passes to appropriate Controller
3. **Controller processes request** → Interacts with Model
4. **Model queries Database** → MongoDB returns data
5. **Controller renders view** → Sends response with data
6. **Browser displays page** → User sees the result

---

## 🔧 Tech Stack & Fundamentals

### Backend
- **Node.js** - JavaScript runtime for server-side execution
- **Express.js** - Web framework for routing and middleware
- **MongoDB** - NoSQL database for storing book data
- **Mongoose** - ODM (Object Data Modeling) for MongoDB

### Frontend
- **EJS** - Templating engine for dynamic HTML rendering
- **Tailwind CSS** - Utility-first CSS framework for styling

### File Handling & Uploads
- **Multer** - Middleware for handling file uploads (images)
- **Node.js fs module** - File system operations (delete old images)

### Development Tools
- **Nodemon** - Auto-restart server on file changes
- **Concurrently** - Run multiple commands simultaneously
- **Dotenv** - Environment variable management

---

## 📁 Project Structure

```
bookStore/
├── app.js                      # Main application file
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
│
├── config/
│   └── db.js                   # MongoDB connection setup
│
├── controllers/
│   └── book.controll.js        # Business logic for CRUD operations
│
├── models/
│   └── book.model.js           # Mongoose schema and model
│
├── routes/
│   └── book.route.js           # API endpoints and routes
│
├── views/
│   ├── index.ejs               # Display all books
│   ├── add.ejs                 # Form to add new book
│   └── edit.ejs                # Form to edit existing book
│
├── public/
│   └── style.css               # Compiled Tailwind CSS
│
├── src/
│   └── input.css               # Source Tailwind CSS
│
└── uploads/                    # Folder for uploaded book images
```

---

## 🚀 Installation & Setup Steps

### Step 1: Prerequisites
Ensure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (Local or Atlas) - [Setup Guide](https://www.mongodb.com/docs/manual/installation/)
- **Git** (Optional) - [Download](https://git-scm.com/)

### Step 2: Clone/Setup Project
```bash
# Navigate to project directory
cd bookStore

# Install all dependencies
npm install
```

### Step 3: Environment Configuration
Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/bookstore
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookstore
NODE_ENV=development
```

### Step 4: Database Connection
Update `config/db.js` with your MongoDB connection string:
```javascript
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookstore';
```

---

## 🎮 How to Run

### Development Mode (with hot-reload)
```bash
npm start
```
This will:
- Start Node.js server with Nodemon (auto-restarts on changes)
- Watch Tailwind CSS changes and recompile

Server runs on: **http://localhost:5000**

### Production Mode
```bash
npm run start:prod
```
This runs the server without Nodemon.

---

## 📖 API Routes & Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Display all books |
| GET | `/add` | Show add book form |
| POST | `/add` | Create new book (with image upload) |
| GET | `/edit/:id` | Show edit form for specific book |
| POST | `/edit/:id` | Update book details (with image upload) |
| GET | `/delete/:id` | Delete a specific book |

---

## 💾 Database Schema (Book Model)

```javascript
{
  _id: ObjectId,              // MongoDB auto-generated ID
  name: String,               // Book title
  img: String,                // Image filename
  author: String,             // Author name
  category: String,           // Book category/genre
  price: Number               // Book price
}
```

---

## 🔄 CRUD Operations Explained

### CREATE (Add Book)
- User fills form in `/add` page
- Multer uploads image to `/uploads` folder
- Data saved to MongoDB
- Redirects to home page

### READ (View Books)
- GET `/` fetches all books from MongoDB
- Data passed to `index.ejs` template
- EJS renders HTML with book details

### UPDATE (Edit Book)
- Click edit → Load book details in form
- Update fields and upload new image (optional)
- Old image deleted from `/uploads`
- New data updated in MongoDB
- Redirects to home page

### DELETE (Remove Book)
- Click delete → Controller finds book
- Image file deleted from `/uploads` folder
- Book document removed from MongoDB
- Redirects to home page

---

## 📦 Key Dependencies Explained

### Express
Handles routing and HTTP requests/responses
```javascript
app.get('/', (req, res) => {
  // Handle GET request
});
```

### Mongoose
Connects to MongoDB and provides schema validation
```javascript
const bookSchema = new mongoose.Schema({ ... });
const bookModel = mongoose.model("book", bookSchema);
```

### Multer
Handles file uploads with custom storage configuration
```javascript
const upload = multer({ storage: storage });
app.post('/add', upload.single('img'), controller.addBook);
```

### EJS
Renders dynamic HTML with server-side data
```ejs
<% books.forEach(book => { %>
  <p><%= book.name %></p>
<% }); %>
```

### Tailwind CSS
Provides utility classes for responsive styling
```html
<div class="bg-blue-500 p-4 rounded-lg">Content</div>
```

---

## ⚙️ How Multer Works (Image Upload)

1. **Storage Configuration** - Define where to save files
2. **Filename Generator** - Create unique filename using timestamp
3. **Middleware** - Intercept file before reaching controller
4. **File Access** - Access uploaded file via `req.file`
5. **Storage** - File saved to `/uploads` folder

Example:
```javascript
const storage = multer.diskStorage({
  destination: './uploads',           // Save location
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)  // Unique name
  }
});
```

---

## 🔒 Error Handling Features

- **Image Deletion**: Safely checks if file exists before deletion
- **Update Handling**: Only deletes old image if new image is uploaded
- **Database Errors**: Try-catch blocks in controllers
- **File System**: Error handling with `fs.existsSync()`

---

## 🚀 Future Enhancements

- [ ] User authentication & authorization
- [ ] Search and filter functionality
- [ ] Pagination for large datasets
- [ ] Rating and review system
- [ ] Shopping cart functionality
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Email notifications

---

## 📝 Common Issues & Solutions

### Port Already in Use
```bash
# Change port in app.js or kill process on port 5000
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Failed
- Check MongoDB is running
- Verify connection string in `.env`
- Check firewall/network settings

### Image Not Uploading
- Ensure `/uploads` folder exists
- Check file permissions
- Verify Multer configuration

### Tailwind CSS Not Applied
- Run `npm start` (not `npm run start:prod`)
- Clear browser cache (Ctrl+Shift+Del)
- Check CSS compilation in terminal

---

## 📚 Learning Resources

- **Express.js Docs** - https://expressjs.com/
- **MongoDB Guide** - https://docs.mongodb.com/
- **Mongoose Guide** - https://mongoosejs.com/
- **EJS Docs** - https://ejs.co/
- **Tailwind CSS** - https://tailwindcss.com/
- **Multer Docs** - https://github.com/expressjs/multer

---

## 📄 License

ISC License - Feel free to use and modify

---

## 👨‍💻 Author

Created for learning full-stack development with Node.js and MongoDB

---

## 💡 Key Concepts Learned

✅ Express routing and middleware  
✅ MongoDB and Mongoose ODM  
✅ RESTful API design  
✅ File upload handling with Multer  
✅ EJS templating engine  
✅ CSS framework integration (Tailwind)  
✅ CRUD operations  
✅ Error handling and file operations  
✅ Environment variables  
✅ Development workflow with Nodemon  

---

**Happy Coding! 🚀**
