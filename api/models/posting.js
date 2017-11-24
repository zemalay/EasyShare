const mongoose = require('mongoose')

const postingSchema = new mongoose.Schema({
    title: String,
    type: { type: String, required: true, enum: ['tcc', 'artigo', 'postila'] },
    file_path: String,
    date_created: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
})

module.exports = {
    Schema: mongoose.model('posting', postingSchema)
}