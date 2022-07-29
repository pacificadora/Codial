//syntax
//module.exports.actionName = function(req,res){}
const Post = require('../models/post');

module.exports.home = function(req, res){
    // return res.end('<h1> Express is up for Codial! </h1>');
    // console.log(req.cookies);
    // res.cookie('cookie', 25);


    // Post.find({}, function(err, posts){
    //    return res.render('home', {
    //     title: "Codial | Home",
    //     posts: posts,
    //    }); 
    // })


    //populate the user for each post
    Post.find({}).populate('user').exec(function(err, posts){
        return res.render('home', {
            title: "Codial | Home",
            posts: posts,
        });
    })
}