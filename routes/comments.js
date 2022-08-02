const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentController = require('../controllers/comments_controller');


//applying authentication as well.
router.post('/create', passport.checkAuthentication, commentController.create);

module.exports = router;

