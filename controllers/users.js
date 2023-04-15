const User = require('../models/user');

const registerForm = (req, res) => {
  res.render('users/register');
};

const loginForm = (req, res) => {
  res.render('users/login');
};

const registerUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash('success', 'Welcome to YelpCamp!');
      res.redirect('/campgrounds');
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('register');
  }
};

const loginUser = (req, res) => {
  req.flash('success', 'Welcome back!');
  const redirectUrl = req.session.returnTo || '/campgrounds';
  res.redirect(redirectUrl);
  delete req.session.returnTo;
};

const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
  });
  req.flash('success', 'Goodbye!');
  res.redirect('/login');
};

module.exports = {
  registerForm,
  loginForm,
  registerUser,
  loginUser,
  logoutUser,
};
