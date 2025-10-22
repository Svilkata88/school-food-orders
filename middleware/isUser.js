require('dotenv').config();
const jwt = require('jsonwebtoken');

function isUser(req, res, next) {
    const token = req.cookies.token;
    console.log(token)

    if (!token) {
        console.log('No token provided!')
        return res.status(403).redirect('/auth/login');
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        console.log(data)
        req.user = data;

        next(); 
    } catch (err) {
        console.log('Invalid or expired token')
        return res.status(403).redirect('/auth/login');
    }
}

module.exports = isUser;