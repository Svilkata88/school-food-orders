const { DataTypes } = require('sequelize');
const sequelize = require('./db');    

const Restaurant = sequelize.define('Restaurant', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  image: {
      type: DataTypes.STRING,   
      allowNull: true,          
      defaultValue: '/images/default-restaurant.jpg' 
    }
});


module.exports = Restaurant;
