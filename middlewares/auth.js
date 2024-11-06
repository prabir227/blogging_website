const { validateToken } = require("../services/auth");

function checkAuthCookie(cookieName) {
    return (req, res, next) => {
        const token = req.cookies[cookieName];
        if (!token) return next(); 
        try {
            const payload = validateToken(token);
            req.user = payload;
        } catch (error) {
            console.log(error);
        }
        next();
    };
}

module.exports = {checkAuthCookie};