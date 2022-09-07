const Product_Category = (sequelize, Sequelize) => {
    const product_category = sequelize.define("product_categories", {
        product_category_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_category_code: {
            type: Sequelize.INTEGER,
        },
        product_category_name: {
            type: Sequelize.STRING,
        },
        product_category_created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        product_category_updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },

    });

    return product_category;
}

export default Product_Category;