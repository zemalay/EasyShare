const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = {
  Schema: mongoose.model("course", courseSchema)
};
