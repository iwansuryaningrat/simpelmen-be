import configs from "../configs/db.configs.js";
import Sequelize from "sequelize";

const sequelize = new Sequelize(configs.DB, configs.USER, configs.PASSWORD, {
  host: configs.HOST,
  dialect: configs.dialect,
  operatorsAliases: false,
  pool: {
    max: configs.pool.max,
    min: configs.pool.min,
    acquire: configs.pool.acquire,
    idle: configs.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
import userModel from "./user.model.js";
db.user = userModel(sequelize, Sequelize);

export default db;
