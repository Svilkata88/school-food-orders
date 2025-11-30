
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

function formatDate(dateString) {
    dateString = new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

    return dateString;
};

module.exports = {
    getUserFromToken,
    formatDate,
};

