const { getAllRestaurants, createRestaurant, deleteRestaurant, getRestaurantById } = require('../services/restaurantServices');
const { getUserFromToken, formatDate } = require('../services/utils');

async function getRestaurantsController(req, res) {
    const restaurants = await getAllRestaurants();
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);

    restaurants?.forEach(r => 
        r.createdAtFormatted = formatDate(r.createdAt)  
    );

    res.render('restaurants', { 
        title: 'Restaurants', 
        message: 'Restaurants', 
        restaurants, 
        currentUser, 
        deleteUrlBase: '/restaurants' });
}

async function getCreateRestaurantController(req, res) {
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);

    res.render('create-restaurant', { title: 'Create-restaurant', message: 'Create Restaurant', currentUser });
}

async function postCreateRestaurantController(req, res) {
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);
    const restaurantName = req.body.name;
    const newRestaurant = await createRestaurant(restaurantName, currentUser);
    const restaurants = await getAllRestaurants();

    let errorMessage = undefined;
    if (!newRestaurant) {
        errorMessage = 'Restaurant was not created! Please try again.';
    }
    
    restaurants?.forEach(r => 
        r.createdAtFormatted = formatDate(r.createdAt)  
    );

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

    await deleteRestaurant(restaurantId);
    const restaurants = await getAllRestaurants(); 
    restaurants.forEach(r => 
        r.createdAtFormatted = formatDate(r.createdAt)  
    );
    res.redirect('/restaurants');
}

async function getRestaurantProfileController(req, res) {
    const restaurantId = req.params.id; // no need to parse to int here
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);    

    let restaurant = await getRestaurantById(restaurantId);
    restaurant = restaurant?.get({ plain: true });

    if (restaurant) {
        restaurant.createdAtFormatted = formatDate(restaurant.createdAt);
    }

    res.render('restaurant-profile', { 
        title: 'Restaurant Profile', 
        restaurant, 
        currentUser 
    });
}

async function getSearchRestaurantsController(req, res) {
    const query = req.query.q || '';
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);    

    let restaurants = await getAllRestaurants(); // optimization possible here with a search query in the service layer

    if (query) {
        const lowerCaseQuery = query.toLowerCase();
        restaurants = restaurants.filter(r => r.name.toLowerCase().includes(lowerCaseQuery));
    }
    restaurants?.forEach(r => 
        r.createdAtFormatted = formatDate(r.createdAt)  
    );

    res.render('restaurants', { 
        title: 'Restaurants', 
        message: 'Restaurants',
        restaurants,
        currentUser,
        searchQuery: query
    });
}

module.exports = {
    getRestaurantsController,
    getCreateRestaurantController,
    postCreateRestaurantController,
    postDeleteRestaurantController,
    getRestaurantProfileController,
    getSearchRestaurantsController
};