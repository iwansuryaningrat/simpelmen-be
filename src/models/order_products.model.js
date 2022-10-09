const orderProducts = (sequelize, Sequelize) => {
  const Order_Products = sequelize.define(
    "order_products",
    {
      order_product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_product_order_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      order_product_product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    },
    {
      timestamps: true, // Enable timestamps
      createdAt: true, // Create createdAt
      updatedAt: true, // Create updatedAt
    }
  );

  return Order_Products;
};

export default orderProducts;
