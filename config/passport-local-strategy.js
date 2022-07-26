//passportjs is a middleware
//it uses session cookies that stores the information of the sessions
//it stores information of the users in encrypted manner
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')

//authenticatio using passport

passport.use(new LocalStrategy({
    usernameField: 'email', 
    },
    function(email, password, done){
        //find a user and extabilish the identity
        User.findOne({email: email}, function(err, user){
            if(err){
                console.log("error in finding the user --> passport"); 
                return done(err);//although done takes 2 arg but we have taken only right now
            }
            if(!user || user.password!=password){
                console.log("invalid username/password");
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
passport.deserializeUser(function(user, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('error in finding user --> passport');
            return done(err);
        }
        return done(null, user);
    })
})

module.exports = passport;