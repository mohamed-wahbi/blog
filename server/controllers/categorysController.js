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



// -------------------------------------------------------------
// *   @disc       Delete category bi ID
// *   @Router     api/categorys/:id
// *   @methode    DELETE
// *   @access     priveat (only by admin)
// -------------------------------------------------------------
module.exports.deleteCategoryCtrl = asyncHandler ( async (req,res)=>{
    const category = await Category.findById({_id:req.params.id});
    if(!category){
        return res.status(400).json({message:"category not found."})
    };

    await Category.findByIdAndDelete({_id:req.params.id});

    res.status(200).json({message:"category has been deleted successfully .",categoryId : category._id})
})