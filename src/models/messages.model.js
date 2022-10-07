const Messages = (sequelize, Sequelize) => {
  const Messages = sequelize.define(
    "messages",
    {
      message_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      message_conversation_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      message_sender: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      message: {
        type: Sequelize.TEXT,
      },
    },
    {
      timestamps: true, // Enable timestamps
      createdAt: true, // Create createdAt
      updatedAt: true, // Create updatedAt
    }
  );

  return Messages;
};

export default Messages;
