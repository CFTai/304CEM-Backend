const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const uuid = require('uuid/v4');

const OrderItemSchema = new mongoose.Schema({
    UUID: {
        type: String,
        required: true,
        default: () => uuid()
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

OrderItemSchema.plugin(timestamp);
module.exports = mongoose.model('OrderItems', OrderItemSchema);