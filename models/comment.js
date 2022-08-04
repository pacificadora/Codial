const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
    },
    //comment belongs to a user
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    //comment belongs to a post as well
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    }
},{
    timestamps: true,
});


const Comment = mongoose.model('Comments', commentSchema);
module.exports = Comment;