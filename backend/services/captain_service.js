const { lazy } = require('react');
const captainModel = require('../models/captain_model');


module.exports.createCaptain = async ({
    firstname, lastname, email, password,
    vehicleType, plate, colour, capacity
}) => {
    if(!firstname || !email || !password || !vehicleType || !plate || !colour || !capacity){
        throw new Error('All fields are required');
    }
    const captain = captainModel.create({
        fullname: { firstname, lastname },
        email,
        password,
        vehicle: { vehicleType, plate, colour, capacity }
    });
    return captain;
}