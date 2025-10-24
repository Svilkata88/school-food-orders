const jwt = require('jsonwebtoken');

function isAdmin(req, res, next) {

    const token = req.cookies.token;
    if (!token) {
        console.log('No token provided!')
        return res.status(403).redirect('/auth/login');
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        if (data.role === 'admin') {
            next(); 
        } else {
            return res.status(403).send('Access denied. Admins only.');
        }


    } catch (err) {
        console.log('Invalid or expired token')
        return res.status(403).redirect('/auth/login');
    }
}

module.exports = isAdmin;