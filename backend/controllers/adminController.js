const Feedback = require("../models/Feedback");
const User = require("../models/User");
const Course = require("../models/Course");

// GET /admin/feedback?course=xyz&rating=5
exports.getAllFeedback = async (req, res) => {
  try {
    const query = {};
    if (req.query.course) query.course = req.query.course;
    if (req.query.rating) query.rating = Number(req.query.rating);

    const feedbacks = await Feedback.find(query).populate("user", "name email");
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /admin/users
exports.getAllUsers = async (req, res) => {
  const users = await User.find({ role: "student" }).select("-password");
  res.json(users);
};

// PATCH /admin/users/:id/block
exports.blockUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  user.blocked = !user.blocked;
  await user.save();
  res.json({ message: `User ${user.blocked ? "blocked" : "unblocked"}` });
};

// DELETE /admin/users/:id
exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  await user.remove();
  res.json({ message: "User deleted" });
};

// POST /admin/courses
exports.addCourse = async (req, res) => {
  const { title, description } = req.body;
  const course = await Course.create({ title, description });
  res.status(201).json(course);
};

// PUT /admin/courses/:id
exports.editCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });
  course.title = req.body.title || course.title;
  course.description = req.body.description || course.description;
  await course.save();
  res.json(course);
};

// DELETE /admin/courses/:id
exports.deleteCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });
  await course.remove();
  res.json({ message: "Course deleted" });
};

exports.getFeedbackAnalytics = async (req, res) => {
  try {
    const data = await Feedback.aggregate([
      { $group: { _id: "$course", avgRating: { $avg: "$rating" }, count: { $sum: 1 } } }
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
