const express = require('express');
const router = express.Router();

const db = require('../models');

router.get('/', async(req, res, next) => {
    try{
        const products = await db.Product.findAll({
            include:[{
                model: db.ProductCategory,
                attributes:['id', 'categoryName'],
            },{
                model: db.ProductBrand,
                attributes:['id', 'brandName'],
            },{
                model: db.ProductImage,
            },{
                model: db.ProductInventory,
                attributes:['price', 'quantity'],
            }],
            order: [['createdAt', 'DESC']],
        });

        return res.json(products);
    } catch(e) {
        console.error(e);
        return next(e);
    }
})

module.exports = router;