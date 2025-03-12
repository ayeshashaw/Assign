const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, 'secret_key', async (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        req.user = await User.findById(decoded.id);
        next();
    });
};

const authorize = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Forbidden: Access denied' });
        }
        next();
    };
};

module.exports = { authenticate, authorize };
