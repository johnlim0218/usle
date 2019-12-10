const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/userMiddleware');

// multer 설정
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb){
            cb(null, 'uploads');
        },
        // 파일 명 재설정
        filename(req, file, done){
            // 파일 이름과 확장자를 분리해준다.
            const ext = path.extname(file.originalname); // 확장자
            const basename = path.basename(file.originalname, ext); // 파일이름
            done(null, basename + new Date().valueOf() + ext);
        }
    }),
    // 파일크기 상한 5mb 
    limits: { fileSize: 5 * 1024 * 1024 }, 
})

router.post('/add', upload.none(), async(req, res, next) => {
    try{
        const newProduct = await db.Product.create({
            productName: req.body.name,
            price: req.body.price,
            description: req.body.description,
            ProductBrandId: req.body.brand,
            ProductCategoryId: req.body.category,
        });
        
        const newProductOptionJsonObj = JSON.parse(req.body.option);
        
        // option을 기입했을 때 (1개 이상)
        if(newProductOptionJsonObj.length !== 0){
            await Promise.resolve(newProductOptionJsonObj.options.map((optionsValue, optionsIndex) => {
                
                return(
                    Promise.resolve(db.ProductInventory.create({
                        quantity: optionsValue.additionalProps.quantity,
                        additionalPrice: optionsValue.additionalProps.additionalPrice,
                    }))).then(async function(newInventoryResult){
                        return(
                            Promise.all(optionsValue.selection.map((selectionValue, selectionIndex) => {
                                    return(
                                        Promise.resolve(db.ProductOptionSelection.findOne({
                                            where: {
                                                id: selectionValue.id
                                            }
                                        })).then(function(selectionResult){
                                           
                                            eval("selectionResult.addProductOptionSelection" + selectionIndex + "(newInventoryResult)");
                                            newProduct.addProductInventory(newInventoryResult);
                                        })
                                    )
                                })
                            )
                        )
                    })
                }    
            ));
        // option을 기입하지 않았을 때 (1개 이상)
        } else {
            const newInventoryResult = await Promise.resolve(db.ProductInventory.create({
                quantity: 100,
            }));
            
            await newProduct.addProductInventory(newInventoryResult);
        }
        
        if(req.body.image){
            if(Array.isArray(req.body.image)){
                const images = await Promise.all(req.body.image.map((image) => {
                    return db.ProductImage.create({
                        src: image,
                    })
                }));
                await newProduct.addProductImage(images);
            } else {
                const image = await db.ProductImage.create({
                    src: req.body.image,
                })
                await newProduct.addProductImage(image);
            }
        }

        const newProductPostId = await db.Product.findOne({
            where: {
                id: newProduct.id
            }
        });

        return res.json(newProductPostId);
        
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

router.post('/add/images', upload.array('image'), async(req, res, next) => {
    return res.json(req.files.map(v => v.filename));
});

router.get('/:id', async(req, res, next) => {
    
    try{
        const productDetail = await db.Product.findOne({
            where:{
                id: req.params.id
            },
            include: [{
                model: db.ProductCategory,
                attributes: ['id', 'categoryName', 'description']
            }, {
                model: db.ProductBrand,
                attributes: ['id', 'brandName', 'description']
            }, {
                model: db.ProductImage,
            }, {
                model: db.ProductInventory,
                attributes: ['id', 'additionalPrice', 'quantity'],
                include: [{
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
        });
        
        return res.json(productDetail);
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

router.get('/option/name/:name', async(req, res, next) => {
    try{
        const productOption = await db.ProductOption.findOne({
            where: {
                optionName: req.params.name,
            },
            include: [{
                model: db.ProductOptionSelection,
                attributes: ['id', 'selectionName'],
            }]
        });

        return res.json(productOption);
        
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;