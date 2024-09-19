const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/user.model");
const blacklist = [];

// Signup
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ email, password: hashedPassword });
    await user.save();

    const payload = { user: { id: user.id } };

    const token = jwt.sign(payload, process.env.JWT_SECRET || "vamsikrishna", {
      expiresIn: "1h",
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error(`Server error: ${error.message}`);
    res.status(500).json({ msg: "Server error" });
  }
};

// Signin
const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = { user: { id: user.id } };

    const token = jwt.sign(payload, process.env.JWT_SECRET || "vamsikrishna", {
      expiresIn: "1h",
    });

    res.json({
      success: true,
      message: "Login successful.",
      token,
    });
  } catch (error) {
    console.error(`Server error: ${error.message}`);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get user details
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(`Get user error: ${error.message}`);
    res.status(500).json({ msg: "Server error" });
  }
};

// Logout
const signoutUser = (req, res) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const tokenWithoutBearer = token.startsWith("Bearer ")
    ? token.slice(7)
    : token;

  try {
    blacklist.push(tokenWithoutBearer);
    res.status(200).json({ success: true, message: "Logout successful." });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database and exclude the password field
    const users = await User.find().select("-password");

    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "No users found" });
    }

    res.json(users);
  } catch (error) {
    console.error(`Get all users error: ${error.message}`);
    res.status(500).json({ msg: "Server error" });
  }
};

// Middleware to check for blacklisted tokens
const tokenBlacklistCheck = (req, res, next) => {
  const token = req.header("Authorization");
  const tokenWithoutBearer =
    token && token.startsWith("Bearer ") ? token.slice(7) : token;

  if (blacklist.includes(tokenWithoutBearer)) {
    return res.status(401).json({ msg: "Token has been invalidated." });
  }
  next();
};

// Middleware to authenticate token
const auth = (req, res, next) => {
  const token = req.header("Authorization");
  const tokenWithoutBearer =
    token && token.startsWith("Bearer ") ? token.slice(7) : token;

  if (!tokenWithoutBearer) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(
      tokenWithoutBearer,
      process.env.JWT_SECRET || "vamsikrishna"
    );
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  signoutUser,
  getAllUsers,
  tokenBlacklistCheck,
  auth,
};
