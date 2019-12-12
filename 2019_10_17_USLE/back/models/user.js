// 사용자 테이블

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userRegNum: {
            type: DataTypes.STRING(15),
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        nickname: {
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
        mileage: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        mailing: {
            type: DataTypes.INTEGER,
            defaultValue: 0, // 0 - YES, 1 - NO
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
        db.User.hasMany(db.OrderDetail);
        db.User.hasMany(db.Cart);
        db.User.hasMany(db.UserAddress);
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.hasMany(db.OrderTemp);
        db.User.belongsToMany(db.Coupon, {through: 'OwnCoupon', as:'Owned'})
    }

    return User;
}