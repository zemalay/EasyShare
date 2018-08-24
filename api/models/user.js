const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: String,
  username: { type: String, index: { unique: true } },
  gender: { type: String, enum: ["male", "female"] },
  birth_date: Date,
  date_created: { type: Date, default: Date.now },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  hasPosting: { type: Number, default: 0 },
  token: { type: String, default: "" },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "course" },
  address: { type: String }
});

module.exports = {
  Schema: mongoose.model("user", userSchema)
};
