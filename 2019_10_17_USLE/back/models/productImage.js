// 제품 이미지 테이블

module.exports = (sequelize, DataTypes) => {
    const ProductImage = sequelize.define('ProductImage', {
        src: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    },{
        timestamps: true,
        paranoid: true,
        underscored: true,
        charset: 'utf8mb4', // 한글 + 이모티콘
        collate: 'utf8mb4_general_ci',
    });

    ProductImage.associate = (db) => {
        db.ProductImage.belongsTo(db.Product);
    }

    return ProductImage;
}