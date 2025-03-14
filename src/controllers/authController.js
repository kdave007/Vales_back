const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig'); 

// In a real application, this should be in a database
const users = [
    { id: 1, username: 'david', password: '123' },
    { id: 2, username: 'aram', password: 'qwe' }
];

const login = async (req, res) => {
    const { username, password } = req.body;

    // Validate request body
    if (!username || !password) {
        return res.status(400).json({
            status: 'error',
            message: 'Username and password are required'
        });
    }

    try {
        const userFound = users.find(u => 
            u.username === username && 
            u.password === password
        );

        if (!userFound) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }

        const token = generateToken(userFound);

        return res.status(200).json({
            status: 'success',
            data: {
                token,
                user: {
                    id: userFound.id,
                    username: userFound.username
                }
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

const generateToken = (user) => {
    const payload = {
        userId: user.id,
        username: user.username
    };

    return jwt.sign(
        payload,
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
    );
};

module.exports = { login };
