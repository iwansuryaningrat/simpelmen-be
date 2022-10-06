const Order = (sequelize, Sequelize) => {
    const Order = sequelize.define(
        "orders",
        {
        order_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        order_code: {
            type: Sequelize.STRING,
        },
        order_product_id: {
            type: Sequelize.INTEGER,
        },
        order_user_id: {
            type: Sequelize.INTEGER,
        },
        order_quantity: {
            type: Sequelize.INTEGER,
        },
        order_note: {
            type: Sequelize.STRING,
        },
        order_price: {
            type: Sequelize.INTEGER,
        },
        order_design: {
            type: Sequelize.STRING,
        },
        },
        {
        timestamps: true, // Enable timestamps
        createdAt: true, // Create createdAt
        updatedAt: true, // Create updatedAt
        }
    );
    
    return Order;
    }
export default Order;