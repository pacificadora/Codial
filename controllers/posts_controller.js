const Post = require('../models/post')

//for now there is no check for if the user is signed in then only the post will be visible.
module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id,
    }, function(err, post){
        if(err){console.log("error in creating a post"); return; }

        return res.redirect('back');
    });
}