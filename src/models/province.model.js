const Province = (sequelize, Sequelize) => {
    const Province = sequelize.define("province", {
        province_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: false
        },
        province : {
            type: Sequelize.STRING
        }

    });
    return Province;
};
export default Province;