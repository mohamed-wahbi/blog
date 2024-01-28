const express = require('express');
const { getAllUsersCtrl, getUserProfileCtrl, updateUserProfileCtrl, profilePhotoUploadCtrl, getUsersCountCtrl, deleteProfileCtrl } = require('../controllers/usersController');
const { verifyTokenAndAdmin, verifyTokenAndOnlyUser, verifyTokenQuery, verifyTokenAndAdminHeaders, verifyTokenAndAdminOrUserHeaders } = require('../middlewares/verifyToken');
const validateObjectId = require('../middlewares/validateObjectId.js');
const uploadFile = require('../middlewares/photoUpload.js');
const router = express.Router();


    // api/users/profile
    router.get('/profile',verifyTokenAndAdmin,getAllUsersCtrl)
    // api/users/profile/:id
    router.route('/profile/:id')
    .get(validateObjectId,getUserProfileCtrl)
    .put(validateObjectId,verifyTokenAndOnlyUser,updateUserProfileCtrl)
    .delete(validateObjectId,verifyTokenAndAdminOrUserHeaders,deleteProfileCtrl)

    //api/users/profile/profile-photo-upload
    router.route('/profile/profile-photo-upload')
    .post(verifyTokenQuery ,uploadFile.single('image'), profilePhotoUploadCtrl)



    //api/users/count
    router.route('/count').get(verifyTokenAndAdminHeaders,getUsersCountCtrl);

module.exports=router;
