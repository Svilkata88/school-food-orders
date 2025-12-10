const { Restaurant, User } = require('../db/indexDB'); 
const { formatDate } = require('../services/utils');

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
};

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
};

async function editRestaurant(id, newName, imagePath) {
  id = parseInt(id, 10);

  try {
    const [updatedCount] = await Restaurant.update(
      {
        name: newName,
        image: imagePath
      },
      {where: { id }}
    );

    if (updatedCount === 0) {
      return null;
    }

    const updatedRestaurant = await Restaurant.findByPk(id);
    return updatedRestaurant;

  } catch (error) {
    console.error('Error updating restaurant:', error);
    return undefined;
  }
};  

async function deleteRestaurant(id) {
    id = parseInt(id);
    try {
      await Restaurant.destroy(
        { where: { id }}
    )} catch (error) {
      console.error('Error deleting restaurant:', error);
    }  
};

async function getRestaurantById(id) {
    id = parseInt(id);  
    try {
      const restaurant = await Restaurant.findOne(
        { where: { id }}
    );
      return restaurant;
    } catch (error) {
      console.error('Error fetching restaurant by ID:', error);
      return null;
    }
};    

async function getLikedRestaurants(userID) {
  userID = parseInt(userID);
  try {
    const restaurants = await Restaurant.findAll({
      include: [
        {
          model: User,
          as: 'likedBy',   
          through: { attributes: [] }, 
          where: { id: userID },      
          required: true
        }
      ]
    });

    return restaurants;  
  }
  catch (err) {
    console.log('Error: ', err)
  }
}

async function likeUnlike(restaurantId, userId) {
  restaurantId = parseInt(restaurantId);
  userId = parseInt(userId);

  const restaurant = await Restaurant.findByPk(restaurantId);
  if (!restaurant) {
    return null;
  }

  const user = await User.findByPk(userId);
  if (!user) {
    return null;
  }

  const isLiked = await restaurant.hasLikedBy(user);

  if (isLiked) {
    // ✅ UNLIKE
    await restaurant.removeLikedBy(user);
    return false;
  } else {
    // ✅ LIKE
    await restaurant.addLikedBy(user);
    return true;
  }
}

  
module.exports = {
  getAllRestaurants,
  createRestaurant,
  editRestaurant,
  deleteRestaurant,
  getRestaurantById,
  getLikedRestaurants,
  likeUnlike,
};