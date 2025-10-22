const express = require('express');
const router = express.Router();
const becrypt = require('bcryptjs');
const SOLT = 10;
const saveUser = require('../services/userServices');


router.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Login Page', message: 'Please log in to continue.' });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // do it better! Can be improved with proper validation and authentication

    res.render('auth/login', { title: 'Login Page', message: 'Please log in to continue.' });
});

router.get('/register', (req, res) => {
    res.render('auth/register', { title: 'Register Page', message: 'Create a new account.' });
})

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log('username:', username);
     console.log('password:', password);
    
    if(!username || !password) {
        return res.render('auth/login', { 
            title: 'Login Page', 
            message: 'Please log in to continue.' , 
            error: 'Please enter both username and password.' });  
    }

    const hashedPass = await becrypt.hash(password, SOLT);
    saveUser(username, hashedPass);

    res.render('auth/login', { title: 'Login Page', message: 'Please log in to continue.' });
    
});

module.exports = router;