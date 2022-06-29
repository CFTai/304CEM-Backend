const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const user = require('../models/user');
const orderItem = require('../models/order_items');
const order = require('../models/order');
const config = require('../config/index');
const auth = require('./auth');
const { updateOne, queryAll, insertOne, insertMany, deleteOne } = require('./aciton');

// Create draft order (by using cart id, add every items in cart into order)
// Confirm order (arg: order.id, body: {order.status})
// Update order status (Optional)

router.use((req, res, next) => {
    next();
});


// Get list of order
router.get("/", async (req, res, next) => {
    if (auth.isTokenExpired(req) === true) {
        res.status(400).json({
            success:false,
            message: 'Token expired'
        });
        return next(new Error('Token expired'));
    }
    // Query all items in user's cart
    const targetUser = await queryAll(user, filter={'_id': auth.getLoginedUser(req)});
    const list_cart = await queryAll(order, filter={'user': targetUser});
    res.status(200).json({
        success: true,
        data: {
            result : list_cart
        }
    });
    next();
})

// Get specfic order
router.get("/:id/detail/", async (req, res, next) => {
    if (auth.isTokenExpired(req) === true) {
        res.status(400).json({
            success:false,
            message: 'Token expired'
        });
        return next(new Error('Token expired'));
    }
    const targetOrder = await queryAll(order, filter={'_id': req.params.id});
    const order_items = await queryAll(orderItem, filter={order: targetOrder[0]});
    res.status(200).json({
        success: true,
        data: {
            result : {
                totalPrice : targetOrder[0].totalPrice,
                deliverFee: targetOrder[0].deliverFee,
                status: targetOrder[0].status,
                deliverAt: targetOrder[0].deliverDate,
                items: order_items
            }
        }
    });
    next();
})

// Update order detail
router.put("/:id/detail/", async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: {
            result: 'Delete order'
        }
    })
})

// Delete order
router.delete("/:id/detail/", async (req, res, next) => {
    if (auth.isTokenExpired(req) === true) {
        res.status(400).json({
            success:false,
            message: 'Token expired'
        });
        return next(new Error('Token expired'));
    }
    const result = await deleteOne(order, filter={'_id': req.params.id});
    res.status(200).json({
        success: true,
        data: {
            result: result
        }
    });
    next();
}) 

// Update order status
router.put("/:id/:status/", async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: {
            result: 'Update order status'
        }
    });
    next();
});

// Get personal cart item
router.get("/cart/", async (req, res, next) => {
    if (auth.isTokenExpired(req) === true) {
        res.status(400).json({
            success: false,
            message: 'Token expired'
        });
        return next(new Error('Token expired'));
    }
    const targetUser = await queryAll(user, filter={'_id': auth.getLoginedUser(req)});
    const list_cart = await queryAll(orderItem, filter={'user': targetUser, status:'draft'});
    res.status(201).json({
        success: true,
        data: {
            result : list_cart
        }
    });
    next();
});

// Place order
router.post("/cart/", async (req, res, next) => {
    if (auth.isTokenExpired(req) === true) {
        res.status(400).json({
            success:false,
            message: 'Token expired'
        });
        return next(new Error('Token expired'));
    }
    // Query all items in user's cart
    const targetUser = await queryAll(user, filter={'_id': auth.getLoginedUser(req)});
    const list_cart = await queryAll(orderItem, filter={'user': targetUser, status:'draft'});
    
    // Caculate sum of product's price in cart
    let sum_price = 0
    for (const element of list_cart){
        sum_price += element.salePrice === null ? element.originPrice : element.salePrice;
    }
    // Create orders, status from draft to submitted
    const order_result = await insertOne(order, {
        user: targetUser[0],
        totalPrice: sum_price,
        deliverFee: 23,
    });
    
    // Apply order id into every order item, also change status to confirmed
    console.log(order_result);
    const update = await updateOne(
        orderItem,
        {'_id' : {$in : list_cart}},
        {
            order: order_result,
            status: 'confirmed'
        }
    )
    console.log(update);
    res.status(201).json({
        success: true,
        data: {
            result : update
        }
    });
    next();
});


module.exports = {
    router: router,
};