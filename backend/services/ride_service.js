const rideModel = require('../models/ride_model');
const userModel = require("../models/user_models");
const mapsService = require('./maps_service');
const crypto = require('crypto');


async function getFare(pickup, destination){
    if(!pickup || !destination){
        throw new Error('Pickup and destination required');
    }

    const distanceTime = await mapsService.getDistanceTime(pickup, destination);

    const baseFare = {
        auto: 25,
        cab: 45,
        biketaxi:20
    };

    const perKmRate = {
        auto: 15,
        cab: 20,
        biketaxi: 10
    };

    const perMinuteRate = {
        auto: 3,
        cab: 5,
        biketaxi: 2
    };

    console.log(distanceTime);

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        cab: Math.round(baseFare.cab + ((distanceTime.distance.value / 1000) * perKmRate.cab) + ((distanceTime.duration.value / 60) * perMinuteRate.cab)),
        biketaxi: Math.round(baseFare.biketaxi + ((distanceTime.distance.value / 1000) * perKmRate.biketaxi) + ((distanceTime.duration.value / 60) * perMinuteRate.biketaxi))
    };

    return fare;
}

module.exports.getFare = getFare;

function getOtp(num) {
    const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num)).toString();
    return otp;
}

module.exports.createRide = async ({ 
    user, pickup, destination, vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);

    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(4),
        fare: fare[vehicleType]
    })

    return ride;
}

module.exports.confirmRide = async ({
    rideId,captain
}) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
}

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    return ride;
}

module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}