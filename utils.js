const jwt = require('jsonwebtoken');

function getUserFromToken(token) {
    if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                return decoded; 
            } catch (err) {
                console.log('Invalid or expired token');
                return null;
            }
        }
}

module.exports = {getUserFromToken};