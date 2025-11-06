const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    ids: { type: String },
    password: { type: String },
    role: { type: String, default: 'user' } ,
    approvestatus: { type: Boolean, default: false } 
},{
    timestamps: true
})

module.exports = mongoose.model('users', userSchema)
