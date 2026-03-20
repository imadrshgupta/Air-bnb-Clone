const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Review = sequelize.define(
  "Review",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    property_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,

    rating: DataTypes.INTEGER,
    Comment: DataTypes.TEXT,
  },
  {
    tableName: "reviews",
    timestamps: "true",
  },
);

Review.associate = (models) => {
  Review.belongsTo(models.Property, {
    foreignKey: "property_id",
  });

  Review.belongsTo(models.User, {
    foreignKey: "user_id",
  });
};

module.exports = Review;
