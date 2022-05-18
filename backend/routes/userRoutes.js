const express = require("express");
const router = express.Router();

// Import User Authentication Middleware
const { authUser } = require("../middlewares/authMiddleware");

const {
  addUser,
  userEmailConfirmation,
  loginUser,
  updateUserPassword,
  userForgotPassword,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controller/userController");

router.route("/user/profile").post(addUser);
router.route("/user/verify-email/:token").get(userEmailConfirmation);
router.route("/login").post(loginUser);
router.route("/user/reset-password/:id").put(updateUserPassword);
router.route("/user/forgot-password/:userEmail").put(userForgotPassword);
router.route("/user/lists").get(authUser, getUsers);
router
  .route("/user/:id")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

module.exports = router;
