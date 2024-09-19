const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  registerUser,
  loginUser,
  getUser,
  signoutUser,
  tokenBlacklistCheck,
} = require("../controllers/user.controller");
const auth = require("../utils/middleware");

//Get all users
router.get("/list", getUser);

// Signup route
router.post(
  "/signup",
  [
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  registerUser
);

// Signin route
router.post(
  "/signin",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  loginUser
);

// Protected route to get user info
router.get("/", auth, getUser);

// Logout route
router.post("/signout", tokenBlacklistCheck, signoutUser);

module.exports = router;
