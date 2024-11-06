const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const  userRouter  = require('./routes/user');
const cookieParser = require('cookie-parser');
const {checkAuthCookie} = require('./middlewares/auth');

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));


app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkAuthCookie('token'));
app.use('/user', userRouter);
app.get('/', (req, res) => {
    res.render('home',{
      user: req.user
    });
});




mongoose.connect('mongodb://localhost:27017/blogger');
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});