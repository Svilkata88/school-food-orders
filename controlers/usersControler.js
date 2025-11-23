const {getAllUsers} = require('../services/userServices');
const { getUserFromToken } = require('../services/utils');

async function getUsersController(req, res) {
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);
    const users = await getAllUsers();
    const plainUsers = users.map(u => u.get({ plain: true }));
    
    res.render('users', { title: 'Users', message: 'Users Dashboard', users: plainUsers, currentUser });
}

function getUserProfileController(req, res) {
    const token = req.cookies['token'];
    const currentUser = getUserFromToken(token);
    if(!currentUser){
        return res.status(404).render('404', { title: 'User Not Found', message: 'User does not exist' });
    }
    res.render('profile', { title: currentUser.username, message: `${currentUser.username} profile`, currentUser });
}
    
module.exports = {
    getUsersController,
    getUserProfileController,
};