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



// -------------------------------------------------------------
// *   @disc       get all Comments
// *   @Router     api/comments
// *   @methode    GET
// *   @access     private (only by admin) 
// -------------------------------------------------------------
module.exports.getCommentsCtrl = asyncHandler ( async (req,res)=>{
    const comments = await Comment.find().populate("user","-password");
    res.status(200).json(comments);
})


// -------------------------------------------------------------
// *   @disc       delete Comment
// *   @Router     api/comments/:id
// *   @methode    DELETE
// *   @access     private (only by admin or owner of the comment (user)) 
// -------------------------------------------------------------
module.exports.deleteCommentCtrl =asyncHandler ( async (req,res)=>{
    const comment = await Comment.findById({_id:req.params.id});
    if(!comment){
        return res.status(404).json({message:"comment not found"})
    }

    if(req.user.isAdmin || req.user.id === comment.user._id.toString()) {
        await Comment.findByIdAndDelete({_id:req.params.id});
        res.status(200).json({message:"commment deleted successfully "})
    }
    else{
        res.status(403).json({message:'access denied , not allowed'})
    }
})
