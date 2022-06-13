const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const { Schema } = mongoose;

const FavouriteSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref:'Product',
        required: true,
    },
})

FavouriteSchema.plugin(timestamp);

module.exports = mongoose.model('Favourite', CommentSchema);
