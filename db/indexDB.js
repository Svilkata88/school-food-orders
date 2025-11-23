const sequelize = require('./db'); 
const User = require('./User');
const Order = require('./Order');
const Menu = require('./Menu');
const Restaurant = require('./Restaurant');

// Associations

// User ↔ Order
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// User ↔ Menu (creator)
Menu.belongsTo(User, { foreignKey: 'creatorId' });
User.hasMany(Menu, { foreignKey: 'creatorId' });

// Restaurant ↔ Order
Order.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
Restaurant.hasMany(Order, { foreignKey: 'restaurantId' });

// Order ↔ Menu (Many-to-Many)
Order.belongsToMany(Menu, { through: 'OrderMenus', foreignKey: 'orderId', otherKey: 'menuId' });
Menu.belongsToMany(Order, { through: 'OrderMenus', foreignKey: 'menuId', otherKey: 'orderId' });

module.exports = {
  sequelize,
  User,
  Order,
  Menu,
  Restaurant
};
