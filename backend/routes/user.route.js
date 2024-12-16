const express = require('express');
const router = express.Router();
const {body } = require('express-validator');
const { registerUser } = require('../controllers/user.controller');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('firstname must be at least 3 characters'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 character long')
],registerUser)

module.exports=router

