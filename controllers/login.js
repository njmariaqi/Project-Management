const router = require('express').Router();
//const path = require('path');
const bcrypt = require('bcrypt');
const {User, Project, Task, Comment, UserProject} = require('../models/index');
const { Op, DataTypes } = require('sequelize');
const session = require('express-session');

router.post('/', async (req, res) => {
     try {
          const userData = await User.findOne({
               where: {email: req.body.email}
          })
          if (!userData) {
               console.log('no user exist')
               res.status(404).json({message: 'Login Failed.'})
               return;
          }
          const validPass = await bcrypt.compare(
               req.body.password,
               userData.password
          );
          if (!validPass) {
               console.log('wrong pass')
               res.status(404).json({message: 'Login Failed.'})
               return;
          }
          req.session.save(() => {
               req.session.loggedIn = true;
               req.session.userId = userData.id;
               req.session.userName = userData.name;
               res.status(200).json({message: 'login success'})
          });
          console.log("single", userData.name);
          console.log('success login');
     } catch (err) {
          res.status(500).json(err);
     }
});

router.get('/', async (req, res) => {
     try {
          res.render('login');
     } catch (err) {
          res.status(500).json(err);
     }
})

router.get('/new_user', async (req, res) => {
     try {
          res.render('signUp');
     } catch (err) {
          res.status(500).json(err);
     }
});

router.post('/new_user', async (req, res) => {
     try {
          console.log(req.body);
          //await User.create(req.body)
          
     } catch (err) {
          res.status(500).json(err);
     }
});

router.get('/project', async (req, res) => {
     if (!req.session.loggedIn) {
          res.redirect('/');
     } else {
          try {
               //console.log(req.session.userId)
               const managerData = await User.findAll({
                    attributes: ['name']
               })
               const managers = managerData.map(x => x.get({plain: true}));
               console.log(managers, 'manager info');
               const projectIdData = await UserProject.findAll({
                    where: {user_id: req.session.userId},
                    attributes: [['project_id', 'id']]
               })
               const projectId = projectIdData.map((d) => d.get({plain: true}));
               console.log('here', projectId)
               const projectData = await Project.findAll({
                    where: {
                         [Op.or]: projectId
                    },
                    include: [{
                         model: User
                    }]
               })
               const projects = projectData.map((d) => d.get({plain: true}));
               const userData = {
                    name: req.session.userName,
                    projectNo: projects.length
               }
               res.render('project', {projects, userData, managers,loggedIn: req.session.loggedIn });
          } catch (err) {
               res.status(500).json(err);
          }
     }
}
);

router.post('/project', async(req, res) => {
     try{ 
          console.log(req.body)
          let newMgrIdInfo = await User.findOne({
               where: {name: req.body.mgrName}
          });
          let newMgrId = newMgrIdInfo.get({plain: true});
          console.log(newMgrId);
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
})


router.get('/task/:id', async (req, res) => {
     try{
          const taskList = await Task.findAll({
               where: {project_id: req.params.id},
               include: [{model: User}, {model: Comment}]
          });
          const tasks = taskList.map(x => x.get({plain: true}));
          console.log(tasks);
          const currentProject = await Project.findOne({
               where: {id: req.params.id}
          });
          const projectData = currentProject.get({plain: true});
          res.render('task', {tasks, projectData});
     } catch(err) {
          res.status(500).json(err);
     }
})







module.exports = router;