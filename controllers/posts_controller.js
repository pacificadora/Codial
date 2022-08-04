const Post = require('../models/post')
const Comment = require('../models/comment');
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

module.exports.destroy = function(req, res){
    Post.findById(req.params.id, function(err, post){

        //.id means converting the object id into the string
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post: req.params.id}, function(err){
                return res.redirect('back');
            });
        }
        else{
            res.redirect('back');
        }
    })
}