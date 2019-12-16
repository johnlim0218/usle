const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');

const db = require('../models');

router.post('/', async(req, res, next) => {
    
    try {
        // const productInventory = await Promise.all(req.body.map((value, index) => {
        //     return(
        //         db.ProductInventory.findOne({
        //             where: {
        //                 id: value.ProductInventoryId,
        //             },
        //             include: [{
        //                 model: db.Product,
        //                 attributes:['id', 'productName'],
        //                 include:[{
        //                     model: db.ProductBrand,
        //                     attributes: ['id', 'brandName'],
        //                 }, {
        //                     model: db.ProductImage,
        //                 }]
        //             }, {
        //                 model: db.ProductOptionSelection,
        //                 as: 'ProductOptionSelection0',
        //                 attributes: ['id', 'selectionName'],
        //                 include: [{
        //                     model: db.ProductOption,
        //                     attributes: ['id','optionName'],
        //                 }]
        //             },{
        //                 model: db.ProductOptionSelection,
        //                 as: 'ProductOptionSelection1',
        //                 attributes: ['id','selectionName'],
        //                 include: [{
        //                     model: db.ProductOption,
        //                     attributes: ['id','optionName'],
        //                 }]
        //             },{
        //                 model: db.ProductOptionSelection,
        //                 as: 'ProductOptionSelection2',
        //                 attributes: ['id','selectionName'],
        //                 include: [{
        //                     model: db.ProductOption,
        //                     attributes: ['id','optionName'],
        //                 }]
        //             },{
        //                 model: db.ProductOptionSelection,
        //                 as: 'ProductOptionSelection3',
        //                 attributes: ['id','selectionName'],
        //                 include: [{
        //                     model: db.ProductOption,
        //                     attributes: ['id','optionName'],
        //                 }]
        //             },{
        //                 model: db.ProductOptionSelection,
        //                 as: 'ProductOptionSelection4',
        //                 attributes: ['id','selectionName'],
        //                 include: [{
        //                     model: db.ProductOption,
        //                     attributes: ['id','optionName'],
        //                 }]
        //             },{
        //                 model: db.ProductOptionSelection,
        //                 as: 'ProductOptionSelection5',
        //                 attributes: ['id','selectionName'],
        //                 include: [{
        //                     model: db.ProductOption,
        //                     attributes: ['id','optionName'],
        //                 }]
        //             }]
        //         })
        //     )
        // }))
        
        // if(productInventory){
        //     productInventory.map((value, index) => {
        //         let stock = value.quantity - req.body.filter(reqValue => reqValue.ProductInventoryId === value.id)[0].quantity;
        //         if(stock < 1) {
        //             return res.status(403).send('재고가 충분하지 않은 상품이 있습니다.');
        //         }
        //     })
        // }
        

        // orderRegNum (year + month + date + uuid에서 여섯자리 숫자 추출 + 세자리 난수)
        console.log(req.body);
        const year = new Date().getFullYear() + '';
        const month = (new Date().getMonth() + 1) + '';
        const date = new Date().getDate() + '';
        const hour = new Date().getHours() + '';
        const minutes = new Date().getMinutes() + '';
        let seconds = new Date().getSeconds() + '';
        const uuid = uuidv4().replace(/[^0-9]/g,'').substring(0, 5);
        console.log('test');
        console.log(seconds.length);
        if(seconds.length !== 2){
            seconds = '0' + seconds;
        }
        let randomNum = '';
        for(let i = 0; i < 3; i++){
            randomNum = (randomNum + '') + (Math.floor(Math.random() * 10) + '');
        }

        // 회원 주문
        if(req.user){
            Promise.resolve(db.Order.create({
                UserId: req.user.id,
                totalAmount: req.body.totalAmount,
                orderRegNum: year + month + date + seconds + uuid + randomNum, 
            })).then(function(newOrderResult){
                return(
                    Promise.resolve(req.body.orderedItemList.map((orderedItemValue, orederedItemIndex) => {
                        Promise.resolve(db.OrderDetail.create({
                            quantity: orderedItemValue.quantity,
                            ProductInventoryId: orderedItemValue.ProductInventoryId,
                            OrderId: newOrderResult.id,
                        })).then(function(newOrderDetailResult){
                            Promise.resolve(db.OrderShipping.create({
                                OrderDetailId: newOrderDetailResult.id,
                                name: req.body.values.receiverName,
                                phone: req.body.values.receiverPhone,
                                zipcode: req.body.values.zipcode,
                                address: req.body.values.address,
                                addressDetail: req.body.values.addressDetail,
                                comment: req.body.values.comment,
                            }))
                        })
                    }))
            )})

        // 비회원 주문   
        } else {

        }

        return res.json();
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;