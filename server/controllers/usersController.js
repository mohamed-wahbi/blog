const asyncHandler = require('express-async-handler');
const {User, validateUpdateUser} = require('../models/User.js');
const { Router } = require('express');
const { get } = require('mongoose');
const bcrypt = require('bcryptjs')
const path = require ('path');
const fs = require ('fs');
const cloudinary = require('cloudinary')
const { cloudinaryUpload, cloudinaryRemoveImage } = require('../utils/cloudinary.js');
/*--------------------------------------------------
* @desc    Get all Users
* @router  /api/users/profile
* @methode GET
* @access  private(only admine)
----------------------------------------------------*/

module.exports.getAllUsersCtrl = asyncHandler(async (req,res)=>{
    // console.log(req.query.Authorization.split(" ")[1])
    // if(!req.user.isAdmin){
    //    return res.status(403).json({message:'not allowed , only admin'})
    // }
    const users = await User.find().select(["-password"]).populate("posts");
    res.status(200).json(users);
})


// -------------------------------------------------------------
// *   @disc       get profile users
// *   @Router     api/users/profile/:id 
// *   @methode    get
// *   @access     public
// -------------------------------------------------------------

module.exports.getUserProfileCtrl = asyncHandler(async (req,res)=>{
    const user = await User.findById({_id:req.params.id}).select(["-password"]).populate("posts");
    if(!user){
        return res.status(404).json({ message:'user not found' });
    }
    res.status(200).json(user);
})


// -------------------------------------------------------------
// *   @disc       update profile user
// *   @Router     api/users/profile/:id 
// *   @methode    put
// *   @access     private (only user himself)
// -------------------------------------------------------------

module.exports.updateUserProfileCtrl = asyncHandler ( async (req,res)=>{
    //validation :
    const {error} = validateUpdateUser(req.body);
    if(error){
        return res.status(404).json({message:error.details[0].message});
    }
    //if Password exist :
    if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password,salt);
    }
    //Update user by id with $set methode :
    const updatedUser = await User.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            username:req.body.username,
            password:req.body.password,
            bio:req.body.bio,
        }
    },{new:true , runValidators:true}).select(["-password"])

    //renvoyer message :
    res.status(200).json(updatedUser);

})


// -------------------------------------------------------------
// *   @disc       Upload profile photo
// *   @Router     api/users/profile/profile-photo-upload
// *   @methode    POST
// *   @access     private (connected user)
// -------------------------------------------------------------

//upload profile photo :
module.exports.profilePhotoUploadCtrl = asyncHandler (async (req,res)=>{
   // 1 validation :
    if(!req.file){
        return res.status(400).json({message:'no file provided'})
    }
    // 2 get the path to the image :
    const imagePath = path.join(__dirname,`../images/${req.file.filename}`) ;

    // 3 Upload to cloudinary :
    const dataCloudinary = await cloudinaryUpload(imagePath);

    // 4 Get the user from the DB :
    const user = await User.findById(req.user.id);

    // 5 Delete the old profile photo if exist :
    if(user.profilePhoto.publicId !== null){
        await cloudinaryRemoveImage(user.profilePhoto.publicId);
    }

    // 6 change the profilePhoto filed in the DB :
    user.profilePhoto = {
        url: dataCloudinary.secure_url,
        publicId :dataCloudinary.public_id
    }
    await user.save();

    // 7 send request to the client :
    res.status(200).json({
        message:'profile photo successfully uploaded',
        profilePhoto : user.profilePhoto
     });

    // 8 remove the image from the servcer :
    fs.unlinkSync(imagePath);
})

// -------------------------------------------------------------
// *   @disc       Count profile user
// *   @Router     api/users/count
// *   @methode    GET
// *   @access     private (only admin)
// -------------------------------------------------------------

module.exports.getUsersCountCtrl = asyncHandler (async (req,res)=>{

    const count = await User.countDocuments();
    return res.status(200).json(count)
})


// -------------------------------------------------------------
// *   @disc       delete profile user
// *   @Router     api/users/profile/:id
// *   @methode    DELETE
// *   @access     private (user || (or) only admin)
// -------------------------------------------------------------

module.exports.deleteProfileCtrl = asyncHandler ( async (req,res) => {
    console.log(req.headers)

    // get User by id :
    const userById = await User.findById({_id:req.params.id});
    if(!userById){
       return res.status(404).json({message :'no User Profile with this ID in the DB'})
    };
    // Delete image profile from the cloudinary :
    await cloudinaryRemoveImage(userById.profilePhoto.publicId);

    //Delete profile by id :
    await User.findByIdAndDelete({_id:req.params.id});

    // envoyer une response au client :
    res.status(200).json({message:'profile deleted successfully .'});

})



