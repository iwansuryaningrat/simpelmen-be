// Load .env file
import "dotenv/config";

const configs = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  PORT: process.env.DB_PORT,
  dialect: "mysql",
  pool: {
    max: 300,
    min: 0,
    acquire: 3000,
    idle: 1000,
  },
};

export default configs;
