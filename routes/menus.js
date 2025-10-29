const express = require('express');
const isUser = require('../middleware/isUser');
const {getMenus} = require('../services/menusServices');
const {getUserFromToken} = require('../utils');
const menusRouter = express.Router();


menusRouter.get('/', isUser, (req, res) => {
    const menus = getMenus();
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);

    res.render('menus', { title: 'Menus', message: 'All menus listed.', menus, currentUser });
})

menusRouter.get('/:name', isUser, (req, res) => {
    const { name } = req.params;
    const menus = getMenus();
    const menu = menus.find(m => m.name === name);
    if (!menu) {
        return res.status(404).render('404', { title: 'Menu Not Found', message: 'The requested menu was not found.' });
    }
    res.render('menu', { title: menu.name, message: menu.description, menu });
})


module.exports = menusRouter;