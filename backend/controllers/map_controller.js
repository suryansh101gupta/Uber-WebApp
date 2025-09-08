const mapService = require('../services/maps_service');
const { validationResult } = require ('express-validator');

module.exports.getCoordinates = async (req, res, next) => {
    console.log("Incoming query:", req.query); 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log("Validation errors:", errors.array());
        return res.status(400).json({ errors:errors.array() });
    }
    const { address } = req.query;
    // console.log("Query params:", req.query);
    // console.log("Address:", req.query.address);


    try{
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    }catch(error){
        res.status(404).json({message:'Coordinates not found'});
    }
}

module.exports.getDistanceTime = async(req, res, next) => {
    console.log("Inside controller, req.query:", req.query);
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { origin, destination } = req.query;
        console.log(req.query);
        const distanceTime = await mapService.getDistanceTime(origin, destination);

        res.status(200).json(distanceTime);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;

        const suggestions = await mapService.getAutoCompleteSuggestions(input);

        res.status(200).json(suggestions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
