const User = require('./User');
const Comment = require('./Comment');
const Project = require('./Project');
const Task = require('./Task');
const UserProject = require('./UserProject');
const { belongsTo } = require('./Project');

Comment.belongsTo(User, {
     foreignKey: 'user_id'
})
User.hasMany(Comment, {
     foreignKey: 'user_id'
})

Comment.belongsTo(Task, {
     foreignKey: 'task_id'
})
Task.hasMany(Comment, {
     foreignKey: 'task_id'
})

Task.belongsTo(User,  {
     foreignKey: 'user_id'
})
User.hasMany(Task, {
     foreignKey: 'user_id'
})

Task.belongsTo(Project,  {
     foreignKey: 'project_id'
})
Project.hasMany(Task, {
     foreignKey: 'project_id'
})

Project.belongsTo(User,  {
          foreignKey: 'manager_id'
})
User.hasMany(Project, {
     foreignKey: 'manager_id'
})

Project.belongsToMany(User, {
     through: UserProject,
     foreignKey: 'project_id'
})
User.belongsToMany(Project, {
     through: UserProject,
     foreignKey: 'user_id'
})

module.exports = {
     User,
     Comment,
     Project,
     Task,
     UserProject
};