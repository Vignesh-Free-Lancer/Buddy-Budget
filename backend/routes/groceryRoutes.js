// Import Express JS
const express = require("express");

// Import Grocery API Controllers
const {
  addGroceryItem,
  getGroceryItemLists,
  getGroceryItemById,
  updateGroceryItemById,
  deleteGroceryItemById,
} = require("../controller/groceryController");

// Import User Authentication Middleware
const { authUser } = require("../middlewares/authMiddleware");

// Create Router From Express JS
const router = express.Router();

// Add New Grocery Item
router.route("/houseBudget/grocery").post(authUser, addGroceryItem);

// Get Grocery Item Lists Based On User
router
  .route("/houseBudget/grocery/lists/:type?/:year?/:month?")
  .get(authUser, getGroceryItemLists);

router
  .route("/houseBudget/grocery/:id")
  .get(getGroceryItemById)
  .put(authUser, updateGroceryItemById)
  .delete(authUser, deleteGroceryItemById);

module.exports = router;
