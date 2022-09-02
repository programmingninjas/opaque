const mongoose = require('mongoose')
const connect = () => {
  return mongoose.connect("mongodb-url", {   // Use your own mongodb account
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

module.exports = {
  connect
}
