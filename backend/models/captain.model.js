const mongoose = require('mongoose')
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')


const captainSchema= new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'firstname must be at least 3 characters']
        },
        lastname:{
            type:String,
            minlength:[3,'lastname must be at least 3 characters']
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        Match: [/^\S+@\S+\.\S+$/,' Please enter a valid email']
    },
    password:{
        type:String,
        required:true,
        select:false, 
    },
    socketId:{
        type:String,
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,' color must be at least 3 characters'],
        },
        numberPlate:{
            type:String,
            required:true,
            minlength:[3,'numberPlate must be at least 3 characters'],
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car','motorcycle','auto'],

        },
        capacity:{
            type:Number,
            required:true,
            minlength:[1,' capacity must be at least 1'],
        }
    },
    location:{
        latitude:{
            type:Number,
        },
        longitude:{
            type:Number,
        }
    }
})

captainSchema.methods.generateAuthToken= async function(){
    const token= await jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    return token
}

captainSchema.methods.comparePassword= async function(password){
    return await bcrypt.compare(password,this.password)
}

captainSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10)
}

const captainModel = new mongoose.model('captainSchema',captainSchema)
module.exports = captainModel 