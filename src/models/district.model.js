const District = (sequelize, Sequelize) => {
    const District = sequelize.define("district", {
        district_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: false
        },
        city_id: {
            type: Sequelize.INTEGER,
        },
        city: {
            type: Sequelize.STRING
        },

    });
    return District;
};
export default District;