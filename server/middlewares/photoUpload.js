const path = require('path');
const multer = require ('multer');

const fileStorage = multer.diskStorage({
    destination : function (req,file,cb) {
        cb(null, path.join(__dirname,'../images'))
    },
    filename : function (req,file,cb) {
        if(file){
            cb(null,new Date().toISOString().replace(/:/g,'-')+file.originalname)
        }
        else{
            cb(null,false)
        }
    }
})

const uploadFile = multer ({
    storage : fileStorage ,
    fileFilter : function (req,file, cb ){
        if(file.mimetype.startsWith('image')){
            cb(null,true);
        }else{
            cb(null,false)
        }
    }
})

module.exports = uploadFile ;