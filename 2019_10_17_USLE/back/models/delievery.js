// 배송 정보 테이블

module.exports = (sequelize, DataTypes) => {
    const Delievery = sequelize.define('Delievery', {
        corporate: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        delieveryNumber: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },{
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    })

    Delievery.associate = (db) => {
        db.Delievery.belongsTo(db.OrderShipping);
    }

    return Delievery;
}