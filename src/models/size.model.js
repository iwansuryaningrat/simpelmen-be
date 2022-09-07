const Size = (sequelize, Sequelize) => {
    const size = sequelize.define("sizes", {
        size_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        size_length: {
            type: Sequelize.INTEGER,
        },
        size_width: {
            type: Sequelize.INTEGER,
        },
        size_height: {
            type: Sequelize.INTEGER,
        },
        size_description: {
            type: Sequelize.STRING,
        },
        size_shape: {
            type: Sequelize.STRING,
        },
        size_created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        size_updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
    });

    return size;
}

export default Size;