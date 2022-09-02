const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  idU: {
    type: String,
    required: true},
    rec: {
      type: Object,
      required: true},
})

module.exports = mongoose.model('opaque', UserSchema)
