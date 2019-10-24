// 주문 테이블

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        totalPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },{
        timestamps: true,
        paranoid: true,
        underscored: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    })

    Order.associate = (db) => {
        db.Order.hasOne(db.OrderPayment);
        db.Order.hasOne(db.OrderShipping);
        db.Order.hasMany(db.OrderStatus);
        db.Order.belongsTo(db.User);
    }

    return Order;
}