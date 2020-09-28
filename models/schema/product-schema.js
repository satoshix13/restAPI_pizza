const mongoose = require('mongoose')


module.exports = new mongoose.Schema({
  title: { type: String, required: true},
  description: { type: String, required: true},
  image: { type: String, required: true},
  category: { type: String, required: true },
  featured: { type: Boolean, default: false},
  price: { type: Number, required: true},
  enabled: { type: Boolean, default: true }
})

