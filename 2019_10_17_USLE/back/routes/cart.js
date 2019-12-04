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
           
            let copiedCookieValue = req.cookies.dq45o8w5;
            let newCookieValue = [];
            cartList.map((cartValue, cartIndex) => {
                if(copiedCookieValue.map((thisValue, thisIndex) => {
                    return thisValue.id
                }).indexOf(cartValue.id) < 0){
                    copiedCookieValue.push(cartValue);
                } else {
                    let filteredData = copiedCookieValue.filter((innerArrayValue) => innerArrayValue.id === cartValue.id);
                    filteredData[0].qty += cartValue.qty;
                }
            })
            
            res.cookie('dq45o8w5', copiedCookieValue);
        }
        
        // 사용자 로그인이 되어있는 경우 - cart DB에 저장
        if(req.user){

            const cart = await Promise.resolve(db.Cart.findAll({
                where: {
                    UserId: req.user.id,
                }
            }))
            
            console.log('---------------------');

            let newCartValue = [];

            const classification = (arr) => {
                if(arr.length === 0) {
                    return null
                } else {
                    let target = arr[0];
                    cart.reduce((newCartArray, curCartValue) => {
                        if(newCartArray.map((thisValue, thisIndex) => {
                            
                            return thisValue.ProductInventoryId
                        }).indexOf(target.id) < 0) {
                            newCartArray.push(curCartValue)
                        } else {
                            newCartValue.push(target);
                        } 
                        return newCartArray;
                    }, []);

                    arr.splice(0, 1);
                    console.log(arr.ProductInventoryId);
                    classification(arr);
                }
            }

            classification(req.cookies.dq45o8w5);
          
            

            // await Promise.resolve(req.cookies.dq45o8w5.map((cookieValue, cookieIndex) => {

            //     return(
            //         Promise.resolve(db.Cart.create({
            //             quantity: cookieValue.qty,
            //             UserId: req.user.id,
            //         }))).then(async function(newCartResult){
            //             return(
            //                 Promise.resolve(db.ProductInventory.findOne({
            //                     where: {
            //                         id: cookieValue.id
            //                     }
            //                 })).then(function(productInventoryResult){
            //                     productInventoryResult.addCart(newCartResult);
                                
            //                 })
            //             )
            //         })
            //     }))
            
            
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
        console.log(req.cookies);
        
    } catch(e) {
        console.error(e);
        return next(e);
    }
})

module.exports = router;