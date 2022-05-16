const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
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
  },
  is_active: {
    type: Boolean,
    default: true
  },
  is_admin: {
    type: Boolean,
    default: true
  },
  member_point: {
    type: Number,
    default: 0
  },
  orders: {
    type: Number,
    default: 0
  }
});

//  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
// https://mongoosejs.com/docs/populate.html

UserSchema.plugin(timestamp);

module.exports = mongoose.model('User', UserSchema);