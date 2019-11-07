const express = require('express');
const router = express.Router();

const db = require('../models');

router.get('/get/:type', async(req, res, next) => {
    try{

        if(req.params.type === 'name'){
            const categories = await db.ProductCategory.findAll({
                attributes: ['id', 'categoryName'],
                order: [['id', 'DESC']],
            });
            return res.json(categories);

        } else if(req.params.type === 'all') {
            const categories = await db.ProductCategory.findAll({
                order: [['id', 'DESC']],
            });
            return res.json(categories);
        }
        
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

router.post('/add', async(req, res, next) => {
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

router.delete('/delete/:id', async(req, res, next) => {
    try{
        const targetCategory = await db.ProductCategory.findOne({
            where: {
                id: req.params.id,
            }
        })
        if(!targetCategory) {
            return res.status(403).send('삭제되었거나 등록되지 않은 카테고리입니다.')
        }
        await db.ProductCategory.destroy({ 
            where: {
                id: req.params.id,
            }
        })
        return res.send(req.params.id);
    } catch(e) {
        console.error(e);
        return next(e);
    }
})

module.exports = router;