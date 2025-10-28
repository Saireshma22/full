const User = require('../models/User');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ success:true, user });
  } catch(err) { next(err); }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const updates = {};
    if(req.body.name) updates.name = req.body.name;
    // allow updating email only if needed and check uniqueness in production
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new:true }).select('-password');
    res.json({ success:true, user });
  } catch(err) { next(err); }
};
