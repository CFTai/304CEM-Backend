const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const { Schema } = mongoose;

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    rating: {
        type: Number,
        required: true,
    },
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

CommentSchema.plugin(timestamp);

module.exports = mongoose.model('Comment', CommentSchema);
