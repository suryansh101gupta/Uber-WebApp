const rideService = require('../services/ride_service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps_service')
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride_model');
const userModel = require("../models/user_models");


module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    const { userId, pickup, destination, vehicleType } = req.body;

    try{
        const ride = await rideService.createRide({user: req.user._id , pickup, destination, vehicleType});
        res.status(200).json(ride);

        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);

        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.lat, pickupCoordinates.lng, 2);

        // console.log(captainsInRadius)

        ride.otp = ""

        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate("user");

        captainsInRadius.map(captain => {
            console.log(captain, ride)
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({message: err.message})
    }
}


module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}