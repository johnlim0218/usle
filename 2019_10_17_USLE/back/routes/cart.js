const express = require('express');
const router = express.Router();

const db = require('../models');

router.post('/add', async(req, res, next) => {
    try{
        console.log(req.cookies.dq45o8w5);
        
        let cartList = req.body;
        console.log(cartList);
        // 카트 쿠키가 없을때
        if(req.cookies.dq45o8w5 == undefined){
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
        
        // 사용자 로그인이 되어있는 경우 - cart DB에 저장
        if(req.user){
            
            const cart = await Promise.resolve(db.Cart.findAll({
                where: {
                    UserId: req.user.id,
                }
            }))
            
            let newCartValue = [];

            req.cookies.dq45o8w5.map((cookieValue, cookieIndex) => {
                if(cart.map((cartValue, cartIndex) => {
                    return cartValue.ProductInventoryId
                }).indexOf(cookieValue.id) < 0) {
                    newCartValue.push(cookieValue);
                } else {
                    let filteredCartData = cart.filter((innerCartValue) => innerCartValue.ProductInventoryId === cookieValue.id);
                    filteredCartData[0].quantity += cookieValue.qty;
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
            
        // 사용자 로그인이 되어있지 않은 경우    
        } else {


        }

        res.send('cartList');

    } catch(e) {
        console.error(e);
        return next(e);
    }
});

router.get('/get', async(req, res, next) => {
    try{
        // 로그인이 되어 있는 경우
        if(req.user){
            

        // 로그인이 되어 있지 않은 경우     
        } else {

        }
        
    } catch(e) {
        console.error(e);
        return next(e);
    }
})

module.exports = router;