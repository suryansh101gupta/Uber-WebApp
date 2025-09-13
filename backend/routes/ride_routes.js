const express = require ('express');
const router = express.Router();
const { body, query } = require ('express-validator');
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

router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min:3 }).withMessage('Invalid Destination address'),
    rideController.getFare
)

router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.confirmRide
)

router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 4, max: 4 }).withMessage('Invalid OTP'),
    rideController.startRide
)

router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.endRide
)

module.exports = router;