const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
     {
          id: {
               type: DataTypes.INTEGER,
               primaryKey: true,
               autoIncrement: true,
               allowNull: false
          },
          description: {
               type: DataTypes.STRING,
               allowNull: false
          },
          // user_id: {
          //      type: DataTypes.INTEGER,
          //      allowNull: false,
          //      references: {
          //           model: 'user',
          //           key: 'id'
          //      } 
          // },
          task_id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               references: {
                    model: 'task',
                    key: 'id'
               } 
          }
     },
     {
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: 'comment'
     }
);

module.exports = Comment;