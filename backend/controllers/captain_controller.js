const captainModel = require('../models/captain_model');

const captainService = require('../services/captain_service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken_model');


module.exports.registerCaptain = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyExists = await captainModel.findOne({ email });
    if(isCaptainAlreadyExists){
        return res.status(400).json({ message: 'Captain with this email already exists' });
    } 

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        vehicleType: vehicle.vehicleType,
        plate: vehicle.plate,
        colour: vehicle.colour,
        capacity: vehicle.capacity
    });

    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain });
}


module.exports.loginCaptain = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password'); //+password is very important because by default password is not selected because of select:false in schema
    if (!captain) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    const isMatch = await captain.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = captain.generateAuthToken();
    res.cookie('token', token);

    res.status(200).json({ token, captain });
}

module.exports.getCaptainProfile = async (req, res) => {
    res.status(200).json({ captain: req.captain });
}

module.exports.logoutCaptain = async (req, res) => {
    const token =req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
}