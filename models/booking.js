const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Booking = sequelize.define(
  "Booking",
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

    guest_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    check_in_date: DataTypes.DATE,
    check_out_date: DataTypes.DATE,

    total_price: DataTypes.FLOAT,

    status: {
      type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
      toDefaultValue: "pending",
    },
  },
  {
    tableName: "bookings",
    timestamps: true,
  },
);

Booking.associate = (models) => {
  Booking.belongsTo(models.Property, {
    foreignKey: "property_id",
  });

  Booking.belongsTo(models.User, {
    foreignKey: "guest_id",
  });

  Booking.hasOne(models.Payment, {
    foreignKey: "booking_id",
  });
};

module.exports = Booking;
