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
        timestamps: true,
        paranoid: true,
        underscored: true,
        charset: 'utf8mb4', // 한글 + 이모티콘
        collate: 'utf8mb4_general_ci',
    });

    ProductInventory.associate = (db) => {
        db.ProductInventory.hasMany(db.Cart);
        db.ProductInventory.hasMany(db.OrderDetail);
        db.ProductInventory.belongsTo(db.Product);
        db.ProductInventory.belongsToMany(db.Coupon, {through: 'Applicable', as:'ApplicableProduct'})
    }

    return ProductInventory;
}