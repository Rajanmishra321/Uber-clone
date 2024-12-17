const userModel=require('../models/user.model')
const {generateAuthToken} = require('../models/user.model')
const {comparePassword}=require('../models/user.model')
const {validationResult}=require('express-validator')
const {createUser}=require('../services/user.service')
const blacklisteTokenModel = require('../models/blacklistToken.model')

module.exports.registerUser=async (req,res,next)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const {fullname,email,password}=req.body

    const isUserAlreadyExist= await userModel.findOne({email})
    if(isUserAlreadyExist){
        return res.status(400).json({error: 'User already exist'})
    }

    const hashedPassword= await userModel.hashPassword(password)

    const user = await createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword
    })

    const token = await generateAuthToken()
    res.status(201).json({user,token})
}

module.exports.loginUser=async(req,res,next)=>{


    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const {email,password}=req.body

    const user = await userModel.findOne({email}).select('+password')
    if(!user){
        return res.status(401).json({error:"Invalid email or password"})
    }

    const isMatch= await user.comparePassword(password)
    if(!isMatch){
        return res.status(401).json({error:"Invalid password or email"})
    }

    const token = await user.generateAuthToken()
    res.cookie('token',token)
    res.status(200).json({token,user})
}

module.exports.getUserProfile=async(req,res,next)=>{
    res.status(200).json(req.user)
}

module.exports.logoutUser=async(req,res,next)=>{
    res.clearCookie('token')
    const token = req.cookies.token || req.headers.authorization.split(' ')[1]
    await blacklisteTokenModel.create({token})
    res.status(200).json({message:"Logged out successfully"})
}