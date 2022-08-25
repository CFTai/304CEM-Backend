const mongoose = require('mongoose');
const Schema = mongoose.Schema;
    
const PlayerSchema = new Schema({}, { strict: false});
const Player = mongoose.model('Players', PlayerSchema, 'players');
    
module.exports = { Player };