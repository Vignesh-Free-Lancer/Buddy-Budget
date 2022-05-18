const mongoose = require("mongoose");

const grocerySchema = mongoose.Schema(
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
    particulars: {
      type: String,
      required: true,
    },
    qty: {
      type: String,
      required: true,
      default: 0,
    },
    unitPrice: {
      type: Number,

      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const Grocery = mongoose.model("Groceries", grocerySchema);

module.exports = Grocery;
