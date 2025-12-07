const { Sequelize } = require('sequelize');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  {
    host: config[env].host,
    dialect: config[env].dialect,
    logging: false,
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✔ ✔ ✔ Database connection has been established successfully.');
  } catch (err) {
    console.error('❌ Unable to connect to the database:', err.message);
    setTimeout(testConnection, 5000); 
  }
}

testConnection();

module.exports = sequelize;
