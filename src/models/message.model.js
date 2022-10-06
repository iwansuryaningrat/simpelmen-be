const Message = (sequelize, Sequelize) => {
    const Message = sequelize.define(
        "messages",
        {
        message_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        message_conversation_id: {
            type: Sequelize.INTEGER,
        },
        message_sender: {
            type: Sequelize.INTEGER,
        },
        message: {
            type: Sequelize.STRING,
        },
        },
        {
        timestamps: true, // Enable timestamps
        createdAt: true, // Create createdAt
        updatedAt: true, // Create updatedAt
        }
    );
    
    return Message;
    };
    export default Message;