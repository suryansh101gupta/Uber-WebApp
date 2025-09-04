const userModel = require('../models/user_models');
const userService = require('../services/user_service');
const { validationResult } = require('express-validator');  
const blacklistToken_model = require('../models/blacklistToken_model');



module.exports.registerUser = async(req, res, next) =>{

    // console.log(req.body)
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log("Validation errors:", errors.array());
        return res.status(400).json({errors: errors.array()});
    }

    const {fullName, email, password} = req.body;
    const isUserAlreadyExists = await userModel.findOne({ email });
    if(isUserAlreadyExists){
        return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullName.firstName,
        lastname: fullName.lastName,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });

}

module.exports.loginUser = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password'); //+password is very important because by default password is not selected because of select:false in schema
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, user });
}

module.exports.getUserProfile = async(req, res, next) => {
    res.status(200).json({ user: req.user });
}

module.exports.logoutUser = async(req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    await blacklistToken_model.create({ token });
    res.status(200).json({ message: 'Logged out successfully' });
}