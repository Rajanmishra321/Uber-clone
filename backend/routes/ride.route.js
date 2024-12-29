const express = require('express');
const router = express.Router();
const rideController = require('../controllers/ride.controller');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create', authMiddleware.authUser,
    body('pickup').isString().isLength({min: 3}).withMessage('Invalid Pickup Address'),
    body('destination').isString().isLength({min: 3}).withMessage('Invalid Destination Address'),
    body('vehicleType').isString().isIn(['motorcycle','car','auto']).withMessage('Invalid Vehicle Type'),rideController.createRide
 )

 module.exports = router;