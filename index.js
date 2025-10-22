const express = require('express');
const app = express();
const PORT = 3000;
const { create } = require('express-handlebars');
const path = require('path');
const {getUsers} = require('./services/userServices');



const hbs = create({
  extname: 'hbs',
  defaultLayout: false,
  partialsDir: path.join(__dirname, 'templates', 'partials')
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'templates'));

app.use(express.urlencoded({ extended: true }));
app.use('/auth', require('./routes/auth'));

app.get('/', (req, res) => {
    const users = getUsers();
    res.render('home', { 
        title: 'Home Page', 
        message: 'Welcome to the Home Page!', 
        users });
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

