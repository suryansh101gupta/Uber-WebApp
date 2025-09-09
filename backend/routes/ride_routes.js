const express = require ('express');
const router = express.Router();
const { body } = require ('express-validator');
const rideController = require('../controllers/ride_controller');
const authMiddleware = require('../middlewares/auth_middleware');


router.post('/create', 
    // body('userId').isString().isLength({ min: 24, max:24 }).withMessage('Invalid UserId'),
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min:3 }).withMessage('Invalid Destination address'),
    body('vehicleType').isString().isIn(['auto', 'cab', 'biketaxi']).withMessage('Invalid vehicle type '),
    rideController.createRide
)


module.exports = router;