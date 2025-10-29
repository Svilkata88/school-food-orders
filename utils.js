
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

function addMenuRow() {
    const form = document.getElementById('create-menu-form');
    const addFieldsContainer = document.getElementById('additional-fields-container');


    const divWrapper = document.createElement('div');
    divWrapper.className = 'row-container';

    const label = document.createElement('label');
    label.for = 'row-day';
    const input = document.createElement('input');
    input.id = 'row-day';
    divWrapper.append(label, input);

    form.appendChild(divWrapper);
}

module.exports = {
    getUserFromToken,
    addMenuRow
};

