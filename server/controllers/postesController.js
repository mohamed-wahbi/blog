const fs = require('fs');
const asyncHandler = require('express-async-handler');
const {Post, validateCreatePost} = require ('../models/Post');
const cloudInary = require ('cloudinary');
const path = require('path');
const { cloudinaryUpload, cloudinaryRemoveImage } = require('../utils/cloudinary');


// -------------------------------------------------------------
// *   @disc       creat new Post
// *   @Router     api/posts/
// *   @methode    POST
// *   @access     private (only logged in user)
// -------------------------------------------------------------
module.exports.createPostCtrl = asyncHandler (async (req,res)=>{
    // 1-validation of image file :
    if (!req.file){
        return res.status(400).json ({message:'no file provided'})
    }

    // 2-validation of post sended :
    const {error} = validateCreatePost(req.body)
    if(error){
        return res.status(400).json({message:error.details[0].message});
    }

    // 3-uploadFile to cloudInary (image) :
    const imagePath = path.join(__dirname,`../images/${req.file.filename}`);
    const uploadImageResult = await cloudinaryUpload(imagePath);

    // 4- create new Post and saved it in the data base :
    const createdPost = await Post.create({
        title:req.body.title,
        description : req.body.description ,
        category : req.body.category,
        user : req.user.id,
        image : {
            url : uploadImageResult.secure_url,
            publicId : uploadImageResult.public_id,
        }
    });
    
    // 5- Send response to the data base :
    res.status(201).json(createdPost);

    // 6- Remove the image from the server :
    fs.unlinkSync(imagePath);

})



// -------------------------------------------------------------
// *   @disc       get Post
// *   @Router     api/posts/
// *   @methode    GET
// *   @access     public 
// -------------------------------------------------------------
module.exports.getAllPostsCtrl = asyncHandler(async(req,res)=>{
    const POST_PER_PAGE = 3 ;
    const {pageNumber , category} = req.query ;
    let posts ;

    if(pageNumber){
        posts = await Post.find()
        .skip((pageNumber -1)*POST_PER_PAGE)
        .limit(POST_PER_PAGE)
        .sort({createdAt:-1})
        .populate("user","-password")
    }else if(category){
        posts = await Post.find({category:category})
        .sort({createdAt:-1})
        .populate("user","-password")
    }else{
        posts = await Post.find()
        .sort({createdAt:-1})
        .populate("user","-password")
    }

    res.status(200).json(posts)
})



// -------------------------------------------------------------
// *   @disc       get one Post by id
// *   @Router     api/posts/:id
// *   @methode    GET
// *   @access     public 
// -------------------------------------------------------------
module.exports.getSingelPostCtrl = asyncHandler (async (req,res)=>{
    const post = await Post.find({_id:req.params.id})
    .populate("user","-password")
    ;
    if(!post){
        return res.status(404).json({message:'Post not Founde'})
    }
    res.status(200).json(post)
})



// -------------------------------------------------------------
// *   @disc       get Post count
// *   @Router     api/posts/count
// *   @methode    GET
// *   @access     public 
// -------------------------------------------------------------
module.exports.getPostCountCtrl = asyncHandler (async (req,res)=>{
    const count = await Post.countDocuments();
    res.status(200).json(count);
})



// -------------------------------------------------------------
// *   @disc       Delete Post
// *   @Router     api/posts/:id
// *   @methode    DELETE
// *   @access     private (only admin or owner of the post) 
// -------------------------------------------------------------
module.exports.deletePostCtrl = asyncHandler(async(req,res)=>{
    const post = await Post.findById({_id:req.params.id})
    if(!post){
        return res.status(403).json({message:"post not finded"})
    }

    if(req.user.isAdmin || req.user.id === post.user.toString()){
        await Post.findByIdAndDelete({_id:req.params.id});
        await cloudinaryRemoveImage(post.image.publicId);
        res.status(200).json({message:"Post deleted successfully",postId : post._id})
    }else{
        res.status(403).json({message:'access denied , forbiden'})
    }

})