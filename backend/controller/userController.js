// Import Async Handler For Async Operation
const asyncHandler = require("express-async-handler");
// Import Crypto For Generate Email Token
const crypto = require("crypto");
// Import JWT Token For User Authentication
const generateToken = require("../utils/generateToken");
// Import Node-Mailer For Send Confirmation Link To User Mail
const nodeMailer = require("nodemailer");
// Import User Schema
const User = require("../models/userModel");

// Import Confirmation Mail File
const sendConfirmationEmail = require("../utils/mailer");

// let transporter = nodeMailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.MAIL_USERNAME,
//     pass: process.env.MAIL_PASSWORD,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// Create New User
const addUser = asyncHandler(async (req, res) => {
  const { userName, email, password, gender, dob, pic, isAdmin, isActive } =
    req.body;

  // Check User Exists Or Not
  const userExists = await User.find({ email: email.toLowerCase() });

  const getExistingUser = userExists.find((obj) => {
    return obj;
  });

  if (
    userExists.length > 0 &&
    !getExistingUser.isEmailVerified &&
    getExistingUser.emailToken !== null
  ) {
    res.status(400);
    throw new Error(
      "Already registered with this email. Please check your mail inbox/spam folder & activate your account."
    );
  }

  if (userExists.length > 0 && getExistingUser.isActive) {
    res.status(400);
    throw new Error("Email already exists");
  }

  //If User Not Exists, Create New User
  const user = await User.create({
    userName,
    email: email.toLowerCase(),
    password,
    gender,
    dob,
    pic,
    emailToken: crypto.randomBytes(64).toString("hex"),
    isEmailVerified: false,
    isActive: false,
  });

  const emailResponse = await sendConfirmationEmail(
    "new-user",
    user.email,
    user.userName,
    user.emailToken
  );

  if (emailResponse.accepted.length > 0) {
    res.status(201).json({
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      statusCode: 201,
      message: "Account created successfully",
    });
  } else {
    res.status(400);
    throw new Error("Email verification link sent failed, Please try again!");
  }

  // Send Verification Mail To User
  // let mailOptions = {
  //   from: '"Verify Your Mail" <developer.vicky@gmail.com>',
  //   to: user.email.toLowerCase(),
  //   subject: "Buddy-Budget - Verify Your Email",
  //   html: `<h2>Hi ${user.userName},</h2>
  //         <h3>Thanks for registering on our site.</h3>
  //         <h4>Pleaser verify your email to access your account.</h4>
  //         <p><a href="http://${process.env.DOMAIN}/user/email-account/activate/${user.emailToken}">Click here - To activate your Email</a></p>
  //         <P style="margin-top:30px;">Regards,</p>
  //         <p>Support Team</p>`,
  // };

  // transporter.sendMail(mailOptions, async function (error, response) {
  //   if (error) {
  //     res.status(400);
  //     throw new Error("Email verification link sent failed, Please try again!");
  //   } else {
  //     res.status(201).json({
  //       email: user.email,
  //       isEmailVerified: user.isEmailVerified,
  //       statusCode: 201,
  //       message: "Account created successfully",
  //     });
  //   }
  // });
});

// Confirm The Email Verification Link
const userEmailConfirmation = asyncHandler(async (req, res) => {
  const verificationToken = req.params.token;

  const userConfirmEmailLink = await User.findOne({
    emailToken: verificationToken,
    isActive: false,
  });

  if (userConfirmEmailLink) {
    userConfirmEmailLink.isActive = true;
    userConfirmEmailLink.emailToken = null;
    userConfirmEmailLink.isEmailVerified = true;

    const accountActivated = await userConfirmEmailLink.save();
    res.status(201).json({
      accountActivated,
      statusCode: 201,
      message: "User email is confirmed.",
    });
  } else {
    res.status(404);
    throw new Error("Sorry, unable to activate your account.");
  }
});

// Check User Login Status
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email: email.toLowerCase(),
  });

  if (user && (await user.matchPassword(password))) {
    if (!user.isEmailVerified && user.emailToken !== null && !user.isActive) {
      res.status(404);
      throw new Error(
        "Please check your mail inbox/spam folder & activate your account."
      );
    } else if (user.isEmailVerified && !user.isActive) {
      res.status(404);
      throw new Error(
        "Your account is deactivated. Register again to access our site."
      );
    } else {
      res.status(201).json({
        userId: user._id,
        userName: user.userName,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        isActive: user.isActive,
        token: generateToken(user._id),
      });
    }
  } else if (user === null) {
    res.status(404);
    throw new Error("User not yet registered.");
  } else {
    res.status(400);
    throw new Error("Invalid credentials!");
  }
});

// Update User Password
const updateUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.params.id, { __v: 0 });

  if (user && (await user.matchPassword(oldPassword))) {
    user.password = newPassword || user.password;
    const updatedUser = await user.save();

    res.status(202).json({ message: "Password updated successfully!" });
  } else {
    res.status(400);
    throw new Error("Old password is wrong");
  }
});

// Forgot User Password
const userForgotPassword = asyncHandler(async (req, res) => {
  const { newPassword } = req.body;
  console.log("User Controller", req.params, req.body);
  const user = await User.findOne(
    {
      email: req.params.userEmail,
    },
    { __v: 0 }
  );

  if (user && !(await user.matchPassword(newPassword))) {
    user.password = newPassword || user.password;
    await user.save();

    res.status(202).json({ message: "Password changed successfully!" });
  } else {
    res.status(400);
    throw new Error("Password should not be same as old password.");
  }
});

// Get All User, Where User Status is Active
const getUsers = asyncHandler(async (req, res) => {
  const adminStatus = req.user.isAdmin;

  //const users = await User.find({ _id: req.user._id }, { password: 0, _v: 0 });
  const totalUsers = await User.find({ isActive: true }).count();
  const users = await User.find(
    req.user.isAdmin
      ? { isActive: true }
      : { _id: req.user._id, isActive: true },
    {
      password: 0,
      _v: 0,
    }
  );

  if (users.length > 0) {
    res.status(201).json({
      totalLength: totalUsers,
      users,
    });
  } else if (users.length === 0) {
    res.status(404).json({
      totalLength: totalUsers,
      message: "No record found",
    });
  } else {
    res.status(400);
    throw new Error("Users not found");
  }
});

// Get User By Id
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id, { __v: 0 });

  if (user) {
    res.status(201).json({
      user,
    });
  } else {
    res.status(400).json({ message: "User not found" });
  }
});

// Update User Based on Userid
const updateUserById = asyncHandler(async (req, res) => {
  const { userName, email, gender, dob, pic, isActive } = req.body;

  const user = await User.findById(req.params.id, { password: 0, __v: 0 });

  if (user) {
    user.userName = userName || user.userName;
    user.email = email || user.email;
    user.gender = gender || user.gender;
    user.dob = dob || user.dob;
    user.pic = pic || user.pic;
    user.isActive = isActive;

    const updatedUser = await user.save();

    res.status(201).json({
      updatedUser,
      statusCode: 201,
      message: "Updated successfully",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id, { password: 0, __v: 0 });

  if (user) {
    user.isActive = false;

    await user.save();

    res.status(202).json({
      statusCode: 202,
      message: `Dear ${user.userName}, your account deleted successfully`,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  addUser,
  userEmailConfirmation,
  loginUser,
  updateUserPassword,
  userForgotPassword,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
