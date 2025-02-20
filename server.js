const express = require('express');
const mongoose = require('./config/db');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const watchRoutes = require('./routes/watchRoutes');
const orderRoutes = require('./routes/orderRoutes');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ 
  secret: 'secretkey', 
  resave: false, 
  saveUninitialized: false 
}));

app.use((req, res, next) => {
  console.log('Session:', req.session);
  next();
});

app.use('/watches', watchRoutes);
app.use(orderRoutes);
app.use(authRoutes);

app.get('/', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.redirect('/watches/home');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
