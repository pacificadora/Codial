const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    //including the ids of all comment in the post schema itself.
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments',
        }
    ]
},{
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;