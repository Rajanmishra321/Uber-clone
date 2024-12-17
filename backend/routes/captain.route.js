const captainController= require('../controllers/captain.controller');
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");


router.post("/register", [
  body("fullname.firstname").isLength({ min: 3 }).withMessage("firstname must be at least 3 characters"),
  body("email").isEmail().withMessage("invalid email"),
  body("password").isLength({ min: 6 }).withMessage("password must be at 6 characters"),
  body('vehicle.color').isLength({min:3}).withMessage('color must be at least 3 characters'),
  body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('invalid vehicle type'),
  body('vehicle.numberPlate').isLength({min:3}).withMessage(' numberplate must be at least 3 characters'),
  body('vehicle.capacity'). isInt({min:1}).withMessage('capacity must be 1'),
],captainController.registerCaptain);

module.exports = router;
