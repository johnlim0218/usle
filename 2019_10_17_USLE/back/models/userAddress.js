// 사용자 배송지 정보

module.exports = (sequelize, DataTypes) => {
    const UserAddress = sequelize.define('UserAddress', {
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
    },{
        timestamps: true,
        paranoid: true,
        underscored: true,
        charset: 'utf8mb4', // 한글 + 이모티콘
        collate: 'utf8mb4_general_ci',
    })

    UserAddress.associate = (db) => {
        db.UserAddress.belongsTo(db.User);
    }

    return UserAddress;
}