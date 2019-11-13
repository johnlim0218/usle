
module.exports = (sequelize, DataTypes) => {
    const ProductOptionSelection = sequelize.define('ProductOptionSelection', {
        selectionName: {
            type: DataTypes.STRING(200),
            allowNull: false,
            defaultValue: 'one', 
        },
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

    ProductOptionSelection.associate = (db) => {
        db.ProductOptionSelection.hasMany(db.ProductOptionSelection);
        db.ProductOptionSelection.belongsTo(db.ProductOptionSelection);
        db.ProductOptionSelection.belongsTo(db.ProductOption);
    }

    return ProductOptionSelection;
} 