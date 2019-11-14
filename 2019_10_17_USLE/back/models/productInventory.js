
module.exports = (sequelize, DataTypes) => {
    const ProductInventory = sequelize.define('ProductInventory', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 100,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        }
    }, {
        timeStamps: true,
        paranoid: true,
        underscored: true,
        charset: 'utf8mb4', // 한글 + 이모티콘
        collate: 'utf8mb4_general_ci',
    });
 
    ProductInventory.associate = (db) => {
        db.ProductInventory.hasMany(db.Cart);
        db.ProductInventory.hasMany(db.OrderDetail);
        db.ProductInventory.hasMany(db.ProductInventory);
        db.ProductInventory.belongsTo(db.ProductInventory);
        db.ProductInventory.belongsTo(db.ProductOptionSelection);
        db.ProductInventory.belongsTo(db.Product);
        db.ProductInventory.belongsToMany(db.Coupon, {through: 'Applicable', as:'ApplicableProduct'})
    }
 
    return ProductInventory;
} 