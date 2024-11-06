const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

function generateToken(user){
    const payload = {
        _id : user._id,
        name : user.name,
        email : user.email,
        role : user.role,
        profileImageURL : user.profileImageURL
    }
    const token = jwt.sign(payload,SECRET_KEY);
    return token;
}

function validateToken(token){
    const payload = jwt.verify(token,SECRET_KEY);
    return payload;
}

module.exports = {generateToken, validateToken};