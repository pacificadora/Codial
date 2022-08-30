const Post = require('../../../models/post');
const Comment = require('../../../models/comment');


module.exports.index = async function(req, res){
    
    //findind all the posts
    let posts = await Post.find({})
        .sort('-createdAt')//to sort the post in the nearest manner. 
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
    
    
    return res.json(200, {
        message: "List of Posts",
        posts: posts,
    });
}

//deleting the post using APIs
module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
        // if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});

            // if(req.xhr){
            //     return res.status(200).json({
            //         data: {
            //             post_id: req.params.id,
            //         },
            //         message: "Post deleted",
            //     })
            // }


            //req.flash('success', 'post and associated comments deleted');
            //return res.redirect('back');
            return res.json(200, {
                message: "post and associated comments are deleted.",
            })
        // }else{
        //     req.flash('error', 'you cannot delete this post');
        //     res.redirect('back');
        // }
    }catch(err){
        //req.flash('error', err);
        //console.log('Error', err);
        //return res.redirect('back');
        return res.json(500, {
            message: "internal server error",
        })
    }
}