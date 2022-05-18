const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const config = require('../config/index');
const auth = require('./auth');

// Create draft order (by using cart id, add every items in cart into order)
// Confirm order (arg: order.id, body: {order.status})
// Update order status (Optional)

router.use((req, res, next) => {
    next();
});


// Get list of cart
router.get("/:id", async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: {
            result : 'Get list of order'
        }
    });
    next();
})

// Remove items from cart
// With response body
router.delete("/:id", async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: {
            result: 'Remove item from cart'
        }
    });
    next();
})

// Update cart
// With response body 
router.put("/:id", async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: {
            result: 'Update cart'
        }
    });
    next();
})

// Place cart to order
// After create draft order, clear cart
router.put("/:id/order", async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: {
            result: 'Place a draft order'
        }
    });
    next();
})

module.exports = {
    router: router,
};