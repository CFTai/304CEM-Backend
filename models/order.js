const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp')
const OrderSchema = new mongoose.Schema({
    order_by :{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    UUID: {
        type: String,
        required: true,
        default: () => uuid()
    },
    product : [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
})

OrderSchema.plugin(timestamp);

module.exports = mongoose.model('Order', OrderSchema);