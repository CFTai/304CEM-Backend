const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const Product = require('../models/product');
const auth = require('./auth');
const queryAll = require('./aciton').queryAll;

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
    res.status(201).json({
        success: true,
        data: {
            'action' : 'Success'
        }
    });
    next();
})

router.get("/:id/detail/", async (req, res, next) => {

    if (auth.isTokenExpired(req) === true)
        return next(new Error('Token expired'));
        
    const result = await queryAll(product.Product, {'product.sku' : parseInt(req.params.id)});
    res.status(200).json({
        success: true,
        data: result
    });
    next();
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

module.exports = {
    router: router,
};