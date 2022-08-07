const express = require('express');
const passport = require('passport');
const router = express.Router();

const userController = require('../controllers/users_controller');
router.get('/profile/:id', passport.checkAuthentication, userController.profile);
router.post('/update/:id', passport.checkAuthentication, userController.update);

router.get('/signup', userController.signup);
router.get('/signin', userController.signin);


router.post('/create', userController.create);

//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'},
), userController.createSession);

//as it was written in the videos
//router.get('/signout', userController.destroySession);

//but the methods are now changed and hence below written way is the corrct way
router.get('/signout', function(req, res, next){
    req.logOut(function(err){
        if(err){
            return next(err);
        }
        return res.redirect('/');
    })
})

module.exports = router;