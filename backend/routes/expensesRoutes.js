// Import Express JS
const express = require("express");

// Import Expenses API Controllers
const {
  addExpense,
  getExpenseDetails,
  getExpenseDetailById,
  deleteExpenseById,
  updateExpenseDetailById,
} = require("../controller/expensesController");

// Import User Authentication Middleware
const { authUser } = require("../middlewares/authMiddleware");

// Create Router From Express JS
const router = express.Router();

// Add New Expense Detail
router.route("/houseBudget/expense").post(authUser, addExpense);

// Get Expense Detail List Based On User
router
  .route("/houseBudget/expense/lists/:type?/:year?/:month?")
  .get(authUser, getExpenseDetails);

router
  .route("/houseBudget/expense/:id")
  .get(getExpenseDetailById)
  .put(authUser, updateExpenseDetailById)
  .delete(authUser, deleteExpenseById);

module.exports = router;
