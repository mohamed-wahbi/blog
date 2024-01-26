const asyncHandler = require('express-async-handler');
const {User, validateUpdateUser} = require('../models/User.js');
const { Router } = require('express');
const { get } = require('mongoose');
const bcrypt = require('bcryptjs')
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
    const users = await User.find().select(["-password"]);
    res.status(200).json(users);
})


// -------------------------------------------------------------
// *   @disc       get profile users
// *   @Router     api/users/profile/:id 
// *   @methode    get
// *   @access     public
// -------------------------------------------------------------

module.exports.getUserProfileCtrl = asyncHandler(async (req,res)=>{
    const user = await User.findById({_id:req.params.id}).select(["-password"]);
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
    if(!req.file){
        return res.status(400).json({message:'no file provided'})
    }
    res.status(200).json({message:'profile photo successfully uploaded'})
})