const express = require("express");
const Feedback = require("../models/Feedback");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Submit feedback
router.post("/", protect, async (req, res) => {
  const { course, rating, message } = req.body;
  const feedback = await Feedback.create({
    course, rating, message, user: req.user.id
  });
  res.json(feedback);
});

// Get my feedback
router.get("/my", protect, async (req, res) => {
  const feedbacks = await Feedback.find({ user: req.user.id }).limit(10);
  res.json(feedbacks);
});

// Edit feedback
router.put("/:id", protect, async (req, res) => {
  const fb = await Feedback.findById(req.params.id);
  if (!fb || fb.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }
  fb.course = req.body.course || fb.course;
  fb.rating = req.body.rating || fb.rating;
  fb.message = req.body.message || fb.message;
  await fb.save();
  res.json(fb);
});

// Delete feedback
router.delete("/:id", protect, async (req, res) => {
  const fb = await Feedback.findById(req.params.id);
  if (!fb || fb.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }
  await fb.remove();
  res.json({ message: "Feedback removed" });
});

module.exports = router;
