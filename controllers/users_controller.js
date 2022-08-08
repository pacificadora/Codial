const User = require('../models/user')


//lets just keep it as it is and apply no async await
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        })
    })
}

module.exports.update = function(req, res){
    // if the current login user's id matches the req.params.id then only changes are possible.
    if(req.user.id == req,params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}


//render the sign up page
module.exports.signup = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: 'Codial | Sign Up'
    })
}

//render the sign in page
module.exports.signin = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

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
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}


module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have been logged out');
    return res.redirect('/');
}





