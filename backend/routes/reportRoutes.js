// Import Express JS
const express = require("express");

const {
  getSalaryReportResultLists,
  getExpenseReportResultLists,
  getGroceryReportResultLists,
} = require("../controller/reportController");

// Import User Authentication Middleware
const { authUser } = require("../middlewares/authMiddleware");

// Create Router From Express JS
const router = express.Router();

router
  .route("/houseBudget/reports/salary")
  .get(authUser, getSalaryReportResultLists);

router
  .route("/houseBudget/reports/expense")
  .get(authUser, getExpenseReportResultLists);

router
  .route("/houseBudget/reports/grocery")
  .get(authUser, getGroceryReportResultLists);

module.exports = router;
