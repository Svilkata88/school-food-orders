module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('restLikes', {
      UserId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false
      },
      RestaurantId: {
        type: Sequelize.INTEGER,
        references: { model: 'Restaurants', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false
      },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
    });

    await queryInterface.addConstraint('restLikes', {
      type: 'unique',
      fields: ['UserId', 'RestaurantId'],
      name: 'unique_user_restaurant_like'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('restLikes');
  }
};
