const Delivery_Detail = (sequelize, Sequelize) => {
  const Delivery_Detail = sequelize.define(
      "delivery_details",
      {
      delivery_detail_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      delivery_detail_order_id: {
          type: Sequelize.INTEGER,
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
          type: Sequelize.INTEGER,
      },
      delivery_detail_shipping_cost: {
          type: Sequelize.INTEGER,
      },
      delivery_detail_courier: {
          type: Sequelize.STRING,
      },
      delivery_detail_receipt: {
          type: Sequelize.STRING,
      },
      delivery_detail_estimate: {
          type: Sequelize.STRING,
      },
      },
      {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      }
  );
  return Delivery_Detail;
  };
  export default Delivery_Detail;