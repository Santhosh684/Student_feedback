const Feedback = require("../models/Feedback");
const User = require("../models/User");

// @desc    Create feedback
// @route   POST /api/feedback
// @access  Private (Student)
exports.createFeedback = async (req, res) => {
  try {
    const { course, rating, message } = req.body;
    if (!course || !rating || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const feedback = await Feedback.create({
      course,
      rating,
      message,
      user: req.user.id,
    });

    res.status(201).json(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get my feedbacks
// @route   GET /api/feedback/my
// @access  Private (Student)
exports.getMyFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update feedback
// @route   PUT /api/feedback/:id
// @access  Private (Owner)
exports.updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });
    if (feedback.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    feedback.course = req.body.course || feedback.course;
    feedback.rating = req.body.rating || feedback.rating;
    feedback.message = req.body.message || feedback.message;

    await feedback.save();
    res.json(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete feedback
// @route   DELETE /api/feedback/:id
// @access  Private (Owner)
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });
    if (feedback.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await feedback.remove();
    res.json({ message: "Feedback deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
