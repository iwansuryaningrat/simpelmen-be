import configs from "../configs/db.configs.js";
import Sequelize from "sequelize";
import { config } from "dotenv";

// DB connection Config
const sequelize = new Sequelize(configs.DB, configs.USER, configs.PASSWORD, {
  host: configs.HOST,
  // port : configs.PORT,
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

// Import models
import Conversations from "./conversations.model.js";
import Delivery_Details from "./delivery_details.model.js";
import Messages from "./messages.model.js";
import Order_Details from "./order_details.model.js";
import Order_Products from "./order_products.model.js";
import Order_Status from "./order_status.model.js";
import Orders from "./orders.model.js";
import Product_Categories from "./product_categories.model.js";
import Product_Finishings from "./product_finishings.model.js";
import Product_Materials from "./product_materials.model.js";
import Product_Sizes from "./product_sizes.model.js";
import Products from "./products.model.js";
import Roles from "./roles.model.js";
import Users from "./users.model.js";

// Insert Models to db
db.conversations = Conversations(sequelize, Sequelize);
db.delivery_details = Delivery_Details(sequelize, Sequelize);
db.messages = Messages(sequelize, Sequelize);
db.order_details = Order_Details(sequelize, Sequelize);
db.order_products = Order_Products(sequelize, Sequelize);
db.order_status = Order_Status(sequelize, Sequelize);
db.orders = Orders(sequelize, Sequelize);
db.product_categories = Product_Categories(sequelize, Sequelize);
db.product_finishings = Product_Finishings(sequelize, Sequelize);
db.product_materials = Product_Materials(sequelize, Sequelize);
db.product_sizes = Product_Sizes(sequelize, Sequelize);
db.products = Products(sequelize, Sequelize);
db.roles = Roles(sequelize, Sequelize);
db.users = Users(sequelize, Sequelize);

// Insert Relations

// Conversations - Users
db.conversations.belongsTo(db.users, {
  foreignKey: "conversation_user_id",
  as: "users",
});

db.users.hasMany(db.conversations, {
  foreignKey: "conversation_user_id",
  as: "conversations",
});

// Conversations - Messages
db.messages.belongsTo(db.conversations, {
  foreignKey: "message_conversation_id",
  as: "conversations",
});

db.conversations.hasMany(db.messages, {
  foreignKey: "message_conversation_id",
  as: "messages",
});

db.messages.belongsTo(db.users, {
  foreignKey: "message_sender",
  as: "sender",
});

db.users.hasMany(db.messages, {
  foreignKey: "message_sender",
  as: "messages",
});

// Orders - Users
db.orders.belongsTo(db.users, {
  foreignKey: "order_user_id",
  as: "users",
});

db.users.hasMany(db.orders, {
  foreignKey: "order_user_id",
  as: "orders",
});

// Product Categories - Products
db.products.belongsTo(db.product_categories, {
  foreignKey: "product_category",
  as: "product_categories",
});

db.product_categories.hasMany(db.products, {
  foreignKey: "product_category",
  as: "products",
});

// Product Materials - Products
db.products.belongsTo(db.product_materials, {
  foreignKey: "product_material",
  as: "product_materials",
});

db.product_materials.hasMany(db.products, {
  foreignKey: "product_material",
  as: "products",
});

// Product Sizes - Products
db.products.belongsTo(db.product_sizes, {
  foreignKey: "product_size",
  as: "product_sizes",
});

db.product_sizes.hasMany(db.products, {
  foreignKey: "product_size",
  as: "products",
});

// Product Finishings - Products
db.products.belongsTo(db.product_finishings, {
  foreignKey: "product_finishing",
  as: "product_finishings",
});

db.product_finishings.hasMany(db.products, {
  foreignKey: "product_finishing",
  as: "products",
});

// Users - Roles
db.users.belongsTo(db.roles, {
  foreignKey: "user_role_id",
  as: "roles",
});

db.roles.hasMany(db.users, {
  foreignKey: "user_role_id",
  as: "users",
});

// Orders - Order Status
db.order_status.belongsTo(db.orders, {
  foreignKey: "order_status_order_id",
  as: "orders",
});

db.orders.hasMany(db.order_status, {
  foreignKey: "order_status_order_id",
  as: "order_statuses",
});

// Order Status - Users
db.order_status.belongsTo(db.users, {
  foreignKey: "order_status_user_id",
  as: "users",
});

db.users.hasMany(db.order_status, {
  foreignKey: "order_status_user_id",
  as: "order_statuses",
});

// Orders - Delivery Details
db.delivery_details.belongsTo(db.orders, {
  foreignKey: "delivery_detail_order_id",
  as: "orders",
});

db.orders.hasMany(db.delivery_details, {
  foreignKey: "delivery_detail_order_id",
  as: "delivery_details",
});

// Orders - Order Products
db.order_products.belongsTo(db.orders, {
  foreignKey: "order_id",
  as: "orders",
});

db.orders.hasMany(db.order_products, {
  foreignKey: "order_product_order_id",
  as: "order_products",
});

// Order Products - Products
db.order_products.belongsTo(db.products, {
  foreignKey: "product_id",
  as: "products",
});

db.products.hasMany(db.order_products, {
  foreignKey: "order_product_product_id",
  as: "order_products",
});

// Order Products - Order Details
db.order_details.belongsTo(db.order_products, {
  foreignKey: "order_detail_order_product_id",
  as: "order_products",
});

db.order_products.hasMany(db.order_details, {
  foreignKey: "order_detail_order_product_id",
  as: "order_details",
});

export default db;
