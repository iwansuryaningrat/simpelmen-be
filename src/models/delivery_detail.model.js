const DeveliveryDetail = (sequelize, Sequelize) => {
    const delivery_detail = sequelize.define("delivery_details", {
        delivery_detail_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        transaction_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "transactions",
                key: "transaction_id",
            },
        },
        delivery_detail_name: {
            type: Sequelize.STRING,
        },
        delivery_detail_ikm: {
            type: Sequelize.STRING,
        },
        delivery_detail_email: {
            type: Sequelize.STRING,
        },
        delivery_detail_contact: {
            type: Sequelize.STRING,
        },
        delivery_detail_method: {
            type: Sequelize.STRING,
        },
        delivery_detail_address: {
            type: Sequelize.STRING,
        },
        delivery_detail_district: {
            type: Sequelize.STRING,
        },
        delivery_detail_city: {
            type: Sequelize.STRING,
        },
        delivery_detail_province: {
            type: Sequelize.STRING,
        },
        delivery_detail_postal_code: {
            type: Sequelize.STRING,
        },

        delivery_detail_created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        delivery_detail_updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
    });

    return delivery_detail;
}

export default DeveliveryDetail;