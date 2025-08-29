const captainModel = require('../models/captain_model');

const captainService = require('../services/captain_service');
const { validationResult } = require('express-validator');


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