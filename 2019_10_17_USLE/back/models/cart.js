// 주문 상세정보 테이블

module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },{
        charset: 'utf8mb4', // 한글 + 이모티콘
        collate: 'utf8mb4_general_ci',
    });

    Cart.associate = (db) => {
        db.Cart.belongsTo(db.User);
        db.Cart.belongsTo(db.ProductInventory);
    }

    return Cart;
}