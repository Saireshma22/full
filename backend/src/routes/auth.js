const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middlewares/auth");



const router = express.Router();

// Register ✅
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPass = await bcrypt.hash(password, 10);

    user = new User({ name, email, password: hashedPass });
    await user.save();

    res.json({ success: true, message: "Registered Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Login ✅
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user).select("-password");
  res.json(user);
});


module.exports = router;
