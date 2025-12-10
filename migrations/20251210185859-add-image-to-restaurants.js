'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Restaurants', 'image', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '/images/default-restaurant.jpg'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Restaurants', 'image');
  }
};
