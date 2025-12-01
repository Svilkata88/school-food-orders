'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Restaurants', {
      fields: ['name'],
      type: 'unique',
      name: 'unique_restaurant_name_constraint'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Restaurants',
      'unique_restaurant_name_constraint'
    );
  }
};
