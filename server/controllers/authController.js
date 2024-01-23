const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const {User,validateRegisterUser} = require ('../models/User.js');

/*--------------------------------------------------
* @desc  Register new User
* @router /api/auth/register
* @methode POST
* @access public
----------------------------------------------------*/

module.exports.registerUserCtrl = asyncHandler(async(req,res)=>{
    //Validation
    const {error} = validateRegisterUser(req.body);
    if (error){
        return res.status(400).json({message:error.details[0].message});
    }
    //is user alradu exists
    const findUser = await User.findOne({email:req.body.email});
    if(findUser){
        return res.status(400).json({message:'user already exist'})
        
    }
    //hash the password
    const solt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,solt);
    //new user and saved it in DB
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword
    });
    await newUser.save();
    //send a response to client
    res.status(201).json({message:'you register successfully , please log in'})
})