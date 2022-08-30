const passport = require("passport");
const JWTStrategy = require('passport-jwt').Strategy;

//now we will exporting a module which will extract the jwt from the header
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');


let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey : 'codial',

}

passport.use(new JWTStrategy(opts, function(jwtPayload, done){
    User.findById(jwtPayload._id, function(err, user){

        //here, user is already in the jwt, we are just fetching out the user by id and checking if user is present or not
        if(err){console.log('error in finding the user from jwt'); return;}
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })
}))


module.exports = passport;
