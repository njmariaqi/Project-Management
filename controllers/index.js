const router = require('express').Router();

const loginRoute = require('./login');
const projectRoute = require('./project');
const taskRoute = require('./task');

router.use('/', loginRoute);
router.use('/project', projectRoute);
router.use('/task', taskRoute)

module.exports = router;
