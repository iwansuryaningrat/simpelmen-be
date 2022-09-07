const Product = (sequelize, Sequelize) => {
  const product = sequelize.define(
    "products",
    {
      product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "product_categories",
          key: "product_category_id",
        },
      },
      product_detail_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "product_details",
          key: "product_detail_id",
        },
      },
      product_picture: {
        type: Sequelize.STRING,
      },
      finishing_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "finishings",
          key: "finishing_id",
        },
      },

      product_description: {
        type: Sequelize.STRING,
      },
      product_created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      product_updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      timestamps: true, // Enable timestamps
      createdAt: true, // Create createdAt
      updatedAt: true, // Create updatedAt
    }
  );

  return product;
};

export default Product;
