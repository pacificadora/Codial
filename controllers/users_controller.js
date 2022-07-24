const User = require('../models/user')

module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile',
    })
}


//render the sign up page
module.exports.signup = function(req, res){
    return res.render('user_sign_up', {
        title: 'Codial | Sign Up'
    })
}

//render the sign in page
module.exports.signin = function(req, res){
    return res.render('user_sign_in', {
        title: 'Codial | Sign In'
    })
}


//get the signup data;
module.exports.create = function(req, res){
    //when I used '-' in confirm password in below statement it showed me the error and when I put '_' it worked properly
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return;}
        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return;}

                return res.redirect('/users/signin');
            })
        }else{
            return res.redirect('back');
        }
    })
}

//sign in and create a session for the user.
module.exports.createSession = function(req, res){
    //TODO later;
}





