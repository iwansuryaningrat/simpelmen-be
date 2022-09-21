import configs from "../configs/db.configs.js";
import Sequelize from "sequelize";

const sequelize = new Sequelize(configs.DB, configs.USER, configs.PASSWORD, {
  host: configs.HOST,
  port : configs.PORT,
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
import Product_Category from "./product_category.model.js";
import Product from "./product.model.js";
import product_detail from "./product_detail.model.js";
import finishing from "./finishing.model.js";
import chat from "./chat.model.js";
import size from "./size.model.js";
import delivery_detail from "./delivery_detail.model.js";
import transaction from "./transaction.model.js";
import material from "./material.model.js";
import Status_Histories from "./status_histories.model.js";
import { config } from "dotenv";
db.Product_Category = Product_Category(sequelize, Sequelize);
db.user = userModel(sequelize, Sequelize);
db.Product = Product(sequelize, Sequelize);
db.product_detail = product_detail(sequelize, Sequelize);
db.finishing = finishing(sequelize, Sequelize);
db.chat = chat(sequelize, Sequelize);
db.size = size(sequelize, Sequelize);
db.delivery_detail = delivery_detail(sequelize, Sequelize);
db.transaction = transaction(sequelize, Sequelize);
db.material = material(sequelize, Sequelize);
db.Status_Histories = Status_Histories(sequelize, Sequelize);
//relational between tabel user and transaction
db.user.hasMany(db.transaction, {
  foreignKey: "user_id",
  as: "transactions",
});
db.transaction.belongsTo(db.user, {
  foreignKey: "user_id",
  as: "user",
});
//relational between tabel finishing and product
db.finishing.hasMany(db.Product, {
  foreignKey: "finishing_id",
  as: "products",
});
db.Product.belongsTo(db.finishing, {
  foreignKey: "finishing_id",
  as: "finishing",
});
//relational between tabel product_detail and size
db.product_detail.belongsTo(db.size, {
  foreignKey: "size_id",
  as: "size",
});

db.size.hasMany(db.product_detail, {
  foreignKey: "size_id",
  as: "product_details",
});
//relational between tabel product_detail and material
db.product_detail.belongsTo(db.material, {
  foreignKey: "material_id",
  as: "material",
});
db.material.hasMany(db.product_detail, {
  foreignKey: "material_id",
  as: "product_details",
});
//relational between tabel product_detail and product_category
db.product_detail.belongsTo(db.Product_Category, {
  foreignKey: "product_category_id",
  as: "product_category",
});
db.Product_Category.hasMany(db.product_detail, {
  foreignKey: "product_category_id",
  as: "product_details",
});
//relational between tabel transaction and delivery_detail
db.transaction.hasMany(db.delivery_detail, {
  foreignKey: "transaction_id",
  as: "delivery_details",
});
db.delivery_detail.belongsTo(db.transaction, {
  foreignKey: "transaction_id",
  as: "transaction",
});
//relational between tabel product and transaction
db.Product.hasMany(db.transaction, {
  foreignKey: "product_id",
  as: "transactions",
});
db.transaction.belongsTo(db.Product, {
  foreignKey: "product_id",
  as: "product",
});
//relational between tabel product_detail and product
db.product_detail.hasMany(db.Product, {
  foreignKey: "product_detail_id",
  as: "products",
});
db.Product.belongsTo(db.product_detail, {
  foreignKey: "product_detail_id",
  as: "product_detail",
});
//relational between tabel status_histories and transaction
db.Status_Histories.hasMany(db.transaction, {
  foreignKey: "status_history_id",
  as: "transactions",
});
db.transaction.belongsTo(db.Status_Histories, {
  foreignKey: "status_history_id",
  as: "status_histories",
});
export default db;
