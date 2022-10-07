import configs from "../configs/db.configs.js";
import Sequelize from "sequelize";

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
import userModel from "./user.model.js";
import conversationModel from "./conversation.model.js";
import delivery_detailModel from "./delivery_detail.model.js";
import messageModel from "./message.model.js";
import orderModel from "./order.model.js";
import order_detailModel from "./order_detail.model.js";
import order_statusModel from "./order_status.model.js";
import productModel from "./product.model.js";
import product_categoryModel from "./product_category.model.js";
import product_finishingModel from "./product_finishing.model.js";
import product_materialModel from "./product_material.model.js";
import product_sizeModel from "./product_size.model.js";

import { config } from "dotenv";

db.user = userModel(sequelize, Sequelize);
db.conversation = conversationModel(sequelize, Sequelize);
db.delivery_detail = delivery_detailModel(sequelize, Sequelize);
db.message = messageModel(sequelize, Sequelize);
db.order = orderModel(sequelize, Sequelize);
db.order_detail = order_detailModel(sequelize, Sequelize);
db.order_status = order_statusModel(sequelize, Sequelize);
db.product = productModel(sequelize, Sequelize);
db.product_category = product_categoryModel(sequelize, Sequelize);
db.product_finishing = product_finishingModel(sequelize, Sequelize);
db.product_material = product_materialModel(sequelize, Sequelize);
db.product_size = product_sizeModel(sequelize, Sequelize);

db.conversation.belongsTo(db.user, {
  foreignKey: "conversation_user_id",
  as: "user",
});
db.user.hasMany(db.conversation, {
  foreignKey: "conversation_user_id",
  as: "conversations",
});
// ALTER TABLE `delivery_details`
//   ADD PRIMARY KEY (`delivery_detail_id`,`delivery_detail_order_id`),
//   ADD KEY `delivery_detail_order_fk` (`delivery_detail_order_id`);
db.delivery_detail.belongsTo(db.order, {
  foreignKey: "delivery_detail_order_id",
  as: "order",
});
db.order.hasMany(db.delivery_detail, {
  foreignKey: "delivery_detail_order_id",
  as: "delivery_details",
});

// ALTER TABLE `messages`
//   ADD PRIMARY KEY (`message_id`,`message_conversation_id`,`message_sender`),
//   ADD KEY `conversations_fk` (`message_conversation_id`),
//   ADD KEY `sender_fk` (`message_sender`);
db.message.belongsTo(db.conversation, {
  foreignKey: "message_conversation_id",
  as: "conversation",
});
db.conversation.hasMany(db.message, {
  foreignKey: "message_conversation_id",
  as: "messages",
});
db.message.belongsTo(db.user, {
  foreignKey: "message_sender",
  as: "sender",
});
db.user.hasMany(db.message, {
  foreignKey: "message_sender",
  as: "messages",
});

// ALTER TABLE `orders`
//   ADD PRIMARY KEY (`order_id`,`order_product_id`,`order_user_id`),
//   ADD KEY `customers_fk` (`order_user_id`),
//   ADD KEY `product_fk` (`order_product_id`);
db.order.belongsTo(db.user, {
  foreignKey: "order_user_id",
  as: "user",
});
db.user.hasMany(db.order, {
  foreignKey: "order_user_id",
  as: "orders",
});
db.order.belongsTo(db.product, {
  foreignKey: "order_product_id",
  as: "product",
});
db.product.hasMany(db.order, {
  foreignKey: "order_product_id",
  as: "orders",
});

// ALTER TABLE `order_details`
//   ADD PRIMARY KEY (`order_detail_id`,`order_detail_order_id`),
//   ADD KEY `order_detail_orders_fk` (`order_detail_order_id`);
db.order_detail.belongsTo(db.order, {
  foreignKey: "order_detail_order_id",
  as: "order",
});
db.order.hasMany(db.order_detail, {
  foreignKey: "order_detail_order_id",
  as: "order_details",
});

// ALTER TABLE `order_status`
//   ADD PRIMARY KEY (`order_status_id`,`order_status_order_id`,`order_status_user_id`),
//   ADD KEY `order_status_user_` (`order_status_user_id`),
//   ADD KEY `order_fk` (`order_status_order_id`);

db.order_status.belongsTo(db.order, {
  foreignKey: "order_status_order_id",
  as: "order",
});
db.order.hasMany(db.order_status, {
  foreignKey: "order_status_order_id",
  as: "order_statuses",
});
db.order_status.belongsTo(db.user, {
  foreignKey: "order_status_user_id",
  as: "user",
});
db.user.hasMany(db.order_status, {
  foreignKey: "order_status_user_id",
  as: "order_statuses",
});

// ALTER TABLE `products`
//   ADD PRIMARY KEY (`product_id`),
//   ADD KEY `product_finishing_fk` (`product_finishing`),
//   ADD KEY `product_material_fk` (`product_material`),
//   ADD KEY `product_size_fk` (`product_size`),
//   ADD KEY `product_categori_fk` (`product_category`);
db.product.belongsTo(db.product_category, {
  foreignKey: "product_category",
  as: "product_categories",
});
db.product_category.hasMany(db.product, {
  foreignKey: "product_category",
  as: "products",
});
db.product.belongsTo(db.product_finishing, {
  foreignKey: "product_finishing",
  as: "product_finishings",
});
db.product_finishing.hasMany(db.product, {
  foreignKey: "product_finishing",
  as: "products",
});
db.product.belongsTo(db.product_material, {
  foreignKey: "product_material",
  as: "product_materials",
});
db.product_material.hasMany(db.product, {
  foreignKey: "product_material",
  as: "products",
});
db.product.belongsTo(db.product_size, {
  foreignKey: "product_size",
  as: "product_sizes",
});
db.product_size.hasMany(db.product, {
  foreignKey: "product_size",
  as: "products",
});

export default db;
