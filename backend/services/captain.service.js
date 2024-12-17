const captainModel=require('../models/captain.model')

module.exports.createCaptain=async ({firstname,lastname,email,password,color,vehicleType,numberPlate, capacity})=>{
    if(!firstname || !email || !password || !color || !vehicleType || !numberPlate || !capacity){
        throw new Error('Please fill all the fields')
    }

    const captain = captainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            vehicleType,
            numberPlate,
            capacity
        }
    })
    return captain
} 