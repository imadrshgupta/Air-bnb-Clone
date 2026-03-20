const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PropertyAmenity = sequelize.define(
  "PropertyAmenity",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    property_id: DataTypes.INTEGER,
    amenity_id: DataTypes.INTEGER,
  },
  {
    tableName: "property_amenities",
    timestamps: false,
  },
);

module.exports = PropertyAmenity;
