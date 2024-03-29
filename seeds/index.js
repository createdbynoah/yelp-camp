const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose
  .connect('mongodb://localhost:27017/yelp-camp')
  .then(() => {
    console.log('MONGO CONNECTION OPEN');
  })
  .catch((err) => {
    console.log('OH NO, MONGO ERROR!');
    console.log(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 25; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      title: `${sample(descriptors)} ${sample(places)}`,
      description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate ex vel quia nostrum placeat praesentium veniam modi, incidunt expedita, error aperiam? Molestias itaque explicabo dolorem ullam inventore soluta excepturi eveniet!
      Eveniet animi repellendus voluptate. Soluta dolor, aperiam pariatur at ad rem neque sed facilis placeat beatae fugit fuga cumque consectetur qui deserunt tempora velit praesentium. Vel aperiam accusantium eius iste.`,
      price,
      author: '6439d4e37880c1a0d418de32',
      images: [
        {
          url: 'https://res.cloudinary.com/dwlztareq/image/upload/v1681572137/YelpCamp/terxydjtp5bqcuidshdp.jpg',
          filename: 'YelpCamp/terxydjtp5bqcuidshdp',
        },
        {
          url: 'https://res.cloudinary.com/dwlztareq/image/upload/v1681572137/YelpCamp/tq1chsskm58rwc58wk3v.jpg',
          filename: 'YelpCamp/tq1chsskm58rwc58wk3v',
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
