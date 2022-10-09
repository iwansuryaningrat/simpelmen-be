const City = (sequelize, Sequelize) => {
    const City = sequelize.define("city", {
        city_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: false
        },
        city_name: {
            type: Sequelize.STRING
        },
        province_id: {
            type: Sequelize.INTEGER,
        }
    });
    return City;
};
export default City;