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
db.order_status = Order_Status(sequelize, Sequelize);
db.orders = Orders(sequelize, Sequelize);
db.product_categories = Product_Categories(sequelize, Sequelize);
db.product_finishings = Product_Finishings(sequelize, Sequelize);
db.product_materials = Product_Materials(sequelize, Sequelize);
db.product_sizes = Product_Sizes(sequelize, Sequelize);
db.products = Products(sequelize, Sequelize);
db.roles = Roles(sequelize, Sequelize);
db.users = Users(sequelize, Sequelize);

// Insert Associations
db.conversations.belongsTo(db.users, {
  foreignKey: "conversation_user_id",
  as: "users",
});

db.users.hasMany(db.conversations, {
  foreignKey: "conversation_user_id",
  as: "conversations",
});

// ALTER TABLE `delivery_details`
//   ADD PRIMARY KEY (`delivery_detail_id`,`delivery_detail_order_id`),
//   ADD KEY `delivery_detail_order_fk` (`delivery_detail_order_id`);
db.delivery_details.belongsTo(db.orders, {
  foreignKey: "delivery_detail_order_id",
  as: "orders",
});

db.orders.hasMany(db.delivery_details, {
  foreignKey: "delivery_detail_order_id",
  as: "delivery_details",
});

// ALTER TABLE `messages`
//   ADD PRIMARY KEY (`message_id`,`message_conversation_id`,`message_sender`),
//   ADD KEY `conversations_fk` (`message_conversation_id`),
//   ADD KEY `sender_fk` (`message_sender`);
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

// ALTER TABLE `orders`
//   ADD PRIMARY KEY (`order_id`,`order_product_id`,`order_user_id`),
//   ADD KEY `customers_fk` (`order_user_id`),
//   ADD KEY `product_fk` (`order_product_id`);
db.orders.belongsTo(db.users, {
  foreignKey: "order_user_id",
  as: "users",
});

db.users.hasMany(db.orders, {
  foreignKey: "order_user_id",
  as: "orders",
});

db.orders.belongsTo(db.products, {
  foreignKey: "order_product_id",
  as: "products",
});

db.products.hasMany(db.orders, {
  foreignKey: "order_product_id",
  as: "orders",
});

// ALTER TABLE `order_details`
//   ADD PRIMARY KEY (`order_detail_id`,`order_detail_order_id`),
//   ADD KEY `order_detail_orders_fk` (`order_detail_order_id`);
db.order_details.belongsTo(db.orders, {
  foreignKey: "order_detail_order_id",
  as: "orders",
});

db.orders.hasMany(db.order_details, {
  foreignKey: "order_detail_order_id",
  as: "order_details",
});

// ALTER TABLE `order_status`
//   ADD PRIMARY KEY (`order_status_id`,`order_status_order_id`,`order_status_user_id`),
//   ADD KEY `order_status_user_` (`order_status_user_id`),
//   ADD KEY `order_fk` (`order_status_order_id`);

db.order_status.belongsTo(db.orders, {
  foreignKey: "order_status_order_id",
  as: "orders",
});

db.orders.hasMany(db.order_status, {
  foreignKey: "order_status_order_id",
  as: "order_statuses",
});

db.order_status.belongsTo(db.users, {
  foreignKey: "order_status_user_id",
  as: "users",
});

db.users.hasMany(db.order_status, {
  foreignKey: "order_status_user_id",
  as: "order_statuses",
});

// ALTER TABLE `products`
//   ADD PRIMARY KEY (`product_id`),
//   ADD KEY `product_finishing_fk` (`product_finishing`),
//   ADD KEY `product_material_fk` (`product_material`),
//   ADD KEY `product_size_fk` (`product_size`),
//   ADD KEY `product_categori_fk` (`product_category`);
db.products.belongsTo(db.product_categories, {
  foreignKey: "product_category",
  as: "product_categories",
});

db.product_categories.hasMany(db.products, {
  foreignKey: "product_category",
  as: "products",
});

db.products.belongsTo(db.product_finishings, {
  foreignKey: "product_finishing",
  as: "product_finishings",
});

db.product_finishings.hasMany(db.products, {
  foreignKey: "product_finishing",
  as: "products",
});

db.products.belongsTo(db.product_materials, {
  foreignKey: "product_material",
  as: "product_materials",
});

db.product_materials.hasMany(db.products, {
  foreignKey: "product_material",
  as: "products",
});

db.products.belongsTo(db.product_sizes, {
  foreignKey: "product_size",
  as: "product_sizes",
});

db.product_sizes.hasMany(db.products, {
  foreignKey: "product_size",
  as: "products",
});

db.users.belongsTo(db.roles, {
  foreignKey: "role_id",
  as: "roles",
});

export default db;
