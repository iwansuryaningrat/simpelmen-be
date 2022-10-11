const Jenis_Products = (sequelize, Sequelize) => {
  const Jenis_Products = sequelize.define(
    "jenis_products",
    {
      jenis_product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      jenis_product_name: {
        type: Sequelize.STRING,
      },
      jenis_product_description: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true, // Enable timestamps
      createdAt: true, // Create createdAt
      updatedAt: true, // Create updatedAt
    }
  );

  return Jenis_Products;
};

export default Jenis_Products;
