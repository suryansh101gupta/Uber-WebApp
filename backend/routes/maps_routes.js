const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth_middleware');
const mapController = require('../controllers/map_controller')
const { query } = require('express-validator');


router.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getCoordinates
);

router.get('/get-distance-time',
    (req, res, next) => {
        console.log("Incoming query params:", req.query); // 👀 DEBUG
        next();
    },
    query('origin').isString().isLength({ min: 3}),
    query('destination').isString().isLength({ min: 3}),
    (req, res, next) => {
        console.log("After validation check, still passing…");
        next();
    },
    authMiddleware.authUser,
    mapController.getDistanceTime
)

router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggestions
)


module.exports = router;