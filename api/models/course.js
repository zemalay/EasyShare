const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    name: String
})

module.exports = {
    Schema: mongoose.model('course', courseSchema)
}