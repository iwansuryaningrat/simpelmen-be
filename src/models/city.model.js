const City = (sequelize, Sequelize) => {
    const City = sequelize.define("city", {
        city_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: false
        },
        province_id: {
            type: Sequelize.INTEGER,
        },
        type: {
            type: Sequelize.STRING
        },
        city_name: {
            type: Sequelize.STRING
        },
        postal_code: {
            type: Sequelize.STRING
        }

    });
    return City;
};
export default City;