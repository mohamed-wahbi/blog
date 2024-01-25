const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require ('jsonwebtoken');
require('dotenv').config();
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
      minlength: 8,
    },
    profilePhoto: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2015/10/15/22/37/blank-profile-picture-973460__480.png",
        publicId: null,
      },
    },
    bio: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = function(){
  return jwt.sign({id:this._id,isAdmin:this.isAdmin}, process.env.TOKEN_KEY)
}

const User = mongoose.model("Users",userSchema);

//Validate Register User :
function validateRegisterUser (obj) {
    const schema = Joi.object({
        username:Joi.string().trim().min(2).max(100).required(),
        email:Joi.string().trim().min(5).max(100).required().email(),
        password :Joi.string().trim().min(8).required()
    });
    return schema.validate(obj)
}

//validate login user:
function validateLoginUser (obj){
  const schema = Joi.object({
    email:Joi.string().trim().min(5).max(100).required().email(),
    password:Joi.string().trim().min(8).required()
  })
  return schema.validate(obj);
}

//validate update user :
function validateUpdateUser(obj){
  const schema = Joi.object({
    username:Joi.string().trim().min(2).max(100),
    password:Joi.string().trim().min(8),
    bio:Joi.string()
  })
  return schema.validate(obj);
}

module.exports={User,validateRegisterUser,validateLoginUser,validateUpdateUser}