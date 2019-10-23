// 주문 상태 테이블 

module.exports = (sequelize, DataTypes) => {
    const OrderStatus = sequelize.define('OrderReturn', {
        status:{
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    },{
        charset: 'utf8mb4', // 한글 + 이모티콘
        collate: 'utf8mb4_general_ci',
    })

    return OrderStatus;
}