const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');

const {
  registerForm,
  loginForm,
  registerUser,
  loginUser,
  logoutUser,
} = require('../controllers/users');

router.route('/register').get(registerForm).post(catchAsync(registerUser));

router
  .route('/login')
  .get(loginForm)
  .post(
    passport.authenticate('local', {
      failureFlash: true,
      failureRedirect: '/login',
    }),
    loginUser
  );

router.get('/logout', logoutUser);

module.exports = router;
