const dotenv=require('dotenv')
dotenv.config()
const cors=require('cors')
const express = require('express')
const app = express()
const connectToDb=require('./db/db')
const userRouter = require('./routes/user.route')
const captainRouter = require('./routes/captain.route')
const cookieParser = require('cookie-parser')
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

module.exports=app