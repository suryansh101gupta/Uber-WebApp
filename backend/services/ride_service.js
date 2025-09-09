const rideModel = require('../models/ride_model');
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