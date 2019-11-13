// 주문 상세정보 테이블

module.exports = (sequelize, DataTypes) => {
    const OrderDetail = sequelize.define('OrderDetail', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalPrice: {
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
        db.OrderDetail.belongsTo(db.Coupon);
        db.OrderDetail.belongsTo(db.ProductOption);
        db.OrderDetail.belongsTo(db.Order);
    }

    return OrderDetail;
}