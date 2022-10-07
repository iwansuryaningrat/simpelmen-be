const Product_Material = (sequelize, Sequelize) => {
    const Product_Material = sequelize.define(
        "product_materials",
        {
        product_material_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_material_name: {
            type: Sequelize.STRING,
        },
        product_material_description: {
            type: Sequelize.STRING,
        },
        },
        {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        }
    );
    return Product_Material;
    };
    export default Product_Material;