// 주문 상세정보 테이블

module.exports = (sequelize, DataTypes) => {
    const Coupon = sequelize.define('Coupon', {
        discountRate: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        serialNumber: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        expire: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },{
        charset: 'utf8mb4', // 한글 + 이모티콘
        collate: 'utf8mb4_general_ci',
    });

    Coupon.associate = (db) => {
        db.Coupon.hasMany(db.OrderDetail);
        db.Coupon.belongsToMany(db.User, {through: 'OwnCoupon', as:'Owner'})
        db.Coupon.belongsToMany(db.ProductInventory, {through: 'Applicable', as:'ApplicableCoupon'})
    }

    return Coupon;
}