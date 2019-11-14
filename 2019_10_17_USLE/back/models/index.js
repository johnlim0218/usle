const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = require('./user')(sequelize, Sequelize);
db.UserAddress = require('./userAddress')(sequelize, Sequelize);

db.Product = require('./product')(sequelize, Sequelize);
db.ProductBrand = require('./productBrand')(sequelize, Sequelize);
db.ProductCategory = require('./productCategory')(sequelize, Sequelize);
db.ProductImage = require('./productImage')(sequelize, Sequelize);
db.ProductOption = require('./productOption')(sequelize, Sequelize);
db.ProductOptionSelection = require('./productOptionSelection')(sequelize, Sequelize);
db.ProductInventory = require('./productInventory')(sequelize, Sequelize);

db.Order = require('./order')(sequelize, Sequelize);
db.OrderDetail = require('./orderDetail')(sequelize, Sequelize);
db.OrderPayment = require('./orderPayment')(sequelize, Sequelize);
db.OrderReturn = require('./orderReturn')(sequelize, Sequelize);
db.OrderShipping = require('./orderShipping')(sequelize, Sequelize);
db.OrderStatus = require('./orderStatus')(sequelize, Sequelize);
db.Delievery = require('./delievery')(sequelize, Sequelize);

db.Cart = require('./cart')(sequelize, Sequelize);
db.Coupon = require('./coupon')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
    if(db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;