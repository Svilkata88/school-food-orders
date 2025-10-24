const fs = require('fs');

function saveUser(username, hashedPassword, role='user') {
    const user = { username, password: hashedPassword, role };
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

function getUser(username) {
    const usersFilePath = './users.json';
    const users = fs.readFileSync(usersFilePath, 'utf-8');
    
    if(!users) {
        console.log('User not found!');
        return null
    }
    else {
        const usersArray = JSON.parse(users);
        const currentUser = usersArray.find(u => u.username === username);
        if(!currentUser) {
            console.log('User not found!')
            return null;
        }
        return currentUser;
    }
}

function getUsers() {
    const usersFilePath = './users.json';
    if (fs.existsSync(usersFilePath)) {
            const usersData = fs.readFileSync(usersFilePath, 'utf-8');
            if (usersData.trim().length === 0) {
                // file exists but is empty
                return [];
            }
            try {
                return JSON.parse(usersData);
            } catch (err) {
                console.error('Invalid JSON in users.json:', err.message);
                return [];
            }
    }
}

module.exports = {
    saveUser,
    getUsers,
    getUser
};