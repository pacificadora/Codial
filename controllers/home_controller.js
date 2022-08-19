//syntax
//module.exports.actionName = function(req,res){}
const Post = require('../models/post');
const User = require('../models/user');

// module.exports.home = function(req, res){
//     // return res.end('<h1> Express is up for Codial! </h1>');
//     // console.log(req.cookies);
//     // res.cookie('cookie', 25);


//     // Post.find({}, function(err, posts){
//     //    return res.render('home', {
//     //     title: "Codial | Home",
//     //     posts: posts,
//     //    }); 
//     // })


//     //populate the user for each post
//     Post.find({})
//     .populate('user')
//     .populate({
//         path: 'comments',
//         populate: {
//             path: 'user'
//         }
//     })
//     .exec(function(err, posts){
//         User.find({}, function(err, users){
//             return res.render('home', {
//                 title: "Codial | Home",
//                 posts:  posts,
//                 all_users: users
//             });
//         })
//     })
// }

try{
    module.exports.home = async function(req, res){
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
    
        let users = await User.find({});
    
        return res.render('home', {
            title: 'Codial | Home',
            posts: posts,
            all_users: users
        })
    }
}catch(err){
    console.log("error", err);
    return;
}