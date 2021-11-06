const router = require('express').Router();
//const path = require('path');
const bcrypt = require('bcrypt');
const {User, Project, Task, Comment} = require('../models/index');

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
          res.status(200).json({message: 'login success'})
          console.log('success login')
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
          await User.create(req.body)
          
     } catch (err) {
          res.status(500).json(err);
     }
});

const test = {name: 'this is a test for data'}

router.get('/project', async (req, res) => {
     try {
          const userData = await User.findOne({
               where: {email: 'alvin@gmail.com'}
          })
          const userPlain = userData.get({plain: true})
          console.log(userPlain)
          res.render('project', userPlain);
     } catch (err) {
          res.status(500).json(err);
     }
});

module.exports = router;
