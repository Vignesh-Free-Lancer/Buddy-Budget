// Import express js
const express = require("express");

// Import Feedback Controller Module
const {
  addFeedbackController,
  getFeedbackDataLists,
} = require("../controller/feedbackController");

// Import User Authentication Middleware
const { authUser } = require("../middlewares/authMiddleware");

// Create Router From Express Js
const router = express.Router();

// Create Feedback
router.route("/houseBudget/feedback").post(authUser, addFeedbackController);

// Get Feedback Lists
router.route("/houseBudget/feedback/lists").get(getFeedbackDataLists);

module.exports = router;
