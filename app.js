const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const  userRouter  = require('./routes/user');
const cookieParser = require('cookie-parser');
const {checkAuthCookie} = require('./middlewares/auth');
const blogRouter = require('./routes/blog');
const Blog = require('./models/blog');
const dotenv = require('dotenv');

dotenv.config();
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));


app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkAuthCookie('token'));
app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use(express.static(path.resolve('./public')));
app.get('/', async (req, res) => {
    const blogs = await Blog.find({}).sort({createdAt: -1});
    res.render('home',{
      user: req.user,
      blogs: blogs
    });
});




mongoose.connect(process.env.DB_URL);
app.listen(process.env.PORT, () => {
  console.log('Server is running on port '+process.env.PORT);
});