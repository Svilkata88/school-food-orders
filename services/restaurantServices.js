const Restaurant  = require('../db/Restaurant');
const { getUserFromToken } = require('./utils');

async function getAllRestaurants() {
  try {
    const restaurants = await Restaurant.findAll({
    });
    const plainRestaurants = restaurants.map(r => r.get());
    return plainRestaurants;  
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return undefined;
  }
}

async function createRestaurant(name, owner) {
    try {
      const newRestaurant = await Restaurant.create({ 
        name,
        ownerId: owner.id
    });
      return newRestaurant;  
    } catch (error) {
      console.error('Error creating restaurant:', error);
      return undefined;
    }
}

async function deleteRestaurant(id) {
    id = parseInt(id);
    try {
      await Restaurant.destroy(
        { where: { id }}
    )} catch (error) {
      console.error('Error deleting restaurant:', error);
    }  
};

module.exports = {
  getAllRestaurants,
  createRestaurant,
  deleteRestaurant
};