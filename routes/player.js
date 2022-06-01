const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const auth = require('./auth');
const player = require('../models/player');
const playerStatistics = require('../models/player_statistics');

router.use((req, res, next) => {
    next();
});

router.get("/", async (req, res, next) => {
    if (auth.isTokenExpired(req) === true)
        return next(new Error('Token expired'));
        
    const result = await queryAll(player.Player);
    res.status(200).json({
        success: true,
        data: result
    });
    next();
})

router.get("/:id/details/", async (req, res, next) => {

    if (auth.isTokenExpired(req) === true)
        return next(new Error('Token expired'));
        
    const result = await queryAllStatistics(filter={'player.id' : parseInt(req.params.id)});
    res.status(200).json({
        success: true,
        data: result
    });
    next();
})

function queryAll(object, filter={}) {
    let result;
    try {
        result = object.find(filter);
    } catch {
        return next(new Error('Issue'))
    } finally {
        return result;
    }
}

function queryAllStatistics(filter={}) {
    let result;
    try {
        result = playerStatistics.PlayerStatistics.find(filter);
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


// Create player and player statistics models