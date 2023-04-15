const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');

const {
  getCampgrounds,
  getCampground,
  newCampground,
  createCampground,
  editCampground,
  updateCampground,
  deleteCampground,
} = require('../controllers/campgrounds');

router
  .route('/')
  .get(catchAsync(getCampgrounds))
  .post(isLoggedIn, validateCampground, catchAsync(createCampground));

router.get('/new', isLoggedIn, newCampground);

router
  .route('/:id')
  .get(catchAsync(getCampground))
  .put(isLoggedIn, isAuthor, validateCampground, catchAsync(updateCampground))
  .delete(isLoggedIn, isAuthor, catchAsync(deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(editCampground));

module.exports = router;
