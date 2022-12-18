const Retributions = (sequelize, Sequelize) => {
  const Retributions = sequelize.define(
    "retributions",
    {
      retribution_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      retribution_order_id: {
        type: Sequelize.INTEGER,
      },
      retribution_jasa_pound: {
        type: Sequelize.INTEGER,
      },
      retribution_jasa_karton: {
        type: Sequelize.INTEGER,
      },
      retribution_jasa_sablon: {
        type: Sequelize.INTEGER,
      },
      retribution_jasa_design: {
        type: Sequelize.INTEGER,
      },
      retribution_jasa_finishing: {
        type: Sequelize.INTEGER,
      },
      retribution_jasa_total: {
        type: Sequelize.INTEGER,
      },
      retribution_status: {
        type: Sequelize.STRING,
      },
      retribution_pad_status: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: true, // Enable timestamps
      createdAt: true, // Create createdAt
      updatedAt: true, // Create updatedAt
    }
  );

  return Retributions;
};

export default Retributions;
