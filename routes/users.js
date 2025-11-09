const express = require('express');
const isUser = require('../middleware/isUser');
const isAdmin = require('../middleware/isAdmin');
const {getUsers} = require('../services/userServices');
const { getUserFromToken } = require('../services/utils');
const usersRouter = express.Router();


usersRouter.get('/', isUser, isAdmin, (req, res) => {
    const users = getUsers();
    res.render('users', { title: 'Users', message: 'Users Dashboard', users });
})

usersRouter.get('/:user', isUser, (req, res) => {
    console.log(req.params.user);
    const token = req.cookies['token'];
    const currentUser = getUserFromToken(token);
    if(!currentUser){
        return res.status(404).render('404', { title: 'User Not Found', message: 'User does not exist' });
    }
    res.render('profile', { title: currentUser.username, message: `${currentUser.username} profile`, currentUser });
})


module.exports = usersRouter;