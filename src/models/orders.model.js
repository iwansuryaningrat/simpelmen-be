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
      order_status:{
        type: Sequelize.INTEGER,
      },
      order_note: {
        type: Sequelize.STRING,
      },
      order_price: {
        type: Sequelize.INTEGER,
      },
      order_cart_status: {
        type: Sequelize.INTEGER,
      },
      order_total_price: {
        type: Sequelize.INTEGER,
      },
      order_payment_method: {
        type: Sequelize.STRING,
      },
      order_payment_status: {
        type: Sequelize.STRING,
      },
      order_last_payment_date: {
        type: Sequelize.DATE,
      },
      order_discount: {
        type: Sequelize.INTEGER,
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
