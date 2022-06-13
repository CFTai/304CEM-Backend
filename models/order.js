const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp')
const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema({
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

OrderSchema.plugin(timestamp);

module.exports = mongoose.model('Order', OrderSchema);


// Order status:
// Draft
// Submit
// Confirm
// Processing
// Delivered
// Returned
