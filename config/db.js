const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Watch_store', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;