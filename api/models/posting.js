const mongoose = require('mongoose')

const postingSchema = new mongoose.Schema({
    title: String,
    type: { type: String, required: true, enum: ['tcc', 'artigo', 'postila'] },
    file_path: String,
    date_created: { type: Date, default: Date.now },
    rating: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    subjects: { type: mongoose.Schema.Types.ObjectId, ref: 'subjects' },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'course' }
})

module.exports = {
    Schema: mongoose.model('posting', postingSchema)
}