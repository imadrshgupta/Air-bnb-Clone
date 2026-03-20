const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database Connected Successfully");
  } catch (error) {
    console.error("❌ Unable to connect:", error);
  }
}

if (!process.env.DB_NAME) {
  throw new Error("DB_NAME missing in .env");
}

module.exports = { sequelize, connectDB };
