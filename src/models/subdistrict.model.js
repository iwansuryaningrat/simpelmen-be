const SubDistrict = (sequelize, Sequelize) => {
    const SubDistrict = sequelize.define("subdistrict", {
        subdistrict_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: false
        },
        province_id: {
            type: Sequelize.INTEGER
        },
        city_id: {
            type: Sequelize.INTEGER,
        },
        type: {
            type: Sequelize.STRING
        },
        subdistrict_name: {
            type: Sequelize.STRING
        },

    });
    return SubDistrict;
};
export default SubDistrict;