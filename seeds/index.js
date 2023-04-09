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
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate ex vel quia nostrum placeat praesentium veniam modi, incidunt expedita, error aperiam? Molestias itaque explicabo dolorem ullam inventore soluta excepturi eveniet!
      Eveniet animi repellendus voluptate. Soluta dolor, aperiam pariatur at ad rem neque sed facilis placeat beatae fugit fuga cumque consectetur qui deserunt tempora velit praesentium. Vel aperiam accusantium eius iste.`,
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
