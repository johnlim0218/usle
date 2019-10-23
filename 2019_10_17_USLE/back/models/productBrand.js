// 제품 브랜드 테이블

module.exports = (sequelize, DataTypes) => {
    const ProductBrand = sequelize.define('ProductBrand', {
        brandName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        zipcode: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        addressDetail: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    },{
        charset: 'utf8mb4', // 한글 + 이모티콘
        collate: 'utf8mb4_general_ci',
    });

    return ProductBrand;
}