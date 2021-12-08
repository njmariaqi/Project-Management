const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserProject extends Model {}

UserProject.init(
     {
          id: {
               type: DataTypes.INTEGER,
               primaryKey: true,
               autoIncrement: true,
               allowNull: false
          },
          project_id: {
               type: DataTypes.INTEGER,
               references: {
                    model: 'project',
                    key: 'id'
               }, 
               onDelete: 'cascade'
          },
          user_id: {
               type: DataTypes.INTEGER,
               references: {
                    model: 'user',
                    key: 'id'
               },
               onDelete: 'cascade' 
          }
     },
     {
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: 'user_project'
     }
);

module.exports = UserProject;