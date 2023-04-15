const Campground = require('../models/campground');

const getCampgrounds = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
};

const getCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id)
    .populate({ path: 'reviews', populate: { path: 'author' } })
    .populate('author');
  console.log(campground);
  if (!campground) {
    req.flash('error', 'Cannot find that campground!');
    return res.redirect('/campgrounds');
  }
  res.render('campgrounds/show', { campground });
};

const newCampground = (req, res) => {
  res.render('campgrounds/new');
};

const createCampground = async (req, res, next) => {
  const campground = new Campground(req.body.campground);
  req.files.forEach((file) => {
    campground.images.push({
      url: file.path,
      filename: file.filename,
    });
  });
  campground.author = req.user._id;
  await campground.save();
  console.log('new campground', campground);
  req.flash('success', 'Successfully made a new campground!');
  res.redirect(`/campgrounds/${campground._id}`);
};

const editCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    req.flash('error', 'Cannot find that campground!');
    return res.redirect('/campgrounds');
  }
  res.render('campgrounds/edit', { campground });
};

const updateCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  req.flash('success', 'Successfully updated campground!');
  res.redirect(`/campgrounds/${campground._id}`);
};

const deleteCampground = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect('/campgrounds');
};

module.exports = {
  getCampgrounds,
  getCampground,
  newCampground,
  createCampground,
  editCampground,
  updateCampground,
  deleteCampground,
};
