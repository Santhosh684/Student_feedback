const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const {
  getAllFeedback,
  getAllUsers,
  blockUser,
  deleteUser,
  addCourse,
  editCourse,
  deleteCourse,
  getFeedbackAnalytics
} = require("../controllers/adminController");

// Feedback
router.get("/feedback", protect, admin, getAllFeedback);

// Users
router.get("/users", protect, admin, getAllUsers);
router.patch("/users/:id/block", protect, admin, blockUser);
router.delete("/users/:id", protect, admin, deleteUser);

// Courses
router.post("/courses", protect, admin, addCourse);
router.put("/courses/:id", protect, admin, editCourse);
router.delete("/courses/:id", protect, admin, deleteCourse);

// Analytics
router.get("/analytics/feedback", protect, admin, getFeedbackAnalytics);

module.exports = router;
