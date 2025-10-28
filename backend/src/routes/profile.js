const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const User = require('../models/User');

router.get('/', auth, async (req,res)=>{
  const user = await User.findById(req.userId).select('-password');
  res.json(user);
});

module.exports = router;
