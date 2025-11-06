const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    name: { type: String },
    price: { type: Number },
    stock: { type: Number } ,
    // approvestatus: { type: Boolean, default: false } 
},{
    timestamps: true
})

module.exports = mongoose.model('products', userSchema)
