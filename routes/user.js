const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const config = require('../config/index');
const auth = require('./auth');

router.use((req, res, next) => {
    next();
});

router.get("/", async (req, res, next) => {
    if (auth.isTokenExpired(req) === true)
        return next(new Error('Token expired'));
    try {
        result = await queryAll();
    } catch {
        return next(new Error('Error occured while query all user'));
    } finally {
        res.status(200).json({
        success: true,
        data: result
        })
        next();
    }
});

router.put("/profile/", async (req, res, next) => {
    if (auth.isTokenExpired(req) === true)
        return next(new Error('Token expired'));
    let { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch {
        return next(new Error('Error occured while query user'));
    }
    res.status(201).json({
        success: true,
        data: {
            email: existingUser.email,
        }
    });
    next();
})

function queryAll(filter={}) {
    let result;
    try {
        result = User.find(filter).select('username email -_id');
    } catch {
        return next(new Error('Issue'))
    } finally {
        return result;
    }
}

module.exports = {
    router: router,
    queryAll: queryAll,
};

// const cb0 = function (req, res, next) {
//     console.log('CB0')
//     next()
//   }
  
//   const cb1 = function (req, res, next) {
//     console.log('CB1')
//     next()
//   }
  
//   const cb2 = function (req, res) {
//     res.send('Hello from C!')
//   }
  
//   app.get('/example/c', [cb0, cb1, cb2])