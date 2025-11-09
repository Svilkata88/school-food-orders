const express = require('express');
const isUser = require('../middleware/isUser');
const {getMenus, saveMenu} = require('../services/menusServices');
const {getUserFromToken} = require('../services/utils');
const menusRouter = express.Router();


menusRouter.get('/', isUser, (req, res) => {
    const menus = getMenus();
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);

    res.render('menus', { title: 'Menus', message: 'Weekly menus.', menus, currentUser });
})

menusRouter.get('/create-menu', isUser, (req, res) => {
    res.render('create-menu', { title: 'Create Menu', message: 'Create a menu.' })
})

menusRouter.post('/create-menu', isUser, (req, res) => {
    const { menuTitle, days } = req.body;
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);

    saveMenu(menuTitle, days, currentUser.username);
    res.redirect('/menus');
})


menusRouter.get('/:menuTitle/:index', isUser, (req, res) => {
    let { menuTitle, index  } = req.params;
    index = Number(index)
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);

    const menus = getMenus();
    const menu = menus.find(m => m.menuTitle === menuTitle);
    const day = menu.days[index];
    if (!menu) {
        return res.status(404).render('404', { title: 'Menu Not Found', message: 'The requested menu was not found.' });
    }
    if (!day) {
        return res.status(404).render('404', { title: 'Day Not Found', message: 'The requested day was not found in this menu.' });
    }
    res.render('day-menu', { title: day, currentUser });
})

menusRouter.get('/:menuTitle', isUser, (req, res) => {
    const { menuTitle } = req.params;
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);

    const menus = getMenus();
    const menu = menus.find(m => m.menuTitle === menuTitle);
    if (!menu) {
        return res.status(404).render('404', { title: 'Menu Not Found', message: 'The requested menu was not found.' });
    }
    res.render('menu', { title: menu.menuTitle, message: menu.days, menu, currentUser });
})


menusRouter.get('/:menuTitle/edit', isUser, (req, res) => {
    const { menuTitle } = req.params;
    const menus = getMenus();
    const menu = menus.find(m => m.menuTitle === menuTitle);
    if (!menu) {
        return res.status(404).render('404', { title: 'Menu Not Found', message: 'The requested menu was not found.' });
    }
    res.render('edit-menu', { title: menu.menuTitle, message: menu.days, menu });
})

menusRouter.post('/:menuTitle', isUser, (req, res) => {
  const { menuTitle } = req.params;
  const menus = getMenus();
  const menu = menus.find(m => m.menuTitle === menuTitle);

  if (!menu) {
    return res.status(404).json({ message: 'Menu not found' });
  }

  // Update fields
  menu.days = req.body.days;
  // ...save changes...
  
  saveMenu(menu.menuTitle, menu.days);
  res.redirect(`/menus/${menuTitle}`);
});




module.exports = menusRouter;