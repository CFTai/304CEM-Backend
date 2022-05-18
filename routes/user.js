const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const config =require('../config/index')

router.use((req, res, next) => {
    next();
});

router.put("/profile", async (req, res, next) => {
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

module.exports = router;