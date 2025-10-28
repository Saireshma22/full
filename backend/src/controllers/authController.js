const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ success:false, errors: errors.array() });

    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if(existing) return res.status(400).json({ success:false, message:'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success:true, token, user: { _id:user._id, name:user.name, email:user.email } });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ success:false, errors: errors.array() });

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ success:false, message:'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if(!ok) return res.status(400).json({ success:false, message:'Invalid credentials' });

    const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET, { expiresIn:'1h' });
    res.json({ success:true, token, user: { _id:user._id, name:user.name, email:user.email } });
  } catch (err) { next(err); }
};
