const fs = require('fs');

function saveUser(username, hashedPassword) {
    const user = { username, password: hashedPassword };
    const usersFilePath = './users.json';

    const users = fs.readFileSync(usersFilePath, 'utf-8');
    
    if(!users) {
        fs.writeFileSync(usersFilePath, JSON.stringify([user], null, 2));
        console.log('First user saved successfully.');
    }
    else {
        const usersArray = JSON.parse(users);
        usersArray.push(user);
        fs.writeFileSync(usersFilePath, JSON.stringify(usersArray, null, 2));
        console.log('User added successfully.');
    }
}

function getUsers() {
    const usersFilePath = './users.json';
    if (fs.existsSync(usersFilePath)) {
        const usersData = fs.readFileSync(usersFilePath, 'utf-8');
        return JSON.parse(usersData);
    }
    return [];
}

module.exports = {
    saveUser,
    getUsers
};