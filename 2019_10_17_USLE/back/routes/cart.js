const express = require('express');
const router = express.Router();

const db = require('../models');

router.post('/add', async(req, res, next) => {
    try{
        let cartList = req.body;
        
        res.cookie('cartList', cartList);

        
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