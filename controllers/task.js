const router = require('express').Router();
const {User, Project, Task, Comment, UserProject} = require('../models/index');
const { Op, DataTypes } = require('sequelize');
const session = require('express-session');


router.get('/all', async (req, res) =>{
    try{
        const projectData = await Project.findAll({
            attributes: ['name']
        })
        const projects = projectData.map(x => x.get({plain: true}));
        const taskList = await Task.findAll({
            where: {user_id: req.session.userId},
            include: [{model: Project}, {model: Comment}]
        });
        const tasks = taskList.map(x => x.get({plain: true})); 
        res.render('alltask', {tasks, projects, loggedIn: req.session.loggedIn})
    } catch(err) {
        res.status(500).json(err);
    }
})


router.get('/project/:id', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
    } else {
        try{
            const managerData = await User.findAll({
                attributes: ['name']
            })
            const managers = managerData.map(x => x.get({plain: true}));
            const taskList = await Task.findAll({
                where: {project_id: req.params.id},
                include: [{model: User}, {model: Comment}]
            });
            const tasks = taskList.map(x => x.get({plain: true}));
            const currentProject = await Project.findOne({
                where: {id: req.params.id}
            });
            const projectData = currentProject.get({plain: true});
            res.render('task', {tasks, managers, projectData, loggedIn: req.session.loggedIn});
        } catch(err) {
            res.status(500).json(err);
        }
    }
})

router.post('/project/:id', async(req, res) => {
    try{
        const userData = await User.findOne({
            where: {name: req.body.user},
            attributes: ['id']
        })
        const user = userData.get({plain: true})
        const taskList = await Task.create({
            name: req.body.name,
            project_id: req.params.id,
            user_id: user.id,
            due_date: req.body.due,
            status: req.body.status,
        })
        const taskId = taskList.get({plain:true}).id
        await Comment.create({
            description: req.body.comment,
            task_id: taskId
        })
        req.session.save(() => {
            req.session.loggedIn = true;
        });
        res.status(200).json({message: "success"})
    } catch(err) {
            res.status(500).json(err);
    }
    
})

router.post('/add', async (req, res) => {
    try{
        const projectData = await Project.findOne({
            where: {name: req.body.project},
            attributes: ['id']
        })
        const project = projectData.get({plain: true})
        let data = {
            name: req.body.name,
            project_id: project.id,
            user_id: req.session.userId,
            due_date: req.body.due,
            status: req.body.status
        };
        const taskList = await Task.create(data);
        const taskId = taskList.get({plain:true}).id
        console.log('\x1b[36m%s\x1b[0m', 'new task',taskId);
        await Comment.create({
            description: req.body.comment,
            task_id: taskId
        })
        req.session.save(() => {
            req.session.loggedIn = true;
        });
        res.status(200).json({message: "success"})
    } catch(err) {
            res.status(500).json(err);
    }
    
})


router.put('/status/:id', async(req, res) =>{
    try{
        const taskData = await Task.update({
            status: req.body.status
        },
        {
            where: {id: req.params.id}
        })
        res.status(200).json(taskData)
    } catch(err) {
        res.status(500).json(err);
    }
})



module.exports = router;
