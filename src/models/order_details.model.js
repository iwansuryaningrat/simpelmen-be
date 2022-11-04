const Order_Details = (sequelize, Sequelize) => {
  const Order_Details = sequelize.define(
    "order_details",
    {
      order_detail_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_detail_product_id: {
        type: Sequelize.INTEGER,
      },
      order_detail_order_id: {
        type: Sequelize.INTEGER,
      },
      order_quantity: {
        type: Sequelize.INTEGER,
      },
      order_price: {
        type: Sequelize.INTEGER,
      },
      order_finishing_id: {
        type: Sequelize.INTEGER,
      },
      order_material_id: {
        type: Sequelize.INTEGER,
      },
      order_design: {
        type: Sequelize.STRING,
      },
      order_design_image: {
        type: Sequelize.TEXT("long"),
      },
      p1: {
        type: Sequelize.DOUBLE,
      },
      p2: {
        type: Sequelize.DOUBLE,
      },
      l1: {
        type: Sequelize.DOUBLE,
      },
      l2: {
        type: Sequelize.DOUBLE,
      },
      t1: {
        type: Sequelize.DOUBLE,
      },
      t2: {
        type: Sequelize.DOUBLE,
      },
    },
    {
      timestamps: true, // Enable timestamps
      createdAt: true, // Create createdAt
      updatedAt: true, // Create updatedAt
    }
  );

  return Order_Details;
};

export default Order_Details;
