const dotenv=require('dotenv')
dotenv.config()
const cors=require('cors')
const express = require('express')
const app = express()
const connectToDb=require('./db/db')
const userRouter = require('./routes/user.route')
const captainRouter = require('./routes/captain.route')
const cookieParser = require('cookie-parser')
const mapsRoutes = require('./routes/maps.routes')
const rideRoutes = require('./routes/ride.route')
connectToDb()


app.use(cors()) 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send('hello world')
})

app.use('/users',userRouter)
app.use('/captains',captainRouter)
app.use('/maps',mapsRoutes)
app.use('/rides',rideRoutes)

module.exports=app