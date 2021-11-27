const router = require('express').Router();
const {User, Project, Task, Comment, UserProject} = require('../models/index');
const { Op, DataTypes } = require('sequelize');
const session = require('express-session');

router.get('/', async (req, res) => {
      if (!req.session.loggedIn) {
            res.redirect('/');
      } else {
      try {
            const managerData = await User.findAll({
                  attributes: ['name']
            })
            const managers = managerData.map(x => x.get({plain: true}));
            const projectIdData = await UserProject.findAll({
                  where: {user_id: req.session.userId},
                  attributes: [['project_id', 'id']]
            })
            const projectId = projectIdData.map((d) => d.get({plain: true}));
            const projectData = await Project.findAll({
                  where: {
                        [Op.or]: projectId
                  },
                  include: [{
                        model: User
                  }]
            })
            const projects = projectData.map((d) => d.get({plain: true}));
            const taskData = await Task.findAll({
                  where: {user_id: req.session.userId}
            })
            const tasks = taskData.map((d) => d.get({plain: true}));
            const userData = {
                  name: req.session.userName,
                  projectNo: projects.length,
                  taskNo: tasks.length
            }
            res.render('project', {projects, userData, managers,loggedIn: req.session.loggedIn });
      } catch (err) {
            res.status(500).json(err);
      }
      }
      }
);

router.post('/new', async(req, res) => {
      if (!req.session.loggedIn) {
      res.redirect('/');
      } else {
      try{ 
            let newMgrIdInfo = await User.findOne({
                  where: {name: req.body.mgrName}
            });
            let newMgrId = newMgrIdInfo.get({plain: true});
            let newP = await Project.create({
                  name: req.body.name,
                  due: req.body.due,
                  manager_id: newMgrId.id
            })
            await UserProject.create({
                  project_id: newP.get({plain:true}).id,
                  user_id:req.session.userId
            })
            req.session.save(() => {
                  req.session.loggedIn = true;
            });
            res.status(200).json({message: 'add project success'});
      }catch (err) {
                  res.status(500).json(err);
            }
      }
})

router.delete('/', async (req, res) => {
      if (!req.session.loggedIn) {
            res.redirect('/');
      } else {
            try{
                  console.log('\x1b[36m%s\x1b[0m', req.body, 'here is delete');
                  await Project.destroy({
                  where: {id: req.body.no}
                  })
                  res.status(200).json({message: 'delete succeed'})
            }catch (err) {
                  res.status(500).json(err);
                  }  
      }
})

module.exports = router;