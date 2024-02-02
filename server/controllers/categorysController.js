const asyncHandler = require('express-async-handler');
const {Category,validateCreateCategory} = require ('../models/Category.js');



// -------------------------------------------------------------
// *   @disc       Create category
// *   @Router     api/categorys
// *   @methode    POST
// *   @access     private (only admin)
// -------------------------------------------------------------
module.exports.createCategoryCtrl = asyncHandler ( async (req,res)=>{
    const {error} = validateCreateCategory(req.body);
    if (error){
        return res.status(400).json({message:error.details[0].message})
    };

    const category = await Category.create({
        title:req.body.title,
        user:req.user.id
    })

    res.status(201).json(category);
})



// -------------------------------------------------------------
// *   @disc       get all categories
// *   @Router     api/categorys
// *   @methode    GET
// *   @access     public
// -------------------------------------------------------------
module.exports.getAllCategoryCtrl = asyncHandler (async (req,res)=>{
    const categories = await Category.find();
    res.status(200).json(categories);
})