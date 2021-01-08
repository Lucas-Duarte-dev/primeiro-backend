const Sequelize = require('sequelize');
const dbConfig = require('../config/database')
const User = require('../models/User');
const Finances = require('../models/Finances');


const connection = new Sequelize(dbConfig);

User.init(connection)
Finances.init(connection)

User.associate(connection.models);
Finances.associate(connection.models);


module.exports = connection;