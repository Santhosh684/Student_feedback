const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  course: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  message: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema);
