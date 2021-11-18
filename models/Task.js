const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Task extends Model {}

Task.init(
     {
          id: {
               type: DataTypes.INTEGER,
               primaryKey: true,
               autoIncrement: true,
               allowNull: false
          },
          name: {
               type: DataTypes.STRING,
               allowNull: false,
               unique: true
          },
          project_id: {
               type: DataTypes.INTEGER,
               references: {
                    model: 'project',
                    key: 'id'
               } 
          },
          user_id: {
               type: DataTypes.INTEGER,
               references: {
                    model: 'user',
                    key: 'id'
               } 
          },
          due_date: {
               type: DataTypes.STRING
          },
          status: {
               type: DataTypes.STRING
          }
     },
     {
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: 'task'
     }
);

module.exports = Task;