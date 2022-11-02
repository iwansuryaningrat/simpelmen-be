const Order_Status = (sequelize, Sequelize) => {
  const Order_Status = sequelize.define(
    "order_status",
    {
      order_status_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_status_order_id: {
        type: Sequelize.INTEGER,
      },
      order_status_user_id: {
        type: Sequelize.INTEGER,
      },
      order_status_description: {
        type: Sequelize.STRING,
      },
      order_status_admin_code: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: true, 
      createdAt: true, 
      updatedAt: true, 
    }
  );

  return Order_Status;
};

export default Order_Status;
