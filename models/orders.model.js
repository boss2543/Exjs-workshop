const mongoose = require('mongoose')
const { Schema } = mongoose

const ordersSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'users' },
    product_id: { type: Schema.Types.ObjectId, ref: 'products' },
    price: { type: Number },
    quantity: { type: Number , default: 1 } ,
    // approvestatus: { type: Boolean, default: false } 
},{
    timestamps: true
})

module.exports = mongoose.model('orders', ordersSchema)
