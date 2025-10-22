const express = require('express');
const authRouter = express.Router();
const becrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {saveUser, getUser, getUsers} = require('../services/userServices');


authRouter.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Login Page', message: 'Please log in to continue.' });
});

authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    if(!username || !password) {
        return res.render('auth/login', { 
            title: 'Login Page', 
            message: 'Please log in to continue.' , 
            error: 'Please enter both username and password.' });  
    }

    const user = getUser(username); // return user if exists in DB
    if (!user) {
        res.render('auth/register', { title: 'Register Page', message: 'Create a new account.' });
    }
    const isMatch = await becrypt.compare(password, user.password);
    if (!isMatch) {
        res.render('auth/login', { 
            title: 'Login Page', 
            message: 'Please log in to continue.',
            error: 'Username or password incorrect! Try again.'
         });
    }

    const token = jwt.sign(
        { username }, process.env.JWT_SECRET, { expiresIn: '2h' }             
    );

    res.cookie('token', token, {
        httpOnly: true,      // cookie not accessible by JS (important for security)
        secure: false,       // true only if using HTTPS
        sameSite: 'strict',  // protects against CSRF
        maxAge: 2 * 60 * 60 * 1000 // 2 hours
    });

    const users = getUsers();
    res.render('users', { title: 'Users', message: 'All users listed.', users });
});

authRouter.get('/register', (req, res) => {
    res.render('auth/register', { title: 'Register Page', message: 'Create a new account.' });
})

authRouter.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    if(!username || !password) {
        return res.render('auth/login', { 
            title: 'Login Page', 
            message: 'Please log in to continue.' , 
            error: 'Please enter both username and password.' });  
    }
    const user = getUser(username);
    if(user) {
        return res.render('auth/login', { 
            title: 'Login Page', 
            message: 'Please log in to continue.' , 
            error: 'This username already exists.' });
    }

    const hashedPass = await becrypt.hash(password, Number(process.env.SALT));
    saveUser(username, hashedPass);

    const token = jwt.sign(
        { username }, process.env.JWT_SECRET, { expiresIn: '2h' }             
    );

    res.cookie('token', token, {
    httpOnly: true,      // cookie not accessible by JS (important for security)
    secure: false,       // true only if using HTTPS
    sameSite: 'strict',  // protects against CSRF
    maxAge: 2 * 60 * 60 * 1000 // 2 hours
  });

    res.render('auth/login', { title: 'Login Page', message: 'Please log in to continue.' });
    
});

module.exports = authRouter;