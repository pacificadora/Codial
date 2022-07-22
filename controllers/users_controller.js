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
    //TODO later
}

//sign in and create a session for the user.
module.exports.createSession = function(req, res){
    //TODO later;
}





