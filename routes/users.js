const express = require('express');
const isUser = require('../middleware/isUser');
const isAdmin = require('../middleware/isAdmin');
const upload = require('../middleware/upload'); 
const { 
    getUsersController, 
    getUserProfileController, 
    postDeleteUserController,
    postUploadProfilePic
 } = require('../controlers/usersControler');
const usersRouter = express.Router();

usersRouter.get('/', isUser, isAdmin, getUsersController);
usersRouter.get('/:user', isUser, getUserProfileController);
usersRouter.post('/:id/delete', isUser, isAdmin, postDeleteUserController);
usersRouter.post('/:id/upload-profile', isUser, upload.single('image'), postUploadProfilePic);

module.exports = usersRouter;