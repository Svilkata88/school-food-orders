
const { DataTypes } = require('sequelize');
const sequelize = require('./db'); 
const User = require('./User');      

const Menu = sequelize.define('Menu', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
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

Menu.belongsTo(User, { foreignKey: 'creatorId' });
User.hasMany(Menu, { foreignKey: 'creatorId' });

module.exports = Menu;
