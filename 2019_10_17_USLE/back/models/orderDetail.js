// 주문 상세정보 테이블

module.exports = (sequelize, DataTypes) => {
    const OrderDetail = sequelize.define('OrderDetail', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // totalPrice: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // }
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },{
        timestamps: true,
        paranoid: true,
        underscored: true,
        charset: 'utf8mb4', // 한글 + 이모티콘
        collate: 'utf8mb4_general_ci',
    });

    OrderDetail.associate = (db) => {
        db.OrderDetail.hasOne(db.OrderShipping);
        db.OrderDetail.hasMany(db.OrderStatus);
        db.OrderDetail.belongsTo(db.Coupon);
        db.OrderDetail.belongsTo(db.Order);
        db.OrderDetail.belongsTo(db.ProductInventory);
    }

    return OrderDetail;
}