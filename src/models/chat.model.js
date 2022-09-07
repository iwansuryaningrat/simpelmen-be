const Chat = (sequelize, Sequelize) => {
    const chat = sequelize.define("chats", {
        chat_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        chat_user_sender_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'user_id',
            },
        },
        chat_user_receiver_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'user_id',
            },
        },
        chat_message: {
            type: Sequelize.STRING,
        },
        chat_created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        chat_updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
    });

    return chat;
}

export default Chat;