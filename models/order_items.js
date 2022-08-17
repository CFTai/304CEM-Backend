const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const { Schema } = mongoose;

const OrderItemSchema = new mongoose.Schema({
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productSize: {
        type: String,
        required: true
    },
    userId: {
        type: String,
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
        default: 'draft'
    }
});

// status

OrderItemSchema.plugin(timestamp);
module.exports = mongoose.model('OrderItems', OrderItemSchema);