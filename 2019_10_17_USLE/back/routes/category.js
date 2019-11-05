const express = require('express');
const router = express.Router();

const db = require('../models');

router.get('/get', async(req, res, next) => {
    try{
        const categories = await db.ProductCategory.findAll({
            order: [['id', 'DESC']],
        });
        
        return res.json(categories);
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

router.post('/add', async(req, res, next) => {
    console.log(req.body);
    try{
        const category = await db.ProductCategory.findOne({
            where: {
                categoryName: req.body.categoryName,
            }
        });
        if(category){
            return res.status(403).send('이미 등록된 카테고리명입니다.');
        };
        
        const newCategory = await db.ProductCategory.create({
            categoryName: req.body.categoryName,
            description: req.body.description,
        });
        
        return res.status(200).json(newCategory);

    } catch(e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;