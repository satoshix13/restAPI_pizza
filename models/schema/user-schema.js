const mongoose = require('mongoose')


module.exports = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: { type: String, required: false, default: 'user' },
  enabled: { type: Boolean, default: false },
  bio: {type: String, required: false}
})
