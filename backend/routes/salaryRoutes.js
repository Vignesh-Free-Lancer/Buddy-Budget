// Import Express JS
const express = require("express");

// Import Salary API Controllers
const {
  addSalaryDetails,
  getSalaryDetailLists,
  getSalaryDetailById,
  updateSalaryDetailById,
  deleteSalaryDetailById,
} = require("../controller/salaryController");

// Import User Authentication Middleware
const { authUser } = require("../middlewares/authMiddleware");

// Create Router From Express JS
const router = express.Router();

// Add New Salary Detail
router.route("/houseBudget/salary").post(authUser, addSalaryDetails);

// Get Salary Detail List Based On User
router.route("/houseBudget/salary/lists").get(authUser, getSalaryDetailLists);

router
  .route("/houseBudget/salary/:id")
  .get(getSalaryDetailById)
  .put(authUser, updateSalaryDetailById)
  .delete(authUser, deleteSalaryDetailById);

module.exports = router;
