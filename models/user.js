const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM("guest", "host", "admin"),
      defaultValue: "guest",
    },

    phone: DataTypes.STRING,
    profile_image: DataTypes.STRING,
  },
  {
    tableName: "users",
    timestamps: true,
  },
);

User.associate = (models) => {
  // Host -> Properties
  User.hasMany(models.Property, {
    foreignKey: "host_id",
  });

  //Guest -> booking
  User.hasMany(models.Booking, {
    foreignKey: "guest_id",
  });

  //user -> reviews
  User.hasMany(models.Review, {
    foreignKey: "user_id",
  });

  //wishlist
  User.belongsToMany(models.Property, {
    through: models.Wishlist,
    foreignKey: "user_id",
  });
};

module.exports = User;
