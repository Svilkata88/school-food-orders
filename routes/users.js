const express = require('express');
const isUser = require('../middleware/isUser');
const isAdmin = require('../middleware/isAdmin');
const { getUsersController, getUserProfileController } = require('../controlers/usersControler');
const usersRouter = express.Router();


usersRouter.get('/', isUser, isAdmin, getUsersController);
usersRouter.get('/:user', isUser, getUserProfileController);


module.exports = usersRouter;