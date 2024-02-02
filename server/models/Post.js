const mongoose =require('mongoose');
const JOI = require ('joi');
const Joi = require('joi');
const User = require ('../models/User.js')
const { Comment } = require('../models/Comment.js'); 
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,
        minlength:2,
        maxlength:200,
    },
    description:{
        type:String,
        trim:true,
        required:true,
        minlength:2,
    },
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    category : {
        type : String ,
        required : true
    },
    image:{
        type:Object,
        default:{
            url:"",
            publicId : null
        }
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
},
{
    timestamps :true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}
);

postSchema.virtual("comment",{
    ref:"Comment",
    foreignField:"postId",
    localField:"_id"
} 
)


const Post = mongoose.model('Post',postSchema);

// Validate create Post :
function validateCreatePost (obj){
    const schema = JOI.object({
        title:JOI.string().trim().min(2).max(200).required() , 
        description:JOI.string().trim().min(5).required() ,
        category:JOI.string().trim().required()
    })
    return schema.validate(obj)
}


// Validate update Post :
function validateUpdatePost (obj){
    const schema = JOI.object({
        title:JOI.string().trim().min(2).max(200) , 
        description:JOI.string().trim().min(5) ,
        category:JOI.string().trim()
    })
    return schema.validate(obj)
}


module.exports = {
    Post,
    validateCreatePost,
    validateUpdatePost
}