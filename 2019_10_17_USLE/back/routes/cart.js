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
                req.cookies.dq45o8w5.map((cookieValue, cookieIndex) => {
                    if(cartValue.id === cookieValue.id) {
                        cookieValue.qty += cartValue.qty;
                    } else {
                        req.cookies.dq45o8w5.concat(cartValue);
                    }
                })
            })


            res.cookie('dq45o8w5', req.cookies.dq45o8w5);
           
        }
        
        // 사용자 로그인이 되어있는 경우
        if(req.user){

            
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