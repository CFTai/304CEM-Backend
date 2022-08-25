const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const user = require('../models/user');
const product = require('../models/product');
const config = require('../config/index');
const auth = require('./auth');
const { updateOne, queryAll, insertOne, insertMany, deleteOne } = require('./aciton');


router.use((req, res, next) => {
    next();
});

router.get("/", async (req, res, next) => {
    if (auth.isTokenExpired(req) === true) {
        res.status(400).json({
            success: false,
            message: 'Token expired'
        });
        return next(new Error('Token expired'));
    }
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

// Get user profile
router.get("/profile/", async (req, res, next) => {
    if (auth.isTokenExpired(req) === true) {
        res.status(400).json({
            success: false,
            message: 'Token expired'
        });
        return next(new Error('Token expired'));
    }
    let targetUser = await queryAll(user, filter={'_id': auth.getLoginedUser(req)});
    let list_favourite = await queryAll(product, filter={'_id' : { $in : targetUser[0].favourite}});
    // let list_favourite = await 
    res.status(201).json({
        success: true,
        data: {
            name: targetUser[0].username,
            email: targetUser[0].email,
            point: targetUser[0].member_point,
            orders: targetUser[0].orders,
            favourite: list_favourite
        }
    });
    next();
})

// Update user profile
router.put("/profile/", async (req, res, next) => {
    if (auth.isTokenExpired(req) === true) {
        res.status(400).json({
            success: false,
            message: 'Token expired'
        });
        return next(new Error('Token expired'));
    }
    let { password } = req.body;
    try {
        let targetUser = await queryAll(user, filter={'_id': auth.getLoginedUser(req)});
        const update = await updateOne(
            user,
            {'_id' : targetUser[0]._id},
            {
                password: password
            }
        )
        res.status(201).json({
            success: true,
            data: {
                result: 'success',
            }
        });
        next();
    } catch {
        return next(new Error('Error occured while query user'));
    }
})

module.exports = {
    router: router,
    queryAll: queryAll,
};
