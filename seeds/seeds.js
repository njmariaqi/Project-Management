const sequelize = require('../config/connection');
const {User, Project, Task, Comment, UserProject} = require('../models/index');

const userData = require('./userData.json');
const projectData = require('./projectData.json');
const taskData = require('./taskData.json');
const commentData = require('./commentData.json')
const UserProjectData = require('./userProjectData.json')

const seedDatabase = async () => {
     await sequelize.sync({force: true});
     await User.bulkCreate(userData, {
          individualHooks: true,
          returning: true
     });
     await Project.bulkCreate(projectData, {
          individualHooks: true,
          returning: true
     });
     await Task.bulkCreate(taskData, {
          individualHooks: true,
          returning: true
     });
     await Comment.bulkCreate(commentData, {
          individualHooks: true,
          returning: true
     });
     await UserProject.bulkCreate(UserProjectData, {
          individualHooks: true,
          returning: true
     })
     process.exit(0);
}

seedDatabase();