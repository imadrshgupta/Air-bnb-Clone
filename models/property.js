const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Property = sequelize.define(
  "Property",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: DataTypes.STRING,
    description: DataTypes.TEXT,

    price_per_night: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,

    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,

    max_guests: DataTypes.INTEGER,
    bedrooms: DataTypes.INTEGER,
    bathrooms: DataTypes.INTEGER,

    avg_rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    host_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "properties",
    timestamps: true,
  },
);

Property.associate = (models) => {
  //Property belongs to host
  Property.belongsTo(models.User, {
    foreignKey: "host_id"
  });

  //property -> Images
  Property.hasMany(models.PropertyImage, {
    foreignKey: "property_id"
  });

  //property -> bookings
  Property.hasMany(models.Booking, {
    foreignKey: "property_id"
  });
  //property -> Reviews
  Property.hasMany(models.Review, {
    foreignKey: "property_id"
  });

  //amenities manat to many
  Property.belongsToMany(models.Amenity, {
    through: models.PropertyAmenity,
    foreignKey: "property_id"
  });

  //wishlist users
  Property.belongsToMany(models.User, {
    through: models.Wishlist,
    foreignKey: "property_id"
  });
}

module.exports = Property;
