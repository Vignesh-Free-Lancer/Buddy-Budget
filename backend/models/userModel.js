const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var CryptoJS = require("crypto-js");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    emailToken: { type: String },
    isEmailVerified: { type: Boolean },
    isActive: {
      type: Boolean,
      required: true,
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

/*
    ->  Here previously we are using bcryptjs for encrypting password and store it in database.
    ->  When user logging in, at that time we can able to compare user entered password and 
        match with bcrypted password in database. It return true or false only but not able to dcrypt 
        password. So that I commented the below two functions and then the same function I just modified
        using "crypto-js" method.
    ->  So instead of the "npm i bcryptjs" package, I used "npm i crypto-js"
    ->  crypto-js method easily encrypt and decrypt password. It is implemented in userController.js file
        ->  For Example, How to use crypto-js:
            let encryptdPassword = CryptoJS.AES.encrypt(password, "secret key 1").toString();
            var bytes = CryptoJS.AES.decrypt(encryptdPassword, "secret key 1");
            var decryptdPassword = bytes.toString(CryptoJS.enc.Utf8);
            console.log("Encrypt", decryptdPassword);
*/

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }

//   this.password = CryptoJS.AES.encrypt(
//     this.password,
//     "password key"
//   ).toString();
// });

// userSchema.methods.encryptPassword = async function (enteredPassword) {
//   let encryptdPassword = CryptoJS.AES.encrypt(
//     enteredPassword,
//     "password key"
//   ).toString();
//   return encryptdPassword;
// };

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   const bytes = CryptoJS.AES.decrypt(this.password, "password key");
//   const decryptdPassword = bytes.toString(CryptoJS.enc.Utf8);
//   if (decryptdPassword === enteredPassword) return true;
// };

// userSchema.methods.decryptPassword = async function (encryptedPassword) {
//   const bytes = CryptoJS.AES.decrypt(encryptedPassword, "password key");
//   const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
//   return decryptedPassword;
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
