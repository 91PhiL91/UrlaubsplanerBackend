const Sequelize = require('sequelize');
const sequelize = require('./controller/dbConnector/sqlite/sqliteConnector');


const User = sequelize.define('User', {
  userID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true
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
  token: {
    type: Sequelize.STRING
  },
  teamId: {
    type: Sequelize.INTEGER,
//    references: {
//       model: 'Team',
//       key: 'teamId'
//     }
  }
},{
  tableName: "User"
});

module.exports = User;