// 반품 테이블

module.exports = (sequelize, DataTypes) => {
    const OrderReturn = sequelize.define('OrderReturn', {
        
        name:{
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        bank:{
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        accountNumber:{
            type: DataTypes.STRING(30),
            allowNull: false,
        }
    },{
        timestamps: true,
        paranoid: true,
        underscored: true,
        charset: 'utf8mb4', // 한글 + 이모티콘
        collate: 'utf8mb4_general_ci',
    })

    OrderReturn.associate = (db) => {
        db.OrderReturn.belongsTo(db.OrderStatus);
    }
    

    return OrderReturn;
}