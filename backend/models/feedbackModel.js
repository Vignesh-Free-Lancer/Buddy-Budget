const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    satisfication: {
      type: String,
      required: true,
    },
    usageDuration: {
      type: String,
      required: true,
    },
    usageTime: {
      type: String,
      required: true,
    },
    usageInFuture: {
      type: String,
      required: true,
    },
    referral: {
      type: String,
      required: true,
    },
    feedbackComments: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
