const jwt = require('jsonwebtoken');
require('dotenv').config();


// Verify token and isAdmin:
function verifyTokenAndAdmin(req, res, next) {
    const authToken = req.query.authorization;
    if (authToken) {
        const token = authToken.split(' ')[1];
        try {
            const decodedPayload = jwt.verify(token, process.env.TOKEN_KEY);
            req.user = decodedPayload;
            if(req.user.isAdmin){
                next()
            }else{
                return res.status(401).json({  message: 'Not allowed, only Admin' });
            }
            
        } catch (error) {
            res.status(401).json({ message: 'Invalid token, access denied' });
        }
    } else {
        return res.status(401).json({ message: 'No token provided, access denied' });
    }
}

// Verify Token:
function verifyTokenQuery(req, res, next) {
    const authToken = req.query.authorization;
    
    if (authToken) {
        const token = authToken.split(' ')[1];
        try {
            const decodedPayload = jwt.verify(token, process.env.TOKEN_KEY);
            req.user = decodedPayload;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid token, access denied' });
        }
    } else {
        return res.status(401).json({ message: 'No token provided, access denied' });
    }
}


// Verify Token:
function verifyToken(req, res, next) {
    const authToken = req.headers.authorization;
    
    if (authToken) {
        const token = authToken.split(' ')[1];
        try {
            const decodedPayload = jwt.verify(token, process.env.TOKEN_KEY);
            req.user = decodedPayload;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid token, access denied' });
        }
    } else {
        return res.status(401).json({ message: 'No token provided, access denied' });
    }
}


// Verify token and only user himself:
function verifyTokenAndOnlyUser(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id) {
            next();
        } else {
            return res.status(403).json({ message: 'Not allowed, only user himself' });
        }
    });
}

module.exports = { verifyToken, verifyTokenAndAdmin, verifyTokenAndOnlyUser,verifyTokenQuery };
