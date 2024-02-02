const cloudinary = require ('cloudinary') ;
require('dotenv').config();

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUpload = async (filePath)=>{
    try {
        const data = await cloudinary.uploader.upload(
            filePath,
            {resource_type : 'auto'}
        );
        return data ;
    } catch (error) {
        return error
    }
}


const cloudinaryRemoveImage = async (imagePublicId)=>{
    try {
        const result = await cloudinary.uploader.destroy(imagePublicId);
        return result;
    } catch (error) {
        return error
    }
}


const cloudinaryRemoveMultipleImages = async (publicIds)=>{
    try {
        const result = await cloudinary.v2.api.delete_resources(publicIds)
        return result;
    } catch (error) {
        return error
    }
}


module.exports={cloudinaryUpload,cloudinaryRemoveImage,cloudinaryRemoveMultipleImages}