const userModel = require('../models/user_models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    if (!token) {
        return res.status(401).json({ error: 'Access denied. Unauthorized.' });
    }  

    const isBlacklisted = await userModel.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ error: 'Unauthorised. Please log in again.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user; // Attach user to request object
        return next();

    }catch (error) {
        return res.status(400).json({ error: 'Unauthorized' });
    }
}