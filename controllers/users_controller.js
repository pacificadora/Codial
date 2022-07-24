const User = require('../models/user')

module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                return res.render('user_profile', {
                    title: 'User Profile',
                    user: user,
                })
            }
        })
    }else{
        res.redirect('/users/signin');
    }
}

module.exports.clear = function(req, res){
    if(req.cookies.user_id){
        res.cookies.clear;
        return res.redirect('/users/signin');
    }
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
    
    //steps to authenticate
    //find the user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){if(err){console.log('error in finding user in signing up'); return;}}
        
        //handle user found
        if(user){
            //handle passwords that dont match
            if(user.password!=req.body.password){
                res.redirect('back');
            }
            //handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }else{
            //handle user not found
            res.redirect('back');
        }
    })
}





