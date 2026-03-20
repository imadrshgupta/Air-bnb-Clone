const sequelize = require("../config/database");

const User = require("./user");
const Property = require("./property");
const PropertyImage = require("./propertyImage");
const Booking = require("./booking");
const Payment = require("./payment");
const Review = require("./review");
const Amenity = require("./amenity");
const PropertyAmenity = require("./propertyAmenity");
const Wishlist = require("./wishlist");

const models = {
  User,
  Property,
  PropertyImage,
  Booking,
  Payment,
  Review,
  Amenity,
  PropertyAmenity,
  Wishlist,
};

//ryn associate
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = { sequelize, models };
