const User = require('../models/User');

exports.showRegisterForm = (req, res) => res.render('register');

exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({ name, email, password, role });
  res.redirect('/login');
};

exports.showLoginForm = (req, res) => res.render('login');

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) return res.send('Invalid credentials');

  req.session.user = {
    _id: user._id.toString(), 
    name: user.name,
    role: user.role,
  };

  console.log('User logged in:', req.session.user); 

  res.redirect('/');
};

exports.logoutUser = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};
