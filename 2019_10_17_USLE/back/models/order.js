// 주문 테이블

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        totalPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },{
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    })

    return Order;
}