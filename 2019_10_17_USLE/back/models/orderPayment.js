// 결제 정보 테이블

module.exports = (sequelize, DataTypes) => {
    const OrderPayment = sequelize.define('OrderPayment', {
        // 입금 혹은 결제자 이름
        name:{
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        //결제 타입(무통장입금? 카드?)
        type:{
            type: DataTypes.STRING(20),
            allowNull: false,
        }
    },{
        charset: 'utf8mb4', // 한글 + 이모티콘
        collate: 'utf8mb4_general_ci',
    })

    return OrderPayment;
}