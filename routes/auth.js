const express = require('express');
const authRouter = express.Router();
const { getLogin, postLogin, getLogout, getRegister, postRegister} = require('../controlers/authControlers');

authRouter.get('/login', getLogin);
authRouter.post('/login', postLogin)
authRouter.get('/logout', getLogout);
authRouter.get('/register', getRegister)
authRouter.post('/register', postRegister);

module.exports = authRouter;