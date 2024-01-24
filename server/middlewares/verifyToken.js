const { func } = require('joi');
const jwt = require ('jsonwebtoken');
require('dotenv').config();

//verify Token :

function verifyToken (req,res,next){
    const authToken = req.query.Authorization;
    if(authToken){
        const token = authToken.split(' ')[1];
        try {
            const decodePayload = jwt.verify(token,process.env.TOKEN_KEY);
            req.user = decodePayload;
            next();
        } catch (error) {
            res.status(401).json({message: 'invalid token , access denied'})
        }
    }else{
        return res.status(401).json({message:'no token provided , acess denied !'})
    }
}

//verify token and isAdmin :
function verifyTokenAndAdmin (req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else {
            return res.status(403).json({message:'not allowed , only admin'})
        }
    })
}

module.exports={verifyToken,verifyTokenAndAdmin}