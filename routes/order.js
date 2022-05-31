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


// Get list of order
router.get("/", async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: {
            result : 'Get list of detail'
        }
    });
    next();
})

// Get specfic order
router.get("/:id/", async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: {
            result : 'Get specific detail'
        }
    });
    next();
})

// Update order detail
router.put("/:id/", async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: {
            result: 'Update order detail'
        }
    });
    next();
}) 

// Delete order
router.delete("/:id/delete/", async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: {
            result: 'Delete order'
        }
    })
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

module.exports = {
    router: router,
};