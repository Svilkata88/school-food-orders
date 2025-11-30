const { getAllRestaurants, createRestaurant, deleteRestaurant } = require('../services/restaurantServices');
const { getUserFromToken, formatDate } = require('../services/utils');

async function getRestaurantsController(req, res) {
    const restaurants = await getAllRestaurants();
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);

    restaurants.forEach(r => 
        r.createdAtFormatted = formatDate(r.createdAt)  
    );

    res.render('restaurants', { title: 'Restaurants', message: 'Restaurants', restaurants, currentUser });
}

async function getCreateRestaurantController(req, res) {
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);

    res.render('create-restaurant', { title: 'Create-restaurant', message: 'Create Restaurant', currentUser });
}

async function postCreateRestaurantController(req, res) {
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);
    console.log(currentUser)
    const restaurantName = req.body.name;
    const newRestaurant = await createRestaurant(restaurantName, currentUser);
    const restaurants = await getAllRestaurants();

    const errorMessage = null;
    if (!newRestaurant) {
        const error = 'Restaurant was not created! Please try again.';
    }
        
    res.render(
        'restaurants', 
        { 
            title: 'Create-restaurant', 
            message: 'Restaurant',
            restaurants, 
            currentUser,
            error: errorMessage,
        });
}

async function postDeleteRestaurantController(req, res) {
    const restaurantId = req.params.id;
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);    

    await deleteRestaurant(restaurantId);
    const restaurants = await getAllRestaurants(); 
    restaurants.forEach(r => 
        r.createdAtFormatted = formatDate(r.createdAt)  
    );
    res.redirect('/restaurants');
    // res.render('restaurants', { title: 'Restaurants', message: 'Restaurants', restaurants, currentUser });
}


module.exports = {
    getRestaurantsController,
    getCreateRestaurantController,
    postCreateRestaurantController,
    postDeleteRestaurantController
};