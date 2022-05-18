const asyncHandler = require("express-async-handler");
const Feedback = require("../models/feedbackModel");

const addFeedbackController = asyncHandler(async (req, res) => {
  const feedbackData = new Feedback({
    userId: req.user._id,
    satisfication: req.body.satisfication,
    usageDuration: req.body.usageDuration,
    usageTime: req.body.usageTime,
    usageInFuture: req.body.usageInFuture,
    referral: req.body.referral,
    feedbackComments: req.body.feedbackComments,
  });

  await feedbackData.save();

  res.status(201).json({
    message:
      "Your feedback submitted successfully. Thanks for your valuable time with us.",
  });
});

const getFeedbackDataLists = asyncHandler(async (req, res) => {
  const feedbackDataLists = await Feedback.find({}, { _v: 0 });
  const totalFeedback = await Feedback.find().count();

  if (feedbackDataLists.length > 0) {
    res.status(201).json({
      totalLength: totalFeedback,
      feedbackDataLists,
    });
  } else if (feedbackDataLists.length === 0) {
    res.status(201).json({
      totalLength: totalFeedback,
      message: "Waiting for customers reposne...",
    });
  } else {
    res.status(400);
    throw new Error("Waiting for feedback...");
  }
});

module.exports = {
  addFeedbackController,
  getFeedbackDataLists,
};
