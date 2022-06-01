const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const { uuid } = require('uuidv4');


const ProductSchema = new mongoose.Schema({
    sku: {
        type: String,
        default: () => uuid(),
    },
    name: {
        type: String,
        required: true,
        trim: true,
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
    stockDate: {
        type : Date,
        default: Date.now
    }
})

ProductSchema.plugin(timestamp);

module.exports = mongoose.model('Product', ProductSchema);
