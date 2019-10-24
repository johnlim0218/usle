// 배송 배송지 정보

module.exports = (sequelize, DataTypes) => {
    const OrderShipping = sequelize.define('OrderShipping', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        zipcode: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        addressDetail: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
    },{
        timestamps: true,
        paranoid: true,
        underscored: true,
        charset: 'utf8mb4', // 한글 + 이모티콘
        collate: 'utf8mb4_general_ci',
    })
    
    OrderShipping.associate = (db) => {
        db.OrderShipping.hasOne(db.Delievery);
        db.OrderShipping.belongsTo(db.Order);
    }

    return OrderShipping;
}