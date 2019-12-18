const express = require('express');
const router = express.Router();

const db = require('../models');

router.post('/add', async(req, res, next) => {
    try{
        console.log(req.cookies.dq45o8w5);
        
        let cartList = req.body;
        
        // 사용자 로그인이 되어있지 않은 경우    
        if(!req.user){
            // 카트 쿠키가 없을때
            if(req.cookies.dq45o8w5 === undefined){
                res.cookie('dq45o8w5', cartList);
            
            // 카트 쿠키가 있을때
            } else {
                cartList.map((cartValue, cartIndex) => {
                    if(req.cookies.dq45o8w5.map((thisValue, thisIndex) => {
                        return thisValue.id
                    }).indexOf(cartValue.id) < 0){
                        req.cookies.dq45o8w5.push(cartValue);
                    } else {
                        let filteredData = req.cookies.dq45o8w5.filter((innerArrayValue) => innerArrayValue.id === cartValue.id);
                        filteredData[0].qty += cartValue.qty;
                    }
                })

                res.cookie('dq45o8w5', req.cookies.dq45o8w5);
            }

        // 사용자 로그인이 되어있는 경우    
        // 쿠키는 로그인과 동시에 초기화
        } else {
            const cart = await Promise.resolve(db.Cart.findAll({
                where: {
                    UserId: req.user.id,
                }
            }))
            
            let newCartValue = [];

            cartList.map((cartListValue, cartListIndex) => {
                if(cart.map((cartValue, cartIndex) => {
                    return cartValue.ProductInventoryId
                }).indexOf(cartListValue.id) < 0) {
                    newCartValue.push(cartListValue);
                } else {
                    let filteredCartData = cart.filter((innerCartValue) => innerCartValue.ProductInventoryId === cartListValue.id);
                    filteredCartData[0].quantity += cartListValue.qty;
                }
            })
            
            // Cart DB에 이미 존재하는 값 update
            await Promise.all(cart.map((cartValue, cartIndex) => {
                return(
                    db.Cart.update({
                        quantity: cartValue.quantity,
                    }, {
                        where: {
                            id: cartValue.id
                        },
                    })
                )
            }))
            
            // 새로운 값 create(카트 쿠키에 추가된 내용 중 DB에 존재하지 않는 값)
            if(newCartValue.length > 0){
                await Promise.all(newCartValue.map((newValue, newIndex) => {
                    return(
                        Promise.resolve(db.ProductInventory.findOne({
                            where:{
                                id: newValue.id
                            }
                        })).then(function(inventoryResult){
                            Promise.resolve(db.Cart.create({
                                quantity: newValue.qty,
                                UserId: req.user.id,
                            })).then(function(createNewCartResult){
                                inventoryResult.addCart(createNewCartResult);
                            })
                        })
                    )})
                )
            }
        } 

        return res.send('addCartList');

    } catch(e) {
        console.error(e);
        return next(e);
    }
});

router.get('/get', async(req, res, next) => {
    try{
        // 로그인이 되어 있는 경우
        if(req.user){
            const cartList = await db.Cart.findAll({
                where:{
                    UserId: req.user.id,
                },
                include:[{
                    model: db.ProductInventory,
                    attribute: ['id', 'quantity', 'additionalPrice'],
                    include: [{
                        model: db.Product,
                        attributes: ['id', 'productName', 'price'],
                        include: [{
                            model: db.ProductBrand,
                            attributes: ['id', 'brandName'],
                        }, {
                            model: db.ProductCategory,
                            attributes: ['id', 'categoryName'],  
                        },{
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
                }],
                order: [['createdAt', 'ASC']],
            });
            
            return res.json(cartList);

        // 로그인이 되어 있지 않은 경우     
        } else {
            if(req.cookies.dq45o8w5 !== undefined){
                const cartList = await Promise.all(req.cookies.dq45o8w5.map((cookieValue, cookieIndex) => {
                    return(
                        db.ProductInventory.findOne({
                            where:{
                                id: cookieValue.id,
                            },
                            attribute: ['id', 'quantity', 'additionalPrice'],
                            include: [{
                                model: db.Product,
                                attributes: ['id', 'productName', 'price'],
                                include: [{
                                    model: db.ProductBrand,
                                    attributes: ['id', 'brandName'],
                                }, {
                                    model: db.ProductCategory,
                                    attributes: ['id', 'categoryName'],  
                                },{
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
                            }],
                            order: [['createdAt', 'ASC']],
                        })
                    )
                }))
                
                const returnResultArray = [];
                cartList.map((cartValue, cartIndex) => {
                    returnResultArray.push({
                        id: req.cookies.dq45o8w5[cartIndex].id,
                        quantity: req.cookies.dq45o8w5[cartIndex].qty,
                        ProductInventory: cartValue,
                    });
                })


                return res.json(returnResultArray);
            }
            return res.json();
        }
        
    } catch(e) {
        console.error(e);
        return next(e);
    }
})

router.delete('/remove/:id', async(req, res, next) => {
    try {
       
        // 로그인이 되어 있다면 Cart DB에서 지운다.
        if(req.user){
            const targetItem = await db.Cart.findOne({
                where:{
                    id: req.params.id,
                }
            });

            if(!targetItem) {
                return res.status(403).send('삭제되었거나 등록되지 않은 항목입니다.');
            }

            await db.Cart.destroy({
                where:{
                    id: req.params.id,
                }
            })
            return res.send(req.params.id);
        
        // 로그인이 되어 있지않다면 쿠키에서 지운다.
        } else {
           let tempCookie = req.cookies.dq45o8w5;
           
           let newCookie = tempCookie.filter((cookieValue) =>
               cookieValue.id !== parseInt(req.params.id)
           )
           res.cookie('dq45o8w5', newCookie);
           return res.send(req.params.id);
        }
    } catch(e) {
        console.error(e);
        return next(e);
    }
})

router.patch('/update', async(req, res, next) => {
    try{
        if(req.user){
            await db.Cart.update({
                quantity: req.body.quantity,
            }, {
                where: {
                    id: req.body.id,
                }
            })
        } else {
            if(req.cookies.dq45o8w5){
                let targetCookieValue = req.cookies.dq45o8w5.filter((cookieValue) => cookieValue.id === req.body.id);
                targetCookieValue[0].qty = req.body.quantity;
            }
            res.cookie('dq45o8w5', req.cookies.dq45o8w5);
        }

        return res.send(req.body);
        
    } catch(e) {
        console.error(e);
        return next(e);
    }
})

module.exports = router;