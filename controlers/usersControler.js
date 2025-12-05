const {getAllUsers, getUserById} = require('../services/userServices');
const { getUserFromToken } = require('../services/utils');

async function getUsersController(req, res) {
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);
    const users = await getAllUsers();
    const plainUsers = users.map(u => u.get({ plain: true }));
    
    res.render('users', { 
        title: 'Users', 
        message: 'Users Dashboard', 
        users: plainUsers, 
        currentUser,
        deleteUrlBase: '/users' });
}

function getUserProfileController(req, res) {
    const token = req.cookies['token'];
    const currentUser = getUserFromToken(token);
    if(!currentUser){
        return res.status(404).render('404', { title: 'User Not Found', message: 'User does not exist' });
    }
    
    res.render('profile', { 
        title: currentUser.username, 
        message: `${currentUser.username} profile`, 
        currentUser });
}

async function postDeleteUserController(req, res) {
    const id = parseInt(req.params.id, 10);
    const user = await getUserById(id);

    if(!user) {
        return res.status(404).render('404', { title: 'User Not Found', message: 'User does not exist' });
    }   
    await user.destroy();
    res.redirect('/users');
}
    
module.exports = {
    getUsersController,
    getUserProfileController,
    postDeleteUserController,
};