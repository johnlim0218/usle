
module.exports = (sequelize, DataTypes) => {
    const ProductInventory = sequelize.define('ProductInventory', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 100,
        },
        additionalPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
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
        // db.ProductInventory.hasMany(db.OrderTemp);
        // db.ProductInventory.hasMany(db.ProductInventory);
        // db.ProductInventory.belongsTo(db.ProductInventory);
        // db.ProductInventory.belongsTo(db.ProductOptionSelection);
        db.ProductInventory.belongsTo(db.Product);
        db.ProductInventory.belongsToMany(db.Coupon, {through: 'Applicable', as:'ApplicableProduct'})

        db.ProductInventory.belongsTo(db.ProductOptionSelection, {as:'ProductOptionSelection0'});
        db.ProductInventory.belongsTo(db.ProductOptionSelection, {as:'ProductOptionSelection1'});
        db.ProductInventory.belongsTo(db.ProductOptionSelection, {as:'ProductOptionSelection2'});
        db.ProductInventory.belongsTo(db.ProductOptionSelection, {as:'ProductOptionSelection3'});
        db.ProductInventory.belongsTo(db.ProductOptionSelection, {as:'ProductOptionSelection4'});
        db.ProductInventory.belongsTo(db.ProductOptionSelection, {as:'ProductOptionSelection5'});
    }
 
    return ProductInventory;
} 