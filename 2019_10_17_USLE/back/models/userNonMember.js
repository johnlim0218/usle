// 비회원 정보 테이블

module.exports = (sequelize, DataTypes) => {
    const UserNonMember = sequelize.define('UserNonMember', {
        name: {
            type: DataTypes.STRING(18),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    },{
        timestamps: true,
        paranoid: true,
        underscored: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    })

    UserNonMember.associate = (db) => {
        db.UserNonMember.hasMany(db.Order);
        
    }

    return UserNonMember;
}