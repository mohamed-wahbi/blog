const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const {User,validateRegisterUser,validateLoginUser} = require ('../models/User.js');

/*--------------------------------------------------
* @desc    Register new User
* @router  /api/auth/register
* @methode POST
* @access  public
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



/*-----------------------------------------------
* @disc     Log In User
* @route    /api/auth/login
* @methode  POST
* @access   public
-------------------------------------------------*/

module.exports.loginUserCtrl = asyncHandler(async(req,res)=>{
    //Validation
    const {error} = validateLoginUser(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }
    //Find user by email
    const findEmailUser = await User.findOne({email:req.body.email});
    if(!findEmailUser){
        return res.status(400).json({message:'email or password is invalid'});
    }
    //Password compare
    const passwordCompare = await bcrypt.compare(req.body.password,findEmailUser.password);
    if(!passwordCompare){
        return res.status(400).json({message:'email or password is invalid'});
    }
    //creation of token (jwt:jsonwebtoken)
    const token = findEmailUser.generateAuthToken()
    //send response 
    res.status(200).json({
        _id : findEmailUser.id,
        isAdmin : findEmailUser.isAdmin,
        profilePhoto : findEmailUser.profilePhoto,
        token
    })
})


