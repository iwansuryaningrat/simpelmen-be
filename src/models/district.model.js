const District = (sequelize, Sequelize) => {
    const District = sequelize.define("district", {
        district_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: false
        },
        district_name: {
            type: Sequelize.STRING
        },
        city_id: {
            type: Sequelize.INTEGER,
        }
        
    });
    return District;
};
export default District;