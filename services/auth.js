const jwt = require('jsonwebtoken');
const SECRET_KEY = "prabir";

function generateToken(user){
    const payload = {
        _id : user._id,
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