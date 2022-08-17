//passportjs is a middleware
//it uses session cookies that stores the information of the sessions
//it stores information of the users in encrypted manner
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')

//authenticatio using passport

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true, 
    },
    function(req, email, password, done){
        //find a user and extabilish the identity
        User.findOne({email: email}, function(err, user){
            if(err){
                req.flash('error', err);
                // console.log("error in finding the user --> passport"); 
                return done(err);//although done takes 2 arg but we have taken only one right now
            }
            if(!user || user.password!=password){
                req.flash('error', 'invalid username/password');
                // console.log("invalid username/password");
                return done(null, false);//1st arg = no err hence null, 2nd arg = authentication has not been done hence false
            }
            //when the user found and passwords matched
            return done(null, user);
        })
    }
));


//serialise user to decide which key is to be kept in the cookie
passport.serializeUser(function(user, done){
    done(null, user.id);
})
//deserialise user from key in the cookie
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('error in finding user --> passport');
            return done(err);
        }
        return done(null, user);
    })
})

//creating the middleware
//check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    //if the user is signed in then pass on the request to the next function(controllers function)
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/signin');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the signed in user from the session cookie we are just this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;