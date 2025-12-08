const { 
    getAllRestaurants, 
    createRestaurant, 
    deleteRestaurant, 
    getRestaurantById,
    editRestaurant,
    getLikedRestaurants,
    likeUnlike,
} = require('../services/restaurantServices');
const { getUserFromToken, formatDate } = require('../services/utils');

async function getRestaurantsController(req, res) {
    const restaurants = await getAllRestaurants();
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);

    let likedIds = [];
    if (currentUser) {
        const likedRestaurants = await getLikedRestaurants(currentUser.id);
        likedIds = likedRestaurants.map(r => r.id);
    }

    const finalRestaurants = restaurants.map(r => ({
        ...r,
        isLiked: likedIds.includes(r.id),
        createdAtFormatted: formatDate(r.createdAt)
    }));

    res.render('restaurants', { 
        title: 'Restaurants', 
        message: 'Restaurants', 
        restaurants: finalRestaurants, 
        currentUser, 
        UrlBase: '/restaurants' });
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

    let likedIds = [];
    if (currentUser) {
        const likedRestaurants = await getLikedRestaurants(currentUser.id);
        likedIds = likedRestaurants.map(r => r.id);
    }

    let finalRestaurants = restaurants.map(r => ({
        ...r,
        isLiked: likedIds.includes(r.id),
        createdAtFormatted: formatDate(r.createdAt)
    }));

    if (query) {
        const lowerCaseQuery = query.toLowerCase();
        finalRestaurants = finalRestaurants.filter(r => r.name.toLowerCase().includes(lowerCaseQuery));
    }

    res.render('restaurants', { 
        title: 'Restaurants', 
        message: 'Restaurants',
        restaurants: finalRestaurants,
        currentUser,
        searchQuery: query
    });
}

async function getEditRestaurantController(req, res) {
    const restaurantId = req.params.id; // no need to parse to int here
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);    

    let restaurant = await getRestaurantById(restaurantId);
    restaurant = restaurant?.get({ plain: true });

    if (restaurant) {
        restaurant.createdAtFormatted = formatDate(restaurant.createdAt);
    }

    res.render('create-restaurant', { 
        title: 'Restaurant Profile', 
        restaurant, 
        currentUser,
    });
}

async function postEditRestaurantController(req, res) {
    const restaurantId = req.params.id; // no need to parse to int here
    const newName = req.body.name;
    const updatedRestaurant = await editRestaurant(restaurantId, newName);

    if (updatedRestaurant) {
        updatedRestaurant.createdAtFormatted = formatDate(updatedRestaurant.createdAt);
    }

    res.redirect('/restaurants');
}

async function postLikeRestaurantController(req, res) {
    const restaurantId = req.params.id;
    const token = req.cookies?.token;
    const currentUser = getUserFromToken(token);  
    const liked = await likeUnlike(restaurantId, currentUser.id)

    return res.json({ liked: liked });
}

module.exports = {
    getRestaurantsController,
    getCreateRestaurantController,
    postCreateRestaurantController,
    postDeleteRestaurantController,
    getRestaurantProfileController,
    getSearchRestaurantsController,
    getEditRestaurantController,
    postEditRestaurantController,
    postLikeRestaurantController,
};