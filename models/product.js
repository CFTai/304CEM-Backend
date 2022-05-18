const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp')
const ProductSchema = new mongoose.Schema({
    UUID: {
        type: String,
        required: true,
        default: () => uuid()
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    brand: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    sale_price: {
        type: Number,
        default: null
    },
    stock: {
        type: Number,
        default: 0,
        required: true,
    },
    description: {
        type: String,
    },
    net_weight :{
        type: Number,
        default: 0
    },
    category : {
        type: Number,
        ref: 'Product'
    },
    arrive_date: {
        type : Date,
        default: Date.now
    }
})

ProductSchema.plugin(timestamp);

module.exports = mongoose.model('Product', ProductSchema);


// Get product list
// Get product comment
// Get product details
// Create cart
// Update cart
// Delete cart
// Create order
// Update order
// Delete order
// Update order status