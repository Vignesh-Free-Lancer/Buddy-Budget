const mongoose = require("mongoose");

const expensesSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    particular: {
      type: String,
      required: true,
    },
    particularType: {
      type: String,
      required: false,
      default: "custom",
    },
    estimatedCost: {
      type: Number,
      required: true,
      default: 0,
    },
    actualCost: {
      type: Number,
      required: true,
      default: 0,
    },
    paymentType: {
      type: String,
      required: true,
    },
    paymentBank: {
      type: String,
      required: false,
    },
    paymentDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const Expenses = mongoose.model("Expenses", expensesSchema);

module.exports = Expenses;
