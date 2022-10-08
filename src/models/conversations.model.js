const Conversations = (sequelize, Sequelize) => {
  const Conversations = sequelize.define(
    "conversations",
    {
      conversation_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      conversation_user_id: {
        type: Sequelize.INTEGER,
      },
      conversation_title: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true, // Enable timestamps
      createdAt: true, // Create createdAt
      updatedAt: true, // Create updatedAt
    }
  );

  return Conversations;
};

export default Conversations;
