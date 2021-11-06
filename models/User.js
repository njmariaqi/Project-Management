const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {}

User.init(
     {
          id: {
               type: DataTypes.INTEGER,
               primaryKey: true,
               autoIncrement: true,
               allowNull: false
          },
          email: {
               type: DataTypes.STRING,
               allowNull: false,
               unique: true,
               validate: {
                    isEmail: true
               }
          },
          password: {
               type: DataTypes.STRING,
               allowNull: false,
               validate: {
                    length: [8],
               }
          }
     },
     {
          hooks: {
               beforeCreate: async (newUser) => {
                    newUser.password = await bcrypt.hash(newUser.password, 10);
                    return newUser;
               },
               beforeUpdate: async (updateUser) => {
                    if (updateUser.password) {
                         updateUser.password = await bcrypt.hash(updateUser.password, 10)
                    }
                    return updateUser;
               } 
          },
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: 'user'
     }
);

module.exports = User;