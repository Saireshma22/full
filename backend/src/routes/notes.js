const express = require("express");
const Note = require("../models/Note");
const auth = require("../middlewares/auth");

const router = express.Router();

// Add Note ✅
router.post("/add", auth, async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      content: req.body.content,
      user: req.user
    });

    await note.save();
    res.json({ success: true, note });
  } catch (err) {
    res.status(500).json({ message: "Failed to add note" });
  }
});

// Get All Notes ✅
router.get("/", auth, async (req, res) => {
  const notes = await Note.find({ user: req.user });
  res.json(notes);
});

module.exports = router;
