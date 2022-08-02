//this is the starting point for routes in the app
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller')

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
//syntax for adding more routes
//router.use('/routerName', require('./routerFile'))
//this way multiple routers can be set up.

console.log("router loaded");

module.exports = router;