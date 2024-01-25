const asyncHandler = require('express-async-handler');
const {User} = require('../models/User.js');
const { Router } = require('express');
const { get } = require('mongoose');
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
    const users = await User.find();
    res.status(200).json(users);
})


// -------------------------------------------------------------
// *   @disc       get profile users
// *   @Router     api/users/profile/:id 
// *   @methode    get
// *   @access     public
// -------------------------------------------------------------

module.exports.getUserProfileCtrl = asyncHandler(async (req,res)=>{
    const user = await User.findById({_id:req.params.id});
    if(!user){
        return res.status(404).json({ message:'user not found' });
    }
    res.status(200).json(user);
})
