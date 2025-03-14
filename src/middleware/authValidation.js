const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

const validate = (req, res, next) => {
    try{

        if(!jwtConfig.auth_req){
            return next();
        }


        const auth = req.headers['authorization'];
        let token;
        if (auth) {
            const parts = auth.split(' ');
            if (parts[1]) {
                token = parts[1];
            }
        }

        if(!token){
            return res.status(401).json({
                status: 'error',
                message: 'No token provided'
            });
        }

        const decoded = jwt.verify(token, jwtConfig.secret);
        console.log(decoded);
;       req.user = decoded;

        next();

    } catch(error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: 'error',
                message: 'Token expired'
            });
        }
        
        return res.status(401).json({
            status: 'error',
            message: 'Invalid token'
        });

    }
}

module.exports = {validate};