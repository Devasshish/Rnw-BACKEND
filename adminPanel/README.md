# NexVault Admin Panel

A premium full-stack Node.js admin panel designed for a furniture company with a dark, luxurious aesthetic.

## Features
- **Authentication**: Signup, Login, Logout, and Forgot Password (OTP via Email)
- **MVC Architecture**: Clean separation of Models, Views, and Controllers
- **UI/UX**: Premium dark theme using Bootstrap 5, custom CSS, and Font Awesome
- **CRUD Operations**: Manage Categories, Subcategories, Extra Categories, and Products with cascading relationships
- **Image Uploads**: Product images via Multer
- **Database**: MongoDB with Mongoose ODM
- **Notifications**: Flash messages for user actions

## Prerequisites
- Node.js installed
- MongoDB running locally (or a MongoDB Atlas URI)

## Setup Instructions
1. **Clone the repository** (if not already local).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   Update the `.env` file with your credentials:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://127.0.0.1:27017/nexvault_furniture
   SESSION_SECRET=your_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   ```
   *(Note: Use Google App Passwords if using Gmail for Nodemailer).*

4. **Run the Application**:
   For development (uses nodemon):
   ```bash
   npm run dev
   ```
   For production:
   ```bash
   npm start
   ```

5. **Access the App**:
   Open `http://localhost:3000` in your browser. Register a new user, then login.

## Folder Structure
- `models/`: Mongoose schemas
- `controllers/`: Logic for handling requests
- `routes/`: Express route definitions
- `views/`: EJS templates and partials
- `middlewares/`: Auth and upload handlers
- `public/`: Static assets (CSS, images, uploads)
- `utils/`: Helpers (e.g., Email sender)
- `config/`: DB and Passport configuration

## Technologies Used
- Express.js, EJS, Passport.js, Multer, Nodemailer, Bootstrap 5, jQuery (for cascading dropdowns).
