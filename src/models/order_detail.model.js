const Order_Detail = (sequelize, Sequelize) => {
    const Order_Detail = sequelize.define(
        "order_details",
        {
        order_detail_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        order_detail_order_id: {
            type: Sequelize.INTEGER,
        },
        order_detail_product_id: {
            type: Sequelize.INTEGER,
        },
        p1: {
            type: Sequelize.DOUBLE,
        },
        p2: {
            type: Sequelize.DOUBLE,
        },
        l1: {
            type: Sequelize.DOUBLE,
        },
        l2: {
            type: Sequelize.DOUBLE,
        },
        t1: {
            type: Sequelize.DOUBLE,
        },
        t2: {
            type: Sequelize.DOUBLE,
        },
        },
        {
        timestamps: true, // Enable timestamps
        createdAt: true, // Create createdAt
        updatedAt: true, // Create updatedAt
        }
    );
    
    return Order_Detail;
    }
export default Order_Detail;