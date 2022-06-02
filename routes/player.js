const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const auth = require('./auth');
const player = require('../models/player');
const playerStatistics = require('../models/player_statistics');
const queryAll = require('./aciton').queryAll;

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
        
    const result = await queryAll(playerStatistics.PlayerStatistics, filter={'player.id' : parseInt(req.params.id)});
    res.status(200).json({
        success: true,
        data: result
    });
    next();
})

module.exports = {
    router: router,
};


// Create player and player statistics models