const express = require('express');
const isUser = require('../middleware/isUser');
const menusRouter = express.Router();
const {
    getMenusControler,
    getCreateMenu,
    postCreateMenu,
    getEditMenu,
    getSpecificDayMenu,
    getSpecificMenu,
    postSpecificMenu,
} = require('../controlers/menusControler');


menusRouter.get('/', isUser, getMenusControler);

menusRouter.get('/create-menu', isUser, getCreateMenu);

menusRouter.post('/create-menu', isUser, postCreateMenu);

menusRouter.get('/:menuTitle/edit', isUser, getEditMenu);

menusRouter.get('/:menuTitle/:index', isUser, getSpecificDayMenu)

menusRouter.get('/:menuTitle', isUser, getSpecificMenu);

menusRouter.post('/:menuTitle', isUser, postSpecificMenu);

module.exports = menusRouter;