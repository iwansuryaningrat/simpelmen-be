const Orders = (sequelize, Sequelize) => {
  const Orders = sequelize.define(
    "orders",
    {
      order_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_code: {
        type: Sequelize.STRING,
      },
      order_user_id: {
        type: Sequelize.INTEGER,
      },
      order_quantity: {
        type: Sequelize.INTEGER,
      },
      order_status:{
        type: Sequelize.INTEGER,
      },
      order_note: {
        type: Sequelize.STRING,
      },
      order_price: {
        type: Sequelize.INTEGER,
      },
      order_total_price: {
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
      order_design_image:{
        type: Sequelize.TEXT("long"),
      },
      order_payment_method: {
        type: Sequelize.STRING,
      },
      order_payment_status: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true, // Enable timestamps
      createdAt: true, // Create createdAt
      updatedAt: true, // Create updatedAt
    }
  );

  return Orders;
};

export default Orders;
