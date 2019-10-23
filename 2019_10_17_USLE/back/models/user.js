// 사용자 테이블

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userId: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        nickName: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(30),
            unique: true,
        },
        mileage: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        type: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'locale',
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });


    return User;
}