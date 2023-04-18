const mongoose = require('mongoose');
const Review = require('./review');
const { Schema } = mongoose;

const imageSchema = new Schema({
  url: String,
  filename: String,
});

imageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/t_media_lib_thumb');
});

imageSchema.virtual('square').get(function () {
  return this.url.replace('/upload', '/upload/t_square_300');
});

const opts = { toJSON: { virtuals: true } };

const campgroundSchema = new Schema(
  {
    title: String,
    images: [imageSchema],
    geometry: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    price: Number,
    description: String,
    location: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  opts
);

campgroundSchema.virtual('properties.popUpMarkup').get(function () {
  return `
  <img src="${this.images[0].thumbnail}" alt="${this.title}" /><br>
  <strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
  <p>${this.description.substring(0, 20)}...</p>`;
});

campgroundSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model('Campground', campgroundSchema);
