
module.exports = (sequelize, DataTypes) => {
    const ProductOptionSelection = sequelize.define('ProductOptionSelection', {
        selectionName: {
            type: DataTypes.STRING(200),
            allowNull: false,
            defaultValue: 'one', 
        },
    }, {
        timeStamps: true,
        paranoid: true,
        underscored: true,
        charset: 'utf8mb4', // 한글 + 이모티콘
        collate: 'utf8mb4_general_ci',
    });

    ProductOptionSelection.associate = (db) => {
        db.ProductOptionSelection.hasMany(db.ProductInventory, {as:'ProductOptionSelection0', foreignKey:'product_option_selection0_id'});
        db.ProductOptionSelection.hasMany(db.ProductInventory, {as:'ProductOptionSelection1', foreignKey:'product_option_selection1_id'});
        db.ProductOptionSelection.hasMany(db.ProductInventory, {as:'ProductOptionSelection2', foreignKey:'product_option_selection2_id'});
        db.ProductOptionSelection.hasMany(db.ProductInventory, {as:'ProductOptionSelection3', foreignKey:'product_option_selection3_id'});
        db.ProductOptionSelection.hasMany(db.ProductInventory, {as:'ProductOptionSelection4', foreignKey:'product_option_selection4_id'});
        db.ProductOptionSelection.hasMany(db.ProductInventory, {as:'ProductOptionSelection5', foreignKey:'product_option_selection5_id'});
        db.ProductOptionSelection.belongsTo(db.ProductOption);
    }

    return ProductOptionSelection;
} 