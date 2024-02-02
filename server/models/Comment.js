const mongoose = require('mongoose');
const JOI = require('joi');
const {Post} = require ('../models/Post.js')

const commentSchema = new mongoose.Schema({
    postId :{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:true
    },
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref : "User",
        required :true
    },
    text : {
        type : String ,
        required:true
    },
    username : {
        type:String,
        required:true
    }
},
{
    timestamps :true
}
);

// Comment model :
const Comment = mongoose.model("comment",commentSchema);

//validate create comment :
function validateCreateComment (obj) {
    const schema = JOI.object({
        postId:JOI.string().required(),
        text:JOI.string().trim().required()
    });
    return schema.validate(obj)
}


//validate update comment :
function validateUpdateComment (obj) {
    const schema = JOI.object({
        text:JOI.string().trim().required()
    });
    return schema.validate(obj)
}

module.exports = {
    Comment,
    validateCreateComment,
    validateUpdateComment
}