const express = require('express');
const isUser = require('../middleware/isUser');
const isAdmin = require('../middleware/isAdmin');
const { getUsersController, getUserProfileController, postDeleteUserController } = require('../controlers/usersControler');
const usersRouter = express.Router();


usersRouter.get('/', isUser, isAdmin, getUsersController);
usersRouter.get('/:user', isUser, getUserProfileController);
usersRouter.post('/:id/delete', isUser, isAdmin, postDeleteUserController);


module.exports = usersRouter;