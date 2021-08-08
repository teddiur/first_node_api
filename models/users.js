const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true, select: false },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
