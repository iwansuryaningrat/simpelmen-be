const Finishing = (sequelize, Sequelize) => {
    const finishing = sequelize.define("finishings", {
        finishing_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        finishing_name: {
            type: Sequelize.STRING,
        },
        finishing_created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        finishing_updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
    });

    return finishing;
}

export default Finishing;