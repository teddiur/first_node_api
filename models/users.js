const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true, select: false },
  created_at: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function (next) {
  let user = this;
  if (!user.isModified('password')) return next();

  const encrypted = await bcrypt.hash(user.password, 10);
  user.password = encrypted;
  return next();
});
module.exports = mongoose.model('User', UserSchema);
