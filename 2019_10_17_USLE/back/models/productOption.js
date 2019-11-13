// 제품 브랜드 테이블

module.exports = (sequelize, DataTypes) => {
    const ProductOption = sequelize.define('ProductOption', {
        optionName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: 'one', 
        }
    },{
        timestamps: true,
        paranoid: true,
        underscored: true,
        charset: 'utf8mb4', // 한글 + 이모티콘
        collate: 'utf8mb4_general_ci',
    });

    ProductOption.associate = (db) => {
        db.ProductOption.hasMany(db.Cart);
        db.ProductOption.hasMany(db.OrderDetail);
        db.ProductOption.hasMany(db.ProductOptionSelection);
        db.ProductOption.belongsTo(db.Product);
        db.ProductOption.belongsToMany(db.Coupon, {through: 'Applicable', as:'ApplicableProduct'})
    }

    return ProductOption;
}