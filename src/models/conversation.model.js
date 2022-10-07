const Conversation = (sequelize, Sequelize) => {
    const Conversation = sequelize.define("conversation", {
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
    return Conversation;
    };
    export default Conversation;