const express = require('express');
const isUser = require('../middleware/isUser');
const {getMenus, saveMenu} = require('../services/menusServices');
const {getUserFromToken} = require('../utils');
const menusRouter = express.Router();


menusRouter.get('/', isUser, (req, res) => {
    const menus = getMenus();
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);

    res.render('menus', { title: 'Menus', message: 'All menus listed.', menus, currentUser });
})

menusRouter.get('/create-menu', isUser, (req, res) => {
    res.render('create-menu', { title: 'Create Menu', message: 'Create a menu.' })
})

menusRouter.get('/:menuTitle', isUser, (req, res) => {
    const { menuTitle } = req.params;
    const menus = getMenus();
    const menu = menus.find(m => m.menuTitle === menuTitle);
    if (!menu) {
        return res.status(404).render('404', { title: 'Menu Not Found', message: 'The requested menu was not found.' });
    }
    res.render('menu', { title: menu.menuTitle, message: menu.days, menu });
})

menusRouter.post('/create-menu', (req, res) => {
    const { menuTitle, days } = req.body;

    saveMenu(menuTitle, days);
    res.redirect('/menus');
})


module.exports = menusRouter;