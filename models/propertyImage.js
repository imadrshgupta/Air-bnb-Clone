const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PropertyImage = sequelize.define(
  "PropertyImage",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    property_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    image_url: DataTypes.STRING,
  },
  {
    tableName: "property_images",
    timestamps: true,
  },
);
PropertyImage.associate = (models) => {

PropertyImage.belogsTo(models.Property, {
  foreignKey: "property_id"
});

}

module.exports = PropertyImage;
