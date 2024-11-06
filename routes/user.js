const {Router} = require('express');
const user = require('../models/user');
const router = Router();

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', async (req, res) => {
    const {name, email, password} = req.body;
    await user.create({name, email, password});
    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('signin');
});

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
    const token = await user.authenticate(email, password);
    return res.cookie('token', token).redirect('/');
        
    } catch (error) {
        res.render('signin', {error: error.message});
    }
    
});

module.exports = router;