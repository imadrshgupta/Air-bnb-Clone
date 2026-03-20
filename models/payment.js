const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    amount: DataTypes.FLOAT,

    payment_method: DataTypes.STRING,

    payment_status: {
      type: DataTypes.ENUM("success", "failed", "pending"),
      defaultValue: "pending",
    },

    transaction_id: DataTypes.STRING,
  },
  {
    tableName: "payments",
    timestamps: true,
  },
);

Payment.associate = (models) => {
  Payment.belongsTo(models.Booking, {
    foreignKey: "booking_id",
  });
};

module.exports = Payment;
