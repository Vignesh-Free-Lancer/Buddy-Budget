const mongoose = require("mongoose");

const salaySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    monthlySalary: {
      type: Number,
      required: true,
      default: 0,
    },
    bonusAmount: {
      type: Number,
      default: 0,
    },
    otherAllowance: {
      type: Number,
      default: 0,
    },
    totalCR: {
      type: Number,
      required: true,
      default: 0,
    },
    pf: {
      type: Number,
      default: 0,
    },
    incomeTax: {
      type: Number,
      default: 0,
    },
    professionalTax: {
      type: Number,
      default: 0,
    },
    otherDeductions: {
      type: Number,
      default: 0,
    },
    totalDR: {
      type: Number,
      required: true,
      default: 0,
    },
    netPayAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    isSalaryActive: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const Salary = mongoose.model("Salary", salaySchema);

module.exports = Salary;
