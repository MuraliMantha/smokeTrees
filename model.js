const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  address: { type: String, required: true },
});

const Address = mongoose.model('Address', addressSchema);
const User = mongoose.model('User', userSchema);

module.exports = {User, Address};
