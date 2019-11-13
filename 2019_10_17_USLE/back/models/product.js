// 제품 테이블

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        productName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    },{
        timestamps: true,
        paranoid: true,
        underscored: true,
        charset: 'utf8mb4', // 한글 + 이모티콘
        collate: 'utf8mb4_general_ci',
    });

    Product.associate = (db) => {
        db.Product.hasMany(db.ProductImage);
        db.Product.hasMany(db.ProductOption);
        db.Product.hasMany(db.Comment, {as: 'review'});
        db.Product.belongsTo(db.ProductBrand);
        db.Product.belongsTo(db.ProductCategory);
    }

    return Product;
}