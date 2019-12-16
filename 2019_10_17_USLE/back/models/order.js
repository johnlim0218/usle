// 주문 테이블

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        orderRegNum: {
            type: DataTypes.STRING(18),
            unique: true,
            allowNull: false,
            
        },
        totalAmount: {
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
        db.Order.hasMany(db.OrderDetail);
        db.Order.belongsTo(db.User);
        db.Order.belongsTo(db.UserNonMember);
    }

    return Order;
}