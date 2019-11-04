const express = require('express');
const router = express.Router();

const db = require('../models');

router.get('/get', async(req, res, next) => {
    try{
        const categories = await db.ProductCategory.findAll({
            
        });
        
        return res.json(categories);
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;