# Blogging Website

## Overview
This project is a fully functional blogging website developed using Node.js. Users can create accounts, upload blogs with cover images and headings, and interact through comments. The website features JWT authentication for secure access, and blogs are displayed in chronological order on the homepage.

## Features
- User authentication using JWT.
- Blog creation with cover images and text content.
- Commenting feature on blogs.
- User dashboard to view personal blogs.
- Homepage displaying all blogs sorted by latest upload.
- Secure password storage using Cookie-Parser.
- File uploads handled by Multer.

## Technologies Used
### Backend:
- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web framework for handling routes.
- **MongoDB & Mongoose**: Database and ODM for data storage.
- **jsonwebtoken**: For authentication and authorization.
- **dotenv**: For environment variable management.
- **cookie-parser**: Securely stores hashed passwords.
- **multer**: Handles file uploads.
- **nodemon**: Automatically restarts the server during development.

### Frontend:
- **EJS**: Server-side rendering for dynamic content.
- **HTML & CSS**: Basic styling and structuring of pages.

## Installation & Setup
### Prerequisites:
- Node.js installed
- MongoDB set up

### Steps to Run the Project:
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/blogging-website.git
   cd blogging-website
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```
4. Start the application:
   ```sh
   npm start
   ```
   Or for development mode with automatic server restarts:
   ```sh
   npm run dev
   ```
5. Open `http://localhost:5000` in your browser to access the website.

## API Endpoints
- `POST /register` - Register a new user
- `POST /login` - User login
- `POST /blog` - Create a new blog
- `GET /blogs` - Retrieve all blogs
- `GET /blog/:id` - Retrieve a single blog
- `POST /blog/:id/comment` - Add a comment to a blog

## Future Enhancements
- Improve UI/UX with better frontend frameworks.
- Add user profile management.
- Implement categories and tags for blogs.
- Enable likes and shares on blogs.

## License
This project is open-source and available under the MIT License.

