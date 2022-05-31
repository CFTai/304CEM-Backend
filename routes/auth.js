const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const config =require('../config/index')

router.use((req, res, next) => {
    next();
})

router.post("/login/", async (req, res, next) => {
    let { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch {
        return next(new Error('Error occured while query user'));
    }
    if (!existingUser || existingUser.password != password) {
        return next(new Error('No user found'));
    }
    let token;
    try {
        token = jwt.sign(
            { _id: existingUser._id, email: existingUser.email },
            config.JWT_SECRET,
            {expiresIn: "30m"}
        );
    } catch (err) {
        return next(new Error('JWT sign error'))
    }
    // create response
    res.status(201).json({
        success: true,
        data: {
            userId: existingUser._id,
            email: existingUser.email,
            token: token,
        }
    });
})

router.post("/signup/", async (req, res, next) => {
    const { username, email, password } = req.body;
    const newUser = User({
        username,
        email,
        password
    });
    try { 
        await newUser.save();
    } catch {
        const err = new Error("Create user error ");
        return next(err);
    }
    // Sign jwt token 
    let token;
    try {
        token = jwt.sign(
            {userId: newUser.id, email: newUser.email},
            config.JWT_SECRET,
            {expiresIn: '10m'}
        );
    } catch (err) {
        const error = new Error('jwt sign error');
        return next(error);
    }
    // create response
    res.status(201).json({
        success: true,
        data: {
            userId: newUser.id,
            email: newUser.email,
            token: token,
        }
    });
});


router.get('/accessResource/', (req, res)=>{   
    const token = req.headers.authorization.split(' ')[1];  
    //Authorization: 'Bearer TOKEN'
    if(!token)
    {
        res.status(200).json({success:false, message: "Error!Token was not provided."});
    }
    //Decoding the token
    const decodedToken = jwt.verify(token, config.JWT_SECRET );
    console.log(decodedToken);
    res.status(200).json({
        success:true,
        data: {
            userId:decodedToken.userId, 
            email:decodedToken.email
    }});    
});

function isTokenExpired(req){
    let token = ''
    try {
        token = req.headers.authorization.split(' ')[1];
    } catch {
        return next(new Error('Token authentication not found'));
    }
    if(!token)
    {
        res.status(200).json({success:false, message: "Error!Token was not provided."});
    }
    const decodedToken = jwt.verify(token, config.JWT_SECRET );
    const expired = (Date.now() >= decodedToken.exp * 1000);
    return expired;
}


module.exports = {
    router: router,
    isTokenExpired: isTokenExpired
}