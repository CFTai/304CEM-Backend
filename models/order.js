const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp')
const { Schema } = mongoose;

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
    totalPrice :{
        type: Number,
        default: 0
    },
    deliverFee :{
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'Draft'
    },
    deliverDate: {
        type : Date,
        default: Date.now
    }
})

ProductSchema.plugin(timestamp);

module.exports = mongoose.model('Product', ProductSchema);


// Order status:
// Draft
// Submit
// Confirm
// Processing
// Delivered
// Returned
