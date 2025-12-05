const fs = require('fs');
const User = require('../db/User'); 

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

// --------------------------------------------------------------------
async function getAllUsers() {
  try {
    const users = await User.findAll({
    });
    return users;

  } catch (error) {
    console.error('Error fetching users:', error);
    return undefined;
  }
}

async function getUserByName(username) {
  try {
    const user = await User.findOne({
      where: { name: username }
    });
    return user;

  } catch (error) {
    console.error('Error fetching user:', error);
    return undefined;
  }
}

async function getUserById(id) {
  try {
    const user = await User.findOne({
      where: { id: id }
    });
    return user;

  } catch (error) {
    console.error('Error fetching user:', error);
    return undefined;
  }
}

async function createUser(name, email, password, role) {
  try {
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user',
    });

    console.log(`User ${name} created successfully!`);
    return user;
  } catch (err) {
    console.error('Error creating user:', err);
}}


module.exports = {
    saveUser,
    getUsers,
    getUser,
    getUserByName,
    getUserById,
    createUser,
    getAllUsers,
};