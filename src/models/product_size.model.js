const Product_Size = (sequelize, Sequelize) => {
    const Product_Size = sequelize.define(
        "product_sizes",
        {
        product_size_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_size_length: {
            type: Sequelize.DOUBLE,
        },
        product_size_width: {
            type: Sequelize.DOUBLE,
        },
        product_size_height: {
            type: Sequelize.DOUBLE,
        },
        product_size_shape: {
            type: Sequelize.STRING,
        },
        product_size_description: {
            type: Sequelize.STRING,
        },
        },
        {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        }
    );
    return Product_Size;
    };
    export default Product_Size;