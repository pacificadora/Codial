//this is the starting point for routes in the app
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller')

router.get('/', homeController.home);

console.log("router loaded");

module.exports = router;