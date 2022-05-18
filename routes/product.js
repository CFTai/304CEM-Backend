const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const config = require('../config/index');
const auth = require('./auth');

// Get all products
// Update product's detail
// Create product (optional, should be used in cms)
// Create comment under product
// Remove comment
// Add product into cart

router.use((req, res, next) => {
    next();
});

router.get("/", async (req, res, next) => {
    if (auth.isTokenExpired(req) === true)
        return next(new Error('Token expired'));
    // Get params from url 
    // let test = req.query.xxxx;

    // create response
    res.status(201).json({
        success: true,
        data: {
            email: existingUser.email,
        }
    });
    next();
})

router.post("/", async (req, res, next) => {
    if (auth.isTokenExpired(req) === true)
        return next(new Error('Token expired'));
    let { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch {
        return next(new Error('Error occured while query user'));
    }
    // create response
    res.status(201).json({
        success: true,
        data: {
            email: existingUser.email,
        }
    });
    next();
})

router.put("/", async (req, res, next) => {
    if (auth.isTokenExpired(req) === true)
        return next(new Error('Token expired'));
    let { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch {
        return next(new Error('Error occured while query user'));
    }
    // create response
    res.status(201).json({
        success: true,
        data: {
            email: existingUser.email,
        }
    });
    next();
})

router.post("/:id/comment", async (req, res, next) => {
    if (auth.isTokenExpired(req) === true)
        return next(new Error('Token expired'));
    let { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch {
        return next(new Error('Error occured while query user'));
    }
    // create response
    res.status(201).json({
        success: true,
        data: {
            email: existingUser.email,
        }
    });
    next();
})

router.post("/:id/cart", async (req, res, next) => {
    if (auth.isTokenExpired(req) === true)
        return next(new Error('Token expired'));
    let { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch {
        return next(new Error('Error occured while query user'));
    }
    // create response
    res.status(201).json({
        success: true,
        data: {
            email: existingUser.email,
        }
    });
    next();
})

// app.get("/users/:id",(req,res)=>{ // https://domain.com/users/817178
//     const id = req.params.id ; //  817178
//   })

module.exports = {
    router: router,
};