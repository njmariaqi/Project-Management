const router = require('express').Router();
const {User, Project, Task, Comment, UserProject} = require('../models/index');
const { Op, DataTypes } = require('sequelize');
const session = require('express-session');

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


module.exports = router;