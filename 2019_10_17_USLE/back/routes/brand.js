const express = require('express');
const router = express.Router();

const db = require('../models');

router.get('/get/:type', async(req, res, next) => {
    try{
        if(req.params.type === 'name'){
            const brands = await db.ProductBrand.findAll({
                attributes: ['id', 'brandName'],
                order: [['brandName', 'ASC']]
            })
            return res.json(brands);

        } else if (req.params.type === 'all') {
            const brands = await db.ProductBrand.findAll({
                order: [['brandName', 'ASC']],
            });
            return res.json(brands);
        }
        
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

router.post('/add', async(req, res, next) => {
    try{
        const brand = await db.ProductBrand.findOne({
            where: {
                brandName: req.body.brandName,
            }
        })
        if(brand) {
            return res.status(403).send('이미 등록된 브랜드명입니다.');
        }
        const newBrand = await db.ProductBrand.create({
            brandName: req.body.brandName,
            phone: req.body.phone,
            zipcode: req.body.zipcode,
            address: req.body.address,
            addressDetail: req.body.addressDetail,
            description: req.body.description,
        });

        return res.status(200).json(newBrand);

    } catch(e) {
        console.error(e);
        return next(e);
    }
});

router.delete('/delete/:id', async(req, res, next) => {
    try{
        const targetBrand = await db.ProductBrand.findOne({
            where: {
                id: req.params.id,
            }
        });
        if(!targetBrand) {
            return res.status(403).send('삭제되었거나 등록되지 않은 브랜드입니다.')
        }
        await db.ProductBrand.destroy({
            where: {
                id: req.params.id,
            }
        });
        return res.send(req.params.id);
        
    } catch(e) {
        console.error(e);
        return next(e);
    }
})

module.exports = router;