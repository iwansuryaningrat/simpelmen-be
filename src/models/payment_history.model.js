const paymentHistories = (sequelize, Sequelize) => {
  const paymentHistory = sequelize.define(
    "payment_histories",
    {
      payment_history_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      payment_history_order_id: {
        type: Sequelize.INTEGER,
      },
      payment_history_user_id: {
        type: Sequelize.INTEGER,
      },
      payment_history_amount: {
        type: Sequelize.INTEGER,
      },
      payment_history_date: {
        type: Sequelize.DATE,
      },
    },
    {
      timestamps: true, // Enable timestamps
      createdAt: true, // Create createdAt
      updatedAt: true, // Create updatedAt
    }
  );

  return paymentHistory;
};

export default paymentHistories;
