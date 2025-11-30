const express = require('express');
const isUser = require('../middleware/isUser');
const { 
    getRestaurantsController, 
    getCreateRestaurantController, 
    postCreateRestaurantController, 
    postDeleteRestaurantController,
} = require('../controlers/restaurantsControlers');
const restaurantRouter = express.Router();


restaurantRouter.get('/', isUser, getRestaurantsController);
restaurantRouter.get('/create', isUser, getCreateRestaurantController);
restaurantRouter.post('/create', isUser, postCreateRestaurantController);
restaurantRouter.post('/:id/delete', isUser, postDeleteRestaurantController);


module.exports = restaurantRouter;