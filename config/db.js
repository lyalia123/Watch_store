const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dariya:Abla_sf65@cluster0.ge6uw.mongodb.net/Watch_store?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Database connected successfully'))
.catch((err) => console.error('Database connection error:', err));

module.exports = mongoose;