const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const uuid = require('uuid/v4');
const { Schema } = mongoose;

const OrderItemSchema = new mongoose.Schema({
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
    originPrice: {
        type: Number,
        default : 0
    },
    salePrice: {
        type: Number,
        default : 0
    },
    printName: {
        type: String,
    },
    printNumber: {
        type: Number
    },
    status: {
        type: String,
        required: true
    }
});

// status

OrderItemSchema.plugin(timestamp);
module.exports = mongoose.model('OrderItems', OrderItemSchema);