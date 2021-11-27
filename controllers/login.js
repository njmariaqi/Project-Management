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
          const newU = await User.create({
               name: req.body.name,
               email: req.body.email,
               password: req.body.pass
          })
          res.status(200).json({message: "last haha"})
     } catch (err) {
          res.status(500).json(err);
     }
});

router.post('/logout', async (req, res) => {    
     if (req.session.loggedIn) {
          req.session.destroy(() => {
               res.status(204).end();
          });
     } else {
          res.status(404).end();
     }
})

router.get('/about', async (req, res) => {
     try {
          res.render('about');
     } catch (err) {
          res.status(500).json(err);
     }
})

router.get('/contact', async (req, res) => {
     try {
          res.render('contact');
     } catch (err) {
          res.status(500).json(err);
     }
})

module.exports = router;