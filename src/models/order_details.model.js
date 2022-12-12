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
      order_detail_finishings_id: {
        type: Sequelize.INTEGER,
      },
      order_detail_materials_id: {
        type: Sequelize.INTEGER,
      },
      order_detail_quantity: {
        type: Sequelize.INTEGER,
      },
      order_detail_design: {
        type: Sequelize.STRING,
      },
      order_detail_design_image: {
        type: Sequelize.TEXT("long"),
      },
      order_detail_order_id: {
        type: Sequelize.INTEGER,
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
      order_detail_sablon:{
        type: Sequelize.STRING,
      },
      order_detail_shape:{
        type: Sequelize.STRING,
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
