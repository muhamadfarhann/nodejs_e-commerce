// Mengimport class sequelize
const Sequelize = require('sequelize');

// Database Driver MySQL
const sequelize = new Sequelize('e-commerce','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;