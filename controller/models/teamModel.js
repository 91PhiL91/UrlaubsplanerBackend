const Sequelize = require('sequelize');
const sequelize = require('../dbConnector/sqlite/sqliteConnector');


const Team = sequelize.define('Team', {
    teamId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    teamLeaderID: {
      type: Sequelize.INTEGER
    },
    teamName: {
      type: Sequelize.STRING
    }
  },{
    tableName: "Team"
  });
  
  module.exports = Team;