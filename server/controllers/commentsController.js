const asyncHandler = require("express-async-handler");
const { Comment , validateCreateComment , validateUpdateComment} = require ("../models/Comment");
const { User } = require("../models/User");


// -------------------------------------------------------------
// *   @disc       create new Comment 
// *   @Router     api/comments
// *   @methode    POST
// *   @access     private (logged in users) 
// -------------------------------------------------------------


module.exports.createCommentCtrl = asyncHandler ( async (req,res)=>{
    //validation :
    const {error} = validateCreateComment(req.body);
    if(error){
        return res.status(404).json({message:error.details[0].message});
    }

    //get username from user db :
    const profile = await User.findById({_id:req.user.id});

    //Creation of the comment :
    const comment = await Comment.create({
        postId : req.body.postId,
        text : req.body.text,
        user: req.user.id,
        username: profile.username
    });

    //send response to client :
    res.status(201).json(comment);


})
