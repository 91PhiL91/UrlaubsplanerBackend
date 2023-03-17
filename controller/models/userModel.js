const Sequelize = require('sequelize');
const sequelize = require('../dbConnector/sqlite/sqliteConnector');
const UserRole = require('./userRoleModel');


const User = sequelize.define('User', {
  userID: {
    type: Sequelize.STRING,
    primaryKey: true,
    unique: true,
    
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.STRING
  },
  totalVacation: {
    type: Sequelize.INTEGER
  },
  restVacation: {
    type: Sequelize.STRING
  },
  plannedVacation: {
    type: Sequelize.INTEGER
  },
  takedVacation: {
    type: Sequelize.INTEGER
  },
  note: {
    type: Sequelize.STRING
  },
 
  teamID: {
    type: Sequelize.STRING,
   references: {
      model: 'Team',
      key: 'teamID'
    }
  }
},{
  tableName: "User"
});

User.hasMany(UserRole, {foreignKey: "userID", as: "User"});

module.exports = User;