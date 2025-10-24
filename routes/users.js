const express = require('express');
const isUser = require('../middleware/isUser');
const isAdmin = require('../middleware/isAdmin');
const {getUsers} = require('../services/userServices');
const usersRouter = express.Router();


usersRouter.get('/', isUser, isAdmin, (req, res) => {
    const users = getUsers();
    res.render('users', { title: 'Users', message: 'All users listed.', users });
})


module.exports = usersRouter;