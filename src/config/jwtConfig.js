require('dotenv').config();

const jwtConfig = {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
     auth_req: process.env.AUTH_REQUIRED?.toLowerCase() === 'true'// Convert string to boolean
};

module.exports = jwtConfig;