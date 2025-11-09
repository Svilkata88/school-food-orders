const express = require('express');
const app = express();
const { create } = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const {getUsers} = require('./services/userServices');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const menusRouter = require('./routes/menus');
const {getUserFromToken} = require('./services/utils');


const hbs = create({
  extname: 'hbs',
  defaultLayout: 'main', 
  layoutsDir: path.join(__dirname, 'templates', 'layouts'),
  partialsDir: path.join(__dirname, 'templates', 'partials'),
  helpers: {
    eq: (a, b) => a === b
  }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'templates'));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('public'));

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/menus', menusRouter);

app.get('/', (req, res) => {
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);
    const users = getUsers();
    
    res.render('home', { 
        title: 'Home Page', 
        message: `Welcome to the Home Page ${currentUser ? currentUser.username : 'Anonymous User'}!`, 
        users,
        currentUser
       });
});



app.listen(Number(process.env.PORT), () => {
  console.log(`Server is running on http://localhost:${Number(process.env.PORT)}`);
});

