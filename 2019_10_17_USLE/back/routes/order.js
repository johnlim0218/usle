const express = require('express');
const router = express.Router();

const db = require('../models');

router.post('/', async(req, res, next) => {
    try {
        const productInventory = await Promise.all(req.body.map((value, index) => {
            return(
                db.ProductInventory.findOne({
                    where: {
                        id: value.ProductInventoryId,
                    },
                    include: [{
                        model: db.Product,
                        attributes:['id', 'productName'],
                        include:[{
                            model: db.ProductBrand,
                            attributes: ['id', 'brandName'],
                        }, {
                            model: db.ProductImage,
                        }]
                    }, {
                        model: db.ProductOptionSelection,
                        as: 'ProductOptionSelection0',
                        attributes: ['id', 'selectionName'],
                        include: [{
                            model: db.ProductOption,
                            attributes: ['id','optionName'],
                        }]
                    },{
                        model: db.ProductOptionSelection,
                        as: 'ProductOptionSelection1',
                        attributes: ['id','selectionName'],
                        include: [{
                            model: db.ProductOption,
                            attributes: ['id','optionName'],
                        }]
                    },{
                        model: db.ProductOptionSelection,
                        as: 'ProductOptionSelection2',
                        attributes: ['id','selectionName'],
                        include: [{
                            model: db.ProductOption,
                            attributes: ['id','optionName'],
                        }]
                    },{
                        model: db.ProductOptionSelection,
                        as: 'ProductOptionSelection3',
                        attributes: ['id','selectionName'],
                        include: [{
                            model: db.ProductOption,
                            attributes: ['id','optionName'],
                        }]
                    },{
                        model: db.ProductOptionSelection,
                        as: 'ProductOptionSelection4',
                        attributes: ['id','selectionName'],
                        include: [{
                            model: db.ProductOption,
                            attributes: ['id','optionName'],
                        }]
                    },{
                        model: db.ProductOptionSelection,
                        as: 'ProductOptionSelection5',
                        attributes: ['id','selectionName'],
                        include: [{
                            model: db.ProductOption,
                            attributes: ['id','optionName'],
                        }]
                    }]
                })
            )
        }))
        
        if(productInventory){
            productInventory.map((value, index) => {
                let stock = value.quantity - req.body.filter(reqValue => reqValue.ProductInventoryId === value.id)[0].quantity;
                if(stock < 1) {
                    return res.status(403).send('재고가 충분하지 않은 상품이 있습니다.');
                }
            })
            
            if(req.user){
                await Promise.all(req.body.map((value, index) => {
                    return (
                        db.OrderDetail.create({
                            ProductInventoryId: value.ProductInventoryId,
                            UserId: req.user.id,
                            quantity: value.quantity,
                        })
                    )
                }))
            } else {
                await Promise.all(req.body.map((value, index) => {
                    return (
                        db.OrderDetail.create({
                            ProductInventoryId: value.ProductInventoryId,
                            quantity: value.quantity,
                        })
                    )
                }))
            }
        }

        return res.json(productInventory);
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;