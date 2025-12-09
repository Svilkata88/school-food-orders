const { request } = require('express');
const {getAllUsers, getUserById} = require('../services/userServices');
const { getUserFromToken } = require('../services/utils');
const {User} = require('../db/indexDB');

async function getUsersController(req, res) {
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);
    const users = await getAllUsers();
    const plainUsers = users.map(u => u.get({ plain: true }));

    res.render('users', { 
        title: 'Users', 
        message: 'Users Dashboard', 
        users: plainUsers, 
        currentUser,
        deleteUrlBase: '/users' });
}

function getUserProfileController(req, res) {
    const token = req.cookies['token'];
    const currentUser = getUserFromToken(token);
    if(!currentUser){
        return res.status(404).render('404', { title: 'User Not Found', message: 'User does not exist' });
    }
    console.log(currentUser.image)
    res.render('profile', { 
        title: currentUser.username, 
        message: `${currentUser.username} profile`, 
        currentUser });
}

async function postDeleteUserController(req, res) {
    const id = parseInt(req.params.id, 10);
    const user = await getUserById(id);

    if(!user) {
        return res.status(404).render('404', { title: 'User Not Found', message: 'User does not exist' });
    }   
    await user.destroy();
    res.redirect('/users');
}

async function postUploadProfilePic(req, res) {
    const token = req.cookies['token'];
    const currentUser = getUserFromToken(token);
    try {
        const userId = parseInt(req.params.id, 10); 
        const imagePath = `/uploads/profile/${req.file.filename}`;

    await User.update(
      { image: imagePath },
      { where: { id: userId } }
    );

    res.redirect(`/users/${currentUser.username}`);
  } catch (err) {
    console.error(err);
    res.status(400).send('Грешка при качването');
  }
}
    
module.exports = {
    getUsersController,
    getUserProfileController,
    postDeleteUserController,
    postUploadProfilePic,
};