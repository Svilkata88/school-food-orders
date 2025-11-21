const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Restaurant = require('./Restaurant');
const Menu = require('./Menu');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  total: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending'  
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

Order.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });

Order.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
Restaurant.hasMany(Order, { foreignKey: 'restaurantId' });

Order.belongsToMany(Menu, { through: 'OrderMenus', foreignKey: 'orderId', otherKey: 'menuId' });
Menu.belongsToMany(Order, { through: 'OrderMenus', foreignKey: 'menuId', otherKey: 'orderId' });

module.exports = Order;
