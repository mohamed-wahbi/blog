const mongoose = require ('mongoose');
const JOI = require('joi');
const categorySchema = new mongoose.Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required : true
    },
    title:{
        type:String,
        required:true,
        trim:true
    }
},
{
    timestamps :true
}
);

const Category = mongoose.model("Category",categorySchema);

//validate create Category :
function validateCreateCategory (obj){
    const schema = JOI.object({
        title:JOI.string().trim().required().label("Title")
    })
    return schema.validate(obj)
}

module.exports={Category,validateCreateCategory}