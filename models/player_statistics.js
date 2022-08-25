const mongoose = require('mongoose');
const Schema = mongoose.Schema;
    
const PlayerStatisticsSchema = new Schema({}, { strict: false});
const PlayerStatistics = mongoose.model('Player_statistics', PlayerStatisticsSchema, 'player_statistics');
    
module.exports = { PlayerStatistics };