// 임시 주문 테이블

module.exports = (sequelize, DataTypes) => {
    const OrderTemp = sequelize.define('OrderTemp', {
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
    })

    OrderTemp.associate = (db) => {
        db.OrderTemp.belongsTo(db.ProductInventory);
        db.OrderTemp.belongsTo(db.User);
        db.OrderTemp.belongsTo(db.Order);
    }

    return OrderTemp;
}