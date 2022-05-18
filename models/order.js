const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp')
const CartSchema = new mongoose.Schema({
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
    user: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    total_price :{
        type: Number,
        default: 0
    },
    items: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    status: {
        type: String,
        default: 'Draft'
    }
})

ProductSchema.plugin(timestamp);

module.exports = mongoose.model('Product', ProductSchema);
