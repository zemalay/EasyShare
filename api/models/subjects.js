const mongoose = require('mongoose')

const subjectsSchema = new mongoose.Schema({
    name: String
})

module.exports = {
    Schema: mongoose.model('subjects', subjectsSchema)
}