const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: String,
    gender: { type: String, enum: ['male', 'female'] },
    birth_date: Date,
    date_created: { type: Date, default: Date.now },
    email: { type: String, required: true },
    password: { type: String, minlength: 6, required: true }

})

module.exports = {
    Schema: mongoose.model('user', userSchema)
}