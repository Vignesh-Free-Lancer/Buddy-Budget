const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

/*
    This authUser middleware will protect any api before call.
    That means if we call get api for salary list, it will authenticate the logged in user.
    If user not having any token it will error otherwise it will show the response for logged in user salary details.
*/
const authUser = asyncHandler(async (req, res, next) => {
  let token;

  // Here We can check the token in api header part. Because we pass the token in header section from redux action file
  // Here Bearer will pass from frontend
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Here we split the token value from header and split the HouseBudget
      token = req.headers.authorization.split(" ")[1];

      // Next decode our token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Here we can find the authorized user and the pass the Id to req
      req.user = await User.findById(decoded.id).select("-password");

      //Finally call next() - i.e We can call next api
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized user, Token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized user");
  }
});

module.exports = { authUser };
