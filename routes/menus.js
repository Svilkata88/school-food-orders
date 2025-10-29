const express = require('express');
const isUser = require('../middleware/isUser');
const {getMenus, saveMenu} = require('../services/menusServices');
const menusRouter = express.Router();


menusRouter.get('/', isUser, (req, res) => {
    const menus = getMenus();
    res.render('menus', { title: 'Menus', message: 'All menus listed.', menus });
})

menusRouter.get('/create-menu', (req, res) => {
    res.render('create-menu', { title: 'Create Menu', message: 'Create a menu.' })
})

menusRouter.post('/create-menu', (req, res) => {
    const { menuTitle, days } = req.body;

    saveMenu(menuTitle, days);
    res.redirect('/menus');
})


module.exports = menusRouter;