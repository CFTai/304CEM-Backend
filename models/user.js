const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.plugin(timestamp);

module.exports = mongoose.model('User', UserSchema);