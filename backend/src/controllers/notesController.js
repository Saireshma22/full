const Note = require('../models/Note');

exports.createNote = async (req, res, next) => {
  try {
    const note = await Note.create({ ...req.body, createdBy: req.user.id });
    res.json({ success:true, note });
  } catch(err) { next(err); }
};

exports.getNotes = async (req, res, next) => {
  try {
    const q = req.query.q || '';
    const tag = req.query.tag;
    const filter = { createdBy: req.user.id };
    if(q) filter.$or = [{ title: { $regex:q, $options:'i' } }, { content: { $regex:q, $options:'i' } }];
    if(tag) filter.tags = tag;
    const notes = await Note.find(filter).sort('-createdAt');
    res.json({ success:true, notes });
  } catch(err) { next(err); }
};

exports.updateNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndUpdate({ _id:req.params.id, createdBy:req.user.id }, req.body, { new:true });
    if(!note) return res.status(404).json({ success:false, message:'Not found' });
    res.json({ success:true, note });
  } catch(err) { next(err); }
};

exports.deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({ _id:req.params.id, createdBy:req.user.id });
    if(!note) return res.status(404).json({ success:false, message:'Not found' });
    res.json({ success:true, message:'Deleted' });
  } catch(err) { next(err); }
};
