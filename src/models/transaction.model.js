const Transaction = (sequelize, Sequelize) => {
    const transaction = sequelize.define("transactions", {
        transaction_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'user_id',
            },
        },
        product_id: {
            type: Sequelize.INTEGER,
            
        },
        transaction_quantity: {
            type: Sequelize.INTEGER,
        },
        transaction_note: {
            type: Sequelize.STRING,
        },
        transaction_status: {
            type: Sequelize.STRING,
        },
        transaction_price: {
            type: Sequelize.INTEGER,
        },
        transaction_total_price: {
            type: Sequelize.INTEGER,
        },
        transaction_design: {
            type: Sequelize.STRING,
        },
        transaction_created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        transaction_updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
    });

    return transaction;
}
export default Transaction;
