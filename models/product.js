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
    salePrice: {
        type: Number,
        default: null
    },
    stock: {
        type: Number,
        default: 0,
        required: true,
    },
    size: {
        type: String,
    },
    description: {
        type: String,
    },
    netWeight :{
        type: Number,
        default: 0
    },
    // category : {
    //     type: Number,
    //     ref: 'Product'
    // },
    stockDate: {
        type : Date,
        default: Date.now
    }
})

ProductSchema.plugin(timestamp);

module.exports = mongoose.model('Product', ProductSchema);
