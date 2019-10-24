// 주문 상태 테이블 

module.exports = (sequelize, DataTypes) => {
    const OrderStatus = sequelize.define('OrderStatus', {
        status:{
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    },{
        timestamps: true,
        paranoid: true,
        underscored: true,
        charset: 'utf8mb4', // 한글 + 이모티콘
        collate: 'utf8mb4_general_ci',
    })

    OrderStatus.associate = (db) => {
        db.OrderStatus.hasOne(db.OrderReturn);
        db.OrderStatus.belongsTo(db.Order);
    }

    return OrderStatus;
} 