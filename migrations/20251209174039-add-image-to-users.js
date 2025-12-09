'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'image', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '/images/anonymous-4.png' 
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'image');
  }
};
