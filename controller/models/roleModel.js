const Sequelize = require('sequelize');
const sequelize = require('../dbConnector/sqlite/sqliteConnector');



const Role = sequelize.define('Role',{

    roleID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
    },

    role: {
        type: Sequelize.STRING
    },

},{
tableName:"Role"
});
module.exports = Role;