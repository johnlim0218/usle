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
        timestamps: true,
        paranoid: true,
        underscored: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    User.associate = (db) => {
        db.User.hasMany(db.Order);
        db.User.hasMany(db.Cart);
        db.User.hasMany(db.UserAddress);
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Coupon, {through: 'OwnCoupon', as:'Owned'})
    }

    return User;
}