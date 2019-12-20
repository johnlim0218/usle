const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const uuidv1 = require('uuid/v1');

const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/userMiddleware');
const router = express.Router();

router.get('/', (req, res, next) => {
    if(req.user) {
        const user = Object.assign({}, req.user.toJSON());
        delete user.password;
        return res.json(user);
    } else {
        return res.json('');
    }
})

router.post('/login', isNotLoggedIn, (req, res, next) => {
//로그인 라우터
    passport.authenticate('local', (err, user, info) => {
        if(err){
            console.log(err);
            return next(err);
        };
        if(info){
            return res.status(403).send(info.reason);
        };
        
        return req.login(user, async(loginErr) => {
            try{
                if(loginErr) {
                    return next(loginErr);
                };

                const fullUser = await db.User.findOne({
                    where: {
                        id: user.id,
                    },
                    attributes: ['id', 'email', 'nickname'],
                });

                // 카트 쿠키가 있다면 카트 쿠키의 데이터를 카트 DB에 저장
                if(req.cookies.dq45o8w5 && (req.cookies.dq45o8w5 !== undefined || req.cookies.dq45o8w5.length !== 0)){
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
                    res.clearCookie('dq45o8w5');
                }

                return res.json(fullUser);

            } catch(e) {
                return next(e);
            }
        });
    })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res) => {
//로그아웃 라우터 
    req.logout();
    req.session.destroy();
    res.send('로그아웃 되었습니다.');
})

router.post('/signup', async(req, res, next) => {
//회원가입 라우터
    try{
        // 아이디 중복 확인
        const checkDupEmail = await db.User.findOne({
            where: {
                email: req.body.email,
            }
        });
        // 중복된 아이디가 DB에 있을 경우
        if(checkDupEmail){
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }

        // 중복된 아이디가 DB에 없을 경우
        // 회원가입 진행
        
        // 회원등록번호 (milliseconds 뒤 아홉 자리 + id 다섯자리)
       
        const milliseconds = (new Date().getTime() + '').slice(-9);
        
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        let newUserResult = null;

        await Promise.resolve(db.User.create({
            email: req.body.email,
            password: hashedPassword,
            nickname: req.body.nickname,
        })).then(async function(newUser){
            let newUserId = newUser.id + '';
            if(newUserId.length < 6){
                for(let i = 0; i < (6 - newUserId.length); i ++){
                    newUserId = '0' + newUserId; 
                }
            }
            
            await db.User.update({
                userRegNum: milliseconds + newUserId, 
            }, {
                where:{
                    id: newUser.id,
                }
            })
            newUserResult = newUser;
        })  
        
        return res.json(newUserResult);
    } catch(e) {
        return next(e);
    }
})

router.get('/myOrder', isLoggedIn, async(req, res, next) => {
    
    try{

        const myOrderResult = await db.OrderDetail.findAll({
            attributes: ['id', 'quantity', 'amount', 'createdAt'],
            include: [{
                model: db.Order,
                where: {
                    UserId: req.user.id,
                }
            },{
                model: db.ProductInventory,
                include: [{
                    model: db.Product,
                    attributes: ['id', 'productName'],
                    include: [{
                        model: db.ProductCategory,
                        attributes: ['id', 'categoryName', 'description']
                    },{
                        model: db.ProductBrand,
                        attributes: ['id', 'brandName', 'description']
                    },{
                        model: db.ProductImage,
                    }]
                },{
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
            order: [['createdAt', 'DESC']],
        })
 
        return res.json(myOrderResult);
        
    } catch(e) {
        return next(e);
    }
})

module.exports = router;