const mongoose = require('mongoose')

var postingSchema = new mongoose.Schema({
    title: String,
    file_path: String,
    date_created: { type: Date, default: Date.now }

})

module.exports = {
    Schema : mongoose.model('posting', postingSchema)
}