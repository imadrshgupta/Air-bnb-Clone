const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Amenity = sequelize.define(
  "Amenity",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: DataTypes.STRING,
  },
  {
    tableName: "amenities",
    timestamps: false,
  },
);
Amenity.associate = (models) => {
  Amenity.belongsToMany(models.Property, {
    through: models.PropertyAmenity,
    foreignKey: "amenity_id",
  });
};

module.exports = Amenity;
