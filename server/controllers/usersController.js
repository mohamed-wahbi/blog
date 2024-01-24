const asyncHandler = require('express-async-handler');
const {User} = require('../models/User.js');
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