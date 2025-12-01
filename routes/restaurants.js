const express = require('express');
const isUser = require('../middleware/isUser');
const { 
    getRestaurantsController, 
    getCreateRestaurantController, 
    postCreateRestaurantController, 
    postDeleteRestaurantController,
    getRestaurantProfileController,
} = require('../controlers/restaurantsControlers');
const restaurantRouter = express.Router();


restaurantRouter.get('/', isUser, getRestaurantsController);
restaurantRouter.get('/create', isUser, getCreateRestaurantController);
restaurantRouter.post('/create', isUser, postCreateRestaurantController);
restaurantRouter.post('/:id/delete', isUser, postDeleteRestaurantController);
restaurantRouter.get('/:id', isUser, getRestaurantProfileController);


module.exports = restaurantRouter;