const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Wishlist = sequelize.define(
  "Wishlist",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: DataTypes.INTEGER,
    property_id: DataTypes.INTEGER,
  },
  {
    tableName: "wishlists",
    timestamps: true,
  },
);

Wishlist.associate = (models) => {
  Wishlist.belongsTo(models.User, {
    foreignKey: "user_id",
  });

  Wishlist.belongsTo(models.Property, {
    foreignKey: "property_id",
  });
};

module.exports = Wishlist;
