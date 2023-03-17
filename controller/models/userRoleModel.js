const Sequelize = require('sequelize');
const sequelize = require('../dbConnector/sqlite/sqliteConnector');
const User = require('./userModel');
const Role = require('./roleModel');

//  User = getUserModel(sequelize, Sequelize);
//  Role = getRoleModel(sequelize, Sequelize);


const UserRole = sequelize.define('UserRole',{
     
    userRoleID: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
    },

    // userID: {
    //     type: Sequelize.STRING,
    //     allowNull: true,
    //     references: {
    //       model: getUserModel(sequelize, Sequelize),
    //       key: 'userID',
    //     },
    //   },
    //   roleID: {
    //     type: Sequelize.STRING,
    //     allowNull: true,
    //     references: {
    //       model: getRoleModel(sequelize, Sequelize),
    //       key: 'roleID',

    //     }



   
    userID: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
            // This is a reference to another model
            model: "User",

            // This is the column name of the referenced model
            key: 'userID',
        }

    },
    roleID: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
            // This is a reference to another model
            model: "Role",

            // This is the column name of the referenced model
            key: "roleID",
        }
    
    },      

tableName:"UserRole"
});

// UserRole.hasOne(Role, {foreignKey: 'roleID', as: "Role"});
// UserRole.hasOne(User, {foreignKey: 'userID', as: "User" });

// UserRole.belongsTo(Role, {as: 'Role', foreignKey: 'roleID'});
// UserRole.belongsTo(User, {as: 'User', foreignKey: 'userID'});




// UserRole.belongsTo(User, { foreignKey: 'userID' });
// User.hasMany(UserRole, { foreignKey: 'userID' });

// UserRole.belongsTo(Role, { foreignKey: 'roleID' });
// Role.hasMany(UserRole, { foreignKey: 'roleID' });



module.exports = UserRole;