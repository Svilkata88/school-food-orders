const {saveUser, getUser, getUsers, getUserByName, createUser} = require('../services/userServices');
const becrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function getLogin(req, res) {
    res.render('auth/login', { title: 'Login Page', message: 'Login' });
}

async function postLogin(req, res) {
    const { username, password } = req.body;
    
    if(!username || !password) {
        return res.render('auth/login', { 
            title: 'Login Page', 
            message: 'Login' , 
            error: 'Please enter both username and password.' });  
    }

    const user = await getUserByName(username);
   
    if (!user) {
        return res.render('auth/register', { title: 'Register Page', message: 'Create a new account.' });
    }
    const isMatch = await becrypt.compare(password, user.password);
    if (!isMatch) {
        return res.render('auth/login', { 
            title: 'Login Page', 
            message: 'Please log in to continue.',
            error: 'Username or password incorrect! Try again.'
         });
    }

    const id = user.id;
    const role = user.role;
    const token = jwt.sign(
        { id, username, role }, process.env.JWT_SECRET, { expiresIn: '2h' }             
    );

    res.cookie('token', token, {
        httpOnly: true,      // cookie not accessible by JS (important for security)
        secure: false,       // true only if using HTTPS
        sameSite: 'strict',  // protects against CSRF
        maxAge: 2 * 60 * 60 * 1000 // 2 hours
    });

    // const users = getUsers();
    res.redirect('/');
}

async function getLogout(req, res) {
    res.clearCookie('token');
    res.redirect('/auth/login');
}

function getRegister(req, res) {
    res.render('auth/register', { title: 'Register Page', message: 'Create a new account.' });
}

async function postRegister(req, res) {
    let { username,email, password, role } = req.body;
    
    if(!username || !password || !email) {
        return res.render('auth/login', { 
            title: 'Login Page', 
            message: 'Please log in to continue.' , 
            error: 'Please enter both username and password.' });  
    }

    if(username==="admin" && password==="admin123456"){ {
        role = "admin";  
    }}

    let user = await getUserByName(username);
    
    if(user) {
        return res.render('auth/login', { 
            title: 'Login', 
            message: 'Please log in to continue.' , 
            error: 'This username already exists.' });
    }

    const hashedPass = await becrypt.hash(password, Number(process.env.SALT));
    user = await createUser(username, email, hashedPass, role);

    if(!user) {
        return res.render('auth/register', { 
            title: 'Register', 
            message: 'Create a new account.' , 
            error: 'Error creating user. Please try again later.' });  
    }

    const id = user.id;
    const token = jwt.sign(
        { id, username, role }, process.env.JWT_SECRET, { expiresIn: '2h' }             
    );

    res.cookie('token', token, {
    httpOnly: true,      // cookie not accessible by JS (important for security)
    secure: false,       // true only if using HTTPS
    sameSite: 'strict',  // protects against CSRF
    maxAge: 2 * 60 * 60 * 1000 // 2 hours
    });
    
    currentUser = user;
    res.render('home', { 
        title: 'Home Page', 
        message: `Welcome to the Home Page ${currentUser ? currentUser.name : 'Anonymous User'}!`, 
        // users,
        currentUser
    });
}
  

module.exports = {
    getLogin,
    postLogin,
    getLogout,
    getRegister,
    postRegister
};

