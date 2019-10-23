// 제품 브랜드 테이블

module.exports = (sequelize, DataTypes) => {
    const ProductInventory = sequelize.define('ProductInventory', {
        size: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        inventory: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },{
        charset: 'utf8mb4', // 한글 + 이모티콘
        collate: 'utf8mb4_general_ci',
    });

    return ProductInventory;
}