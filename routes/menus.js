const express = require('express');
const isUser = require('../middleware/isUser');
const {getMenus} = require('../services/menusServices');
const menusRouter = express.Router();


menusRouter.get('/', isUser, (req, res) => {
    const menus = getMenus();
    console.log(menus);
    res.render('menus', { title: 'Menus', message: 'All menus listed.', menus });
})


module.exports = menusRouter;