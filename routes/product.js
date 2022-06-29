const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const Product = require('../models/product');
const auth = require('./auth');
const product = require('../models/product');
const user = require('../models/user');
const comment = require('../models/comment');
const orderItem = require('../models/order_items');
const { updateOne, queryAll, insertOne, insertMany, deleteOne } = require('./aciton');

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
    if (auth.isTokenExpired(req) === true) {
        res.status(400).json({
            success: false,
            message: 'Token expired'
        });
        return next(new Error('Token expired'));
    }
    const result = await queryAll(product);
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
    if (auth.isTokenExpired(req) === true) {
        res.status(400).json({
            success: false,
            message: 'Token expired'
        });
        return next(new Error('Token expired'));
    }

    const result = await insertMany(product, data=json);

    res.status(200).json({
        success: true,
        data: result
    });
    next();
})

router.get("/:id/detail/", async (req, res, next) => {
    if (auth.isTokenExpired(req) === true) {
        res.status(400).json({
            success: false,
            message: 'Token expired'
        });
        return next(new Error('Token expired'));
    }
    const result = await queryAll(product, filter={'_id' : req.params.id});
    res.status(200).json({
        success: true,
        data: result
    });
    next();
})

router.put("/:id/detail/", async (req, res, next) => {
    if (auth.isTokenExpired(req) === true) {
        res.status(400).json({
            success: false,
            message: 'Token expired'
        });
        return next(new Error('Token expired'));
    }
    res.status(200).json({
        success: true,
        data: {
            result : 'Update product detail'
        }
    });
    next();
})

router.get("/:id/comment/", async (req, res, next) => {
    if (auth.isTokenExpired(req) === true) {
        res.status(400).json({
            success: false,
            message: 'Token expired'
        });
        return next(new Error('Token expired'));
    }
    const result = await queryAll(comment, filter={'comment.product._id' : req.params.id});
    res.status(200).json({
        success: true,
        data: result
    });
    next();
})

router.post("/:id/comment/", async (req, res, next) => {
    if (auth.isTokenExpired(req) === true) {
        res.status(400).json({
            success: false,
            message: 'Token expired'
        });
        return next(new Error('Token expired'));
    }
    let { content, rating } = req.body;
    if (rating === null || rating === 0) {
        res.status(400).json({
            success: false,
            message: 'rating cannot be null or 0'
        })
        return next(new Error('Request body issue'));
    }
    // Query product
    let targetProduct = await queryAll(product, filter={'_id' : req.params.id});
    let targetUser = await queryAll(user, filter={'_id': auth.getLoginedUser(req)});
    // Create commnet object
    const result = await insertOne(comment, {content: content, rating: rating, user: targetUser[0], product: targetProduct[0]});
    // create response
    res.status(200).json({
        success: true,
        data: {
            comment: { 
                id: result.id,
                content: result.content,
                rating: result.rating,
                createAt: result.createdAt,
            }
        }
    });
    next();
})

router.delete("/:id/comment/:comment_id/", async (req, res, next) => {
    if (auth.isTokenExpired(req) === true) {
        res.status(400).json({
            success: false,
            message: 'Token expired'
        });
        return next(new Error('Token expired'));
    }
    const result = await deleteOne(comment, { '_id': req.params.comment_id})
    res.status(200).json({
        success: true,
        data: result
    });
})

router.post("/:id/cart/", async (req, res, next) => {
    if (auth.isTokenExpired(req) === true) {
        res.status(400).json({
            success: false,
            message: 'Token expired'
        });
        return next(new Error('Token expired'));
    }
    // Get request body (quantity, printName(optional), printNumber(optional))
    let { quantity, printName, printText } = req.body
    // Query product
    let targetProduct = await queryAll(product, filter={'_id' : req.params.id});
    console.log(targetProduct);
    let targetUser = await queryAll(user, filter={'_id': auth.getLoginedUser(req)});
    console.log(targetUser);
    // Create commnet object
    const result = await insertOne(orderItem, {
        order: null, 
        product: targetProduct[0], 
        user: targetUser[0], 
        quantity: quantity, 
        originPrice: targetProduct[0].price,
        salePrice: targetProduct[0].salePrice,
        printName: printName,
        printNumber: printText,
        status: 'draft'
    });
    // create response
    res.status(200).json({
        success: true,
        data: {
            comment: { 
                id: result.id,
                status: result.status
            }
        }
    });
    next();
})

// Add item to favourite
router.put("/:id/favourite/", async (req, res, next) => {
    if (auth.isTokenExpired(req) === true) {
        res.status(400).json({
            success: false,
            message: 'Token expired'
        });
        return next(new Error('Token expired'));
    }
    const targetUser = await user.find({
        '_id': auth.getLoginedUser(req),
        'favourite' : req.params.id
    })
    if (targetUser.length === 0) {
        // append product to favourite
        await updateOne(
            user,
            {'_id': auth.getLoginedUser(req)},
            {$push: {
                'favourite' : req.params.id
            }}
        )
    } else {
        // pull out from favourite
        await updateOne(
            user,
            {'_id': auth.getLoginedUser(req)},
            {$pull: {
                'favourite' : req.params.id
            }}
        )
    }
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