const Status_Histories = (sequelize, Sequelize) => {
    const status_histories = sequelize.define(
        "status_histories",
        {
        status_history_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        status_description: {
            type: Sequelize.STRING,
        },
        },
        {
      timestamps: true, // Enable timestamps
      createdAt: true, // Create createdAt
      updatedAt: true, // Create updatedAt
    }
  );
    
    return status_histories;
    };

export default Status_Histories;

