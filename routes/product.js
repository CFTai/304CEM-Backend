const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const Product = require('../models/product');
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
    const result = await queryAll();
    // create response
    res.status(201).json({
        success: true,
        data: {
            result : result
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

router.get("/:id/detail/", async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: {
            result : 'Get product detail'
        }
    });
})

router.put("/:id/detail/", async (req, res, next) => {
    if (auth.isTokenExpired(req) === true)
        return next(new Error('Token expired'));
    
    res.status(200).json({
        success: true,
        data: {
            result : 'Update product detail'
        }
    });
    next();
})

router.post("/:id/comment/", async (req, res, next) => {
    if (auth.isTokenExpired(req) === true)
        return next(new Error('Token expired'));
    // create response
    res.status(200).json({
        success: true,
        data: {
            result : 'Create comment under product'
        }
    });
    next();
})

router.delete("/:id/comment/", async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: {
            result : 'Delete comment'
        }
    });
})

router.post("/:id/cart/", async (req, res, next) => {
    if (auth.isTokenExpired(req) === true)
        return next(new Error('Token expired'));
    
    res.status(200).json({
        success: true,
        data: {
            result : 'Add product to cart'
        }
    });
    next();
})

// Add item to favourite
router.put("/:id/favourite/", async (req, res, next) => {
    if (auth.isTokenExpired(req) === true)
        return next(new Error('Token expired'));
    
    res.status(200).json({
        success: true,
        data: {
            result : 'Add product to favourite'
        }
    });
    next();
})

function queryAll(filter={}) {
    let result;
    try {
        result = Product.find(filter);
    } catch {
        return next(new Error('Issue'))
    } finally {
        return result;
    }
}

module.exports = {
    router: router,
};