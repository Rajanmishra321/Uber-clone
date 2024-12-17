const captainModel = require('../models/captain.model')
const captainService= require('../services/captain.service')
const { validationResult } = require('express-validator');

module.exports.registerCaptain=async (req,res)=>{
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const {fullname, email, password, vehicle} = req.body;

    const isCaptainAlreadyExist= await captainModel.findOne({email})
    if(isCaptainAlreadyExist){
        return res.status(400).json({message:"Captain already exist"})
    }

    const hashedPassword= await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword,    
        color:vehicle.color,
        numberPlate:vehicle.numberPlate,
        vehicleType:vehicle.vehicleType,
        capacity:vehicle.capacity
    })

    const token = await captain.generateAuthToken(captain);

    res.status(200). json({token,captain});
}