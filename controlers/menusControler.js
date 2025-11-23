const {getMenus, saveMenu} = require('../services/menusServices');
const {getUserFromToken} = require('../services/utils');

function getMenusControler (req, res) {
    const menus = getMenus();
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);

    res.render('menus', { title: 'Menus', message: 'Weekly menus', menus, currentUser }); 
};

function getCreateMenu (req, res) {
    res.render('create-menu', { title: 'Create Menu', message: 'Create a menu.' })
};

function postCreateMenu (req, res) {
    const { menuTitle, days } = req.body;
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);

    saveMenu(menuTitle, days, currentUser.username);
    res.redirect('/menus');
};

function getEditMenu (req, res) {
    const { menuTitle } = req.params;
    const menus = getMenus();
    const menu = menus.find(m => m.menuTitle === menuTitle);
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);
    if (!menu) {
        return res.status(404).render('404', { title: 'Menu Not Found', message: 'The requested menu was not found.', currentUser });
    }
    res.render('edit-menu', { title: menu.menuTitle, message: menu.days, menu, currentUser });
};

function getSpecificDayMenu(req, res) {
    let { menuTitle, index  } = req.params;
    index = Number(index)
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);

    const menus = getMenus();
    const menu = menus.find(m => m.menuTitle === menuTitle);
    const day = menu.days[index];
    if (!menu) {
        return res.status(404).render('404', { title: 'Menu Not Found', message: 'The requested menu was not found.',currentUser });
    }
    if (!day) {
        return res.status(404).render('404', { title: 'Day Not Found', message: 'The requested day was not found in this menu.', currentUser });
    }
    res.render('day-menu', { title: day, currentUser });
};

function getSpecificMenu(req, res) {
    const { menuTitle } = req.params;
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);

    const menus = getMenus();
    const menu = menus.find(m => m.menuTitle === menuTitle);
    if (!menu) {
        return res.status(404).render('404', { title: 'Menu Not Found', message: 'The requested menu was not found.' });
    }
    res.render('menu', { title: menu.menuTitle, message: menu.days, menu, currentUser });
};

function postSpecificMenu(req, res) {
    const { menuTitle } = req.params;
    const menus = getMenus();
    const menu = menus.find(m => m.menuTitle === menuTitle);

    if (!menu) {
    return res.status(404).json({ message: 'Menu not found' });
    }

    menu.days = req.body.days;

    saveMenu(menu.menuTitle, menu.days);
    res.redirect(`/menus/${menuTitle}`);
}

module.exports = {
    getMenusControler,
    getCreateMenu,
    postCreateMenu,
    getEditMenu,
    getSpecificDayMenu,
    getSpecificMenu,
    postSpecificMenu
};